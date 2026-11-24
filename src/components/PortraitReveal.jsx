import { useEffect, useRef } from "react";
import baseImg from "../assets/foto-jas.jpeg";
import revealImg from "../assets/foto-python.png";

const HOLD = 120; // ms gambar python terlihat penuh setelah digosok
const FADE = 550; // ms memudar kembali ke foto jas

const CURSOR = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='34' height='34'%3E%3Ccircle cx='17' cy='17' r='14' fill='rgba(255,255,255,0.12)' stroke='white' stroke-width='2'/%3E%3C/svg%3E") 17 17, crosshair`;

/**
 * Foto jas STMIK di atas, gambar python tersembunyi di bawahnya.
 * Digosok -> python muncul di bekas gosokan, lalu memudar kembali ke foto jas.
 */
export default function PortraitReveal({ base = baseImg, reveal = revealImg }) {
  const boxRef = useRef(null);
  const cvRef = useRef(null);

  useEffect(() => {
    const box = boxRef.current;
    const cv = cvRef.current;
    if (!box || !cv) return undefined;
    const ctx = cv.getContext("2d");

    let w = 0;
    let h = 0;
    let img = null;
    let down = false;
    let last = null;
    let raf = 0;
    const pts = [];

    // stempel gosokan: tengah penuh, pinggir lembut
    const sprite = document.createElement("canvas");
    sprite.width = 128;
    sprite.height = 128;
    const sg = sprite.getContext("2d");
    const grad = sg.createRadialGradient(64, 64, 0, 64, 64, 64);
    grad.addColorStop(0, "rgba(0,0,0,1)");
    grad.addColorStop(0.6, "rgba(0,0,0,1)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    sg.fillStyle = grad;
    sg.fillRect(0, 0, 128, 128);

    const radius = () => Math.max(24, Math.min(w, h) * 0.1);

    const drawCover = () => {
      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;
      ctx.clearRect(0, 0, w, h);
      if (!img) {
        ctx.fillStyle = "#1a1a3e";
        ctx.fillRect(0, 0, w, h);
        return;
      }
      const s = Math.max(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * s;
      const dh = img.naturalHeight * s;
      ctx.drawImage(img, (w - dw) / 2, 0, dw, dh);
    };

    const render = (now) => {
      raf = 0;
      drawCover();
      const r = radius();
      ctx.globalCompositeOperation = "destination-out";
      let keep = 0;
      for (let i = 0; i < pts.length; i += 1) {
        const p = pts[i];
        const age = now - p.t;
        if (age >= HOLD + FADE) continue;
        pts[keep] = p;
        keep += 1;
        const a = age <= HOLD ? 1 : 1 - (age - HOLD) / FADE;
        ctx.globalAlpha = a * a * (3 - 2 * a);
        ctx.drawImage(sprite, p.x - r, p.y - r, r * 2, r * 2);
      }
      pts.length = keep;
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "source-over";
      if (pts.length) raf = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = box.clientWidth;
      h = box.clientHeight;
      if (!w || !h) return;
      cv.width = Math.round(w * dpr);
      cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pts.length = 0;
      kick();
    };

    const im = new Image();
    im.onload = () => {
      img = im;
      kick();
    };
    im.src = base;

    const scratchTo = (x, y) => {
      const r = radius();
      const step = Math.max(6, r * 0.35);
      const now = performance.now();
      if (!last) {
        pts.push({ x, y, t: now });
      } else {
        const d = Math.hypot(x - last.x, y - last.y);
        const n = Math.max(1, Math.ceil(d / step));
        for (let s = 1; s <= n; s += 1) {
          pts.push({
            x: last.x + ((x - last.x) * s) / n,
            y: last.y + ((y - last.y) * s) / n,
            t: now,
          });
        }
      }
      last = { x, y };
      if (pts.length > 1800) pts.splice(0, pts.length - 1800);
      kick();
    };

    const pos = (e) => {
      const b = cv.getBoundingClientRect();
      return { x: e.clientX - b.left, y: e.clientY - b.top };
    };
    const onDown = (e) => {
      e.preventDefault();
      down = true;
      last = null;
      try {
        cv.setPointerCapture(e.pointerId);
      } catch (err) {
        /* abaikan */
      }
      const p = pos(e);
      scratchTo(p.x, p.y);
    };
    const onMove = (e) => {
      if (!down) return;
      const p = pos(e);
      scratchTo(p.x, p.y);
    };
    const onUp = () => {
      down = false;
      last = null;
    };

    cv.addEventListener("pointerdown", onDown);
    cv.addEventListener("pointermove", onMove);
    cv.addEventListener("pointerup", onUp);
    cv.addEventListener("pointercancel", onUp);
    cv.addEventListener("lostpointercapture", onUp);

    const ro = new ResizeObserver(resize);
    ro.observe(box);

    return () => {
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      cv.removeEventListener("pointerdown", onDown);
      cv.removeEventListener("pointermove", onMove);
      cv.removeEventListener("pointerup", onUp);
      cv.removeEventListener("pointercancel", onUp);
      cv.removeEventListener("lostpointercapture", onUp);
    };
  }, [base]);

  return (
    <div style={{ width: "100%", maxWidth: 420, margin: "0 auto" }}>
      <div
        ref={boxRef}
        style={{
          position: "relative",
          aspectRatio: "3 / 4",
          borderRadius: 28,
          overflow: "hidden",
          background: "#1a1a3e",
          border: "1px solid rgba(139, 92, 246, 0.45)",
          boxShadow: "0 20px 60px rgba(139, 92, 246, 0.35)",
          userSelect: "none",
        }}
      >
        <img
          src={reveal}
          alt=""
          aria-hidden="true"
          draggable={false}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            pointerEvents: "none",
          }}
        />
        <canvas
          ref={cvRef}
          role="img"
          aria-label="Foto Ramdhani Dwi Saputra memakai jas STMIK"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            cursor: CURSOR,
            touchAction: "none",
          }}
        />
      </div>

      <p
        style={{
          margin: "14px 0 0",
          textAlign: "center",
          color: "#c4b5fd",
          fontWeight: 600,
          fontSize: "0.95rem",
          letterSpacing: "0.02em",
          animation: "prHint 2.2s ease-in-out infinite",
        }}
      >
        Gosok kartu untuk melihat kejutannya
      </p>

      <style>{`
        @keyframes prHint {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 1; }
        }
      `}</style>
    </div>
  );
}

