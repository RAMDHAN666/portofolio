import { useEffect, useMemo, useRef, useState } from "react";

const STOPS = [
  [139, 92, 246],
  [59, 130, 246],
  [236, 72, 153],
];
const gradColor = (t) => {
  const s = t * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(s));
  const f = s - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return "rgb(" + [0, 1, 2].map((k) => Math.round(a[k] + (b[k] - a[k]) * f)).join(",") + ")";
};

const DURATION = 2400; // ms progress 0 -> 100
const CURTAIN = 850; // ms tirai terangkat
const ease = (u) => 1 - Math.pow(1 - u, 2.2);

// ganti teks loading di sini
const MESSAGES = [
  "Merakit portofolio...",
  "Menyeduh kopi dulu...",
  "Memanggil kursor-kursor...",
  "Hampir siap, sabar ya ;)",
];
const READY_TEXT = "Siap! Silakan masuk";
const msgFor = (p) => (p < 30 ? 0 : p < 60 ? 1 : p < 90 ? 2 : 3);

/**
 * Splash halus + pesan loading lucu + tombol MULAI.
 * Pakai: <Preloader onComplete={...} />
 */
export default function Preloader({ onComplete, name = "Ramdhani Dwi Saputra", role = "Web Developer" }) {
  const [ready, setReady] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const barRef = useRef(null);
  const numRef = useRef(null);
  const msgRef = useRef(null);
  const doneRef = useRef(onComplete);
  const leaveRef = useRef(false);
  const goTimer = useRef(0);
  doneRef.current = onComplete;

  const particles = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        dur: Math.random() * 14 + 12,
        delay: Math.random() * 6,
      })),
    []
  );

  const go = () => {
    if (leaveRef.current) return;
    leaveRef.current = true;
    setLeaving(true);
    goTimer.current = setTimeout(() => {
      if (doneRef.current) doneRef.current();
    }, CURTAIN + 60);
  };

  useEffect(() => () => clearTimeout(goTimer.current), []);

  // progress halus; baru selesai kalau halaman benar-benar siap
  useEffect(() => {
    const start = performance.now();
    let raf = 0;
    let finished = false;
    let lastMsg = -1;

    const tick = (now) => {
      const u = Math.min(1, (now - start) / DURATION);
      let p = ease(u) * 100;
      const loaded = document.readyState === "complete";
      if (u >= 1 && !loaded) p = 99;
      if (barRef.current) barRef.current.style.width = p + "%";
      if (numRef.current) numRef.current.textContent = Math.floor(p) + "%";
      const mi = msgFor(p);
      if (mi !== lastMsg) {
        lastMsg = mi;
        if (msgRef.current) msgRef.current.textContent = MESSAGES[mi];
      }

      if (u >= 1 && loaded && !finished) {
        finished = true;
        if (barRef.current) barRef.current.style.width = "100%";
        if (numRef.current) numRef.current.textContent = "100%";
        if (msgRef.current) msgRef.current.textContent = READY_TEXT;
        setReady(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Enter / Spasi = MULAI
  useEffect(() => {
    if (!ready) return undefined;
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        go();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready]);

  let idx = 0;
  const total = Math.max(2, name.replace(/ /g, "").length);
  const ease2 = "cubic-bezier(0.76, 0, 0.24, 1)";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        overflow: "hidden",
        background: "linear-gradient(135deg, #0a0a1f 0%, #1a1a3e 45%, #0f1729 100%)",
        transform: leaving ? "translateY(-101%)" : "translateY(0)",
        borderRadius: leaving ? "0 0 50% 50% / 0 0 14vh 14vh" : "0 0 50% 50% / 0 0 0vh 0vh",
        transition: "transform " + CURTAIN + "ms " + ease2 + ", border-radius " + CURTAIN + "ms " + ease2,
        pointerEvents: leaving ? "none" : "auto",
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* latar: bola cahaya, grid, partikel */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div className="pl-orb pl-o1" />
        <div className="pl-orb pl-o2" />
        <div className="pl-orb pl-o3" />
        <div className="pl-grid" />
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x + "%",
              top: p.y + "%",
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139, 92, 246, 0.85) 0%, transparent 70%)",
              boxShadow: "0 0 " + p.size * 3 + "px rgba(139, 92, 246, 0.6)",
              animation: "plFloat " + p.dur + "s ease-in-out " + p.delay + "s infinite",
            }}
          />
        ))}
      </div>

      {/* konten */}
      <div
        style={{
          position: "relative",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "0 1.5rem",
          opacity: leaving ? 0 : 1,
          transform: leaving ? "translateY(-24px)" : "translateY(0)",
          transition: "opacity 0.4s ease, transform 0.5s ease",
        }}
      >
        <div
          style={{
            color: "#a78bfa",
            fontSize: "0.8rem",
            fontWeight: 600,
            letterSpacing: "0.5em",
            textTransform: "uppercase",
            marginBottom: "1.4rem",
            animation: "plFade 0.8s ease-out 0.1s both",
          }}
        >
          Portfolio
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: "clamp(2.1rem, 7vw, 4.8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            textShadow: "0 0 50px rgba(139, 92, 246, 0.45)",
          }}
        >
          {name.split(" ").map((word, wi, arr) => (
            <span
              key={wi}
              style={{
                display: "inline-block",
                whiteSpace: "nowrap",
                marginRight: wi < arr.length - 1 ? "0.3em" : 0,
              }}
            >
              {word.split("").map((ch) => {
                const i = idx;
                idx += 1;
                return (
                  <span
                    key={i}
                    className="pl-letter"
                    style={{
                      color: gradColor(i / (total - 1)),
                      animationDelay: 0.25 + i * 0.05 + "s",
                    }}
                  >
                    {ch}
                  </span>
                );
              })}
            </span>
          ))}
        </h1>

        <p
          style={{
            margin: "1.1rem 0 0",
            color: "rgba(255, 255, 255, 0.7)",
            fontSize: "clamp(0.95rem, 2.4vw, 1.25rem)",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            animation: "plFade 0.9s ease-out 1.3s both",
          }}
        >
          {role}
        </p>

        <div style={{ width: "min(340px, 78vw)", marginTop: "3rem", animation: "plFade 0.9s ease-out 0.8s both" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
              color: "rgba(196, 181, 253, 0.9)",
              fontFamily: "monospace",
              fontSize: 12,
              letterSpacing: 1,
              marginBottom: 8,
              textAlign: "left",
            }}
          >
            <span ref={msgRef}>{MESSAGES[0]}</span>
            <span ref={numRef}>0%</span>
          </div>
          <div style={{ height: 3, background: "rgba(255, 255, 255, 0.12)", borderRadius: 3, overflow: "hidden" }}>
            <div
              ref={barRef}
              style={{
                height: "100%",
                width: "0%",
                borderRadius: 3,
                background: "linear-gradient(90deg, #8b5cf6, #3b82f6, #ec4899)",
                boxShadow: "0 0 14px rgba(139, 92, 246, 0.9)",
              }}
            />
          </div>
        </div>

        <button
          type="button"
          className="pl-btn"
          onClick={go}
          disabled={!ready}
          tabIndex={ready ? 0 : -1}
          style={{
            marginTop: "2.2rem",
            padding: "0.85rem 2.6rem",
            borderRadius: 999,
            border: "1px solid rgba(167, 139, 250, 0.7)",
            background: "linear-gradient(135deg, rgba(139, 92, 246, 0.38), rgba(59, 130, 246, 0.3))",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            letterSpacing: "0.3em",
            cursor: ready ? "pointer" : "default",
            opacity: ready ? 1 : 0,
            transform: ready ? "translateY(0) scale(1)" : "translateY(14px) scale(0.96)",
            pointerEvents: ready ? "auto" : "none",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1)",
            animation: ready ? "plPulse 2s ease-in-out 0.7s infinite" : "none",
          }}
        >
          MULAI &rarr;
        </button>
        <div
          style={{
            marginTop: "0.9rem",
            fontSize: "0.72rem",
            letterSpacing: "0.2em",
            color: "rgba(196, 181, 253, 0.55)",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.8s ease 0.4s",
          }}
        >
          atau tekan Enter
        </div>
      </div>

      <style>{`
        .pl-orb { position: absolute; border-radius: 50%; }
        .pl-o1 {
          top: 8%; left: 6%; width: 620px; height: 620px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.4) 0%, transparent 70%);
          filter: blur(80px); animation: plOrb1 24s ease-in-out infinite;
        }
        .pl-o2 {
          bottom: 4%; right: 4%; width: 700px; height: 700px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.38) 0%, transparent 70%);
          filter: blur(90px); animation: plOrb2 28s ease-in-out infinite;
        }
        .pl-o3 {
          top: 42%; left: 44%; width: 480px; height: 480px;
          background: radial-gradient(circle, rgba(236, 72, 153, 0.28) 0%, transparent 70%);
          filter: blur(70px); animation: plOrb1 20s ease-in-out infinite reverse;
        }
        .pl-grid {
          position: absolute; inset: 0; opacity: 0.45;
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(139, 92, 246, 0.05) 49px, rgba(139, 92, 246, 0.05) 50px),
            repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(139, 92, 246, 0.05) 49px, rgba(139, 92, 246, 0.05) 50px);
        }
        .pl-letter {
          display: inline-block;
          animation: plLetter 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) both;
        }
        .pl-btn:hover { filter: brightness(1.25); }
        @keyframes plLetter {
          from { opacity: 0; transform: translateY(26px) scale(0.96); filter: blur(12px); }
          to { opacity: 1; transform: translateY(0) scale(1); filter: blur(0); }
        }
        @keyframes plFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes plPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.55), 0 0 24px rgba(139, 92, 246, 0.35); }
          50% { box-shadow: 0 0 0 12px rgba(139, 92, 246, 0), 0 0 36px rgba(139, 92, 246, 0.55); }
        }
        @keyframes plOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, 40px) scale(1.15); }
          66% { transform: translate(-30px, 50px) scale(0.95); }
        }
        @keyframes plOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, -40px) scale(1.12); }
        }
        @keyframes plFloat {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.5; }
          50% { transform: translate(18px, -28px) scale(1.3); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
