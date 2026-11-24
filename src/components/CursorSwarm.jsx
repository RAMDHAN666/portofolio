import { useEffect, useLayoutEffect, useRef } from "react";

/**
 * Swarm kursor yang "membangun" portofolio: klik, seret, tarik sudut, ketik.
 * Hero dibangun dulu, lalu section lain saat di-scroll. Setelah hero selesai,
 * satu kursor kembali untuk menyeret kartu lanyard.
 * Pakai: <CursorSwarm ready={!loading} />
 */
const COLORS = [
  "#ff5a5f", "#ffb020", "#34d399", "#38bdf8", "#a78bfa", "#f472b6",
  "#facc15", "#22d3ee", "#fb923c", "#4ade80", "#818cf8", "#2dd4bf",
];

let hasBuilt = false; // sekali per page load
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const lerp = (a, b, t) => a + (b - a) * t;
const eio = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const eout = (t) => 1 - Math.pow(1 - t, 3);

const isCard = (el) => {
  const r = el.getBoundingClientRect();
  if (r.width < 140 || r.height < 70 || r.width > window.innerWidth * 0.95) return false;
  const cs = getComputedStyle(el);
  const rad = parseFloat(cs.borderTopLeftRadius) || 0;
  const fill =
    cs.backgroundColor !== "rgba(0, 0, 0, 0)" ||
    cs.backgroundImage !== "none" ||
    parseFloat(cs.borderTopWidth) > 0;
  return rad >= 10 && fill;
};

const clearEl = (k) => {
  const s = k.el.style;
  s.visibility = "";
  s.translate = "";
  s.scale = "";
  s.clipPath = "";
};

const textBox = (el) => {
  const rg = document.createRange();
  rg.selectNodeContents(el);
  const t = rg.getBoundingClientRect();
  return t.width > 0 ? t : el.getBoundingClientRect();
};

const findNav = () => {
  const n = document.querySelector("nav, header");
  if (n) return n;
  const root = document.getElementById("root");
  if (!root) return null;
  return [...root.querySelectorAll("div")].find((el) => {
    const cs = getComputedStyle(el);
    if (cs.position !== "fixed" && cs.position !== "sticky") return false;
    const r = el.getBoundingClientRect();
    return r.top < 5 && r.width > window.innerWidth * 0.6 && r.height > 30 && r.height < 200;
  }) || null;
};
const buildTasks = () => {
  const out = [];
  const add = (el, label, kind, d = [0, 0]) => {
    if (el) out.push({ el, label, kind, d, state: 0, tx: 0, ty: 0 });
  };
  const hero = document.querySelector("section");
  if (!hero) return out;
  const content = hero.children[2];
  const text = content && content.children[0];
  const img = content && content.children[1];

  add(findNav(), "Navbar", "drag", [0, -60]);
  if (text) {
    add(text.children[0], "Badge", "pop");
    add(text.children[1], "Heading", "type");
    add(text.children[2], "Role", "type");
    add(text.children[3], "Tagline", "type");
    add(text.children[4], "Scroll Button", "drag", [0, 90]);
  }
  add(img, "3D Lanyard", "draw");
  out.heroCount = out.length;

  const root = document.getElementById("root");
  const kids = root ? [...root.children] : [];
  const idx = kids.indexOf(hero);
  if (idx >= 0) {
    kids.slice(idx + 1).forEach((sec) => {
      if (sec.tagName === "FOOTER" || sec.tagName === "CANVAS") return;
      if (getComputedStyle(sec).position === "fixed") return;
      const all = [...sec.querySelectorAll("*")].filter(isCard);
      const cards = all.filter((el) => !all.some((o) => o !== el && o.contains(el)));
      const hd = [...sec.querySelectorAll("h1,h2,h3")].find((x) => !cards.some((c) => c.contains(x)));
      if (hd) {
        const p = hd.parentElement;
        const wrap = p !== sec && !cards.some((c) => p.contains(c)) && p.getBoundingClientRect().height < 360;
        add(wrap ? p : hd, "Section Title", "type");
      }
      cards.forEach((c, i) => {
        const r = c.getBoundingClientRect();
        const kind = ["draw", "drag", "draw", "pop"][i % 4];
        const dir = r.left + r.width / 2 < window.innerWidth / 2 ? -1 : 1;
        const lb = c.querySelector("h1,h2,h3,h4,strong");
        const label = ((lb && lb.textContent) || "Card").trim().slice(0, 20);
        add(c, label, kind, kind === "drag" ? [dir * 240, i % 2 ? -40 : 40] : [0, 0]);
      });
    });
  }
  return out;
};

export default function CursorSwarm({ count = 4, ready = true }) {
  const canvasRef = useRef(null);
  const tasksRef = useRef([]);
  const readyRef = useRef(ready);
  readyRef.current = ready;

  // sembunyikan semua elemen yang akan dibangun sebelum browser menggambar
  useLayoutEffect(() => {
    if (hasBuilt || window.location.pathname !== "/") {
      tasksRef.current = [];
      return undefined;
    }
    const tasks = buildTasks();
    tasksRef.current = tasks;
    tasks.forEach((k) => {
      k.el.style.visibility = "hidden";
    });
    return () => tasks.forEach(clearEl);
  }, []);

  useEffect(() => {
    const tasks = tasksRef.current;
    if (!tasks.length) return undefined;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf, pid = 1;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const onMove = (e) => {
      pid = e.pointerId;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const agents = Array.from({ length: count }, (_, i) => ({
      x: Math.random() * w, y: -60 - Math.random() * 120, vx: 0, vy: 0,
      color: "#ffffff",
      ang: (i / count) * Math.PI * 2,
      rad: 30 + Math.random() * 60,
      spin: (0.3 + Math.random() * 0.4) * (i % 2 ? 1 : -1),
      stiff: 0.02 + Math.random() * 0.02,
      size: 0.9 + Math.random() * 0.25,
      press: 0, busy: false,
    }));
    const active = [], ripples = [], draws = [];
    const heroN = tasks.heroCount || 0;
    let phase = "wait", rdy = 0, workStart = 0, exitAt = 0, lastStart = 0;
    let lanDone = false, lan = null;

    const rectOf = (k) => k.el.getBoundingClientRect();
    const inView = (k) => {
      const r = rectOf(k);
      return r.width > 0 && r.height > 0 && r.top < h - 70 && r.bottom > 70;
    };
    const geom = (k) => {
      const r = rectOf(k);
      const cx = r.left + r.width / 2 - k.tx;
      const cy = r.top + r.height / 2 - k.ty;
      return { cx, cy, L: cx - k.w / 2, T: cy - k.h / 2, R: cx + k.w / 2, B: cy + k.h / 2 };
    };
    const grab = (g, k) => ({ x: g.cx, y: g.T + Math.min(k.h * 0.22, 44) });
    const startPoint = (k, g) => {
      if (k.kind === "type") {
        const tb = textBox(k.el);
        return { x: tb.left, y: tb.top + tb.height / 2 };
      }
      if (k.kind === "draw") return { x: g.L, y: g.T };
      if (k.kind === "drag") {
        const p = grab(g, k);
        return { x: p.x + k.d[0], y: p.y + k.d[1] };
      }
      return { x: g.cx, y: g.cy };
    };

    const startTask = (k, now) => {
      const r = rectOf(k);
      k.w = r.width;
      k.h = r.height;
      const S = startPoint(k, geom(k));
      let best = null, bd = 1e9;
      agents.forEach((a) => {
        if (a.busy) return;
        const dd = Math.hypot(a.x - S.x, a.y - S.y);
        if (dd < bd) { bd = dd; best = a; }
      });
      if (!best) return false;
      best.busy = true; best.op = 1;
      best.vx = best.vy = 0;
      Object.assign(k, {
        state: 1, t0: now, a: best, p0: { x: clamp(S.x + (Math.random() - 0.5) * 500, 10, w - 10), y: 8 },
        travel: clamp(Math.abs(S.y - 8) / 1500 + 0.2, 0.3, 0.7),
        actDur: { type: 0.65, draw: 0.7, drag: 0.6, pop: 0.4 }[k.kind],
        bend: (Math.random() < 0.5 ? -1 : 1) * (0.12 + Math.random() * 0.15),
      });
      active.push(k);
      return true;
    };

    const stepTask = (k, now) => {
      const a = k.a;
      if (!k.el.isConnected) { a.busy = false; return true; }
      const g = geom(k);
      const t = (now - k.t0) / 1000;
      const tr = k.travel, ck = 0.12, act = k.actDur, hold = 0.2, end = tr + ck + act;
      let px, py, rect = null, caret = null, alpha = 1;

      if (t < tr) {
        const u = eio(t / tr), S = startPoint(k, g), p0 = k.p0;
        const cx = (p0.x + S.x) / 2 - (S.y - p0.y) * k.bend;
        const cy = (p0.y + S.y) / 2 + (S.x - p0.x) * k.bend;
        px = (1 - u) * (1 - u) * p0.x + 2 * (1 - u) * u * cx + u * u * S.x;
        py = (1 - u) * (1 - u) * p0.y + 2 * (1 - u) * u * cy + u * u * S.y;
      } else if (t < tr + ck) {
        const S = startPoint(k, g);
        px = S.x; py = S.y; a.press = 1;
        if (!k.clicked) {
          k.clicked = true;
          ripples.push({ x: px, y: py, t0: now, c: a.color });
        }
      } else if (t < end) {
        a.press = 0;
        const u = (t - tr - ck) / act, s = k.el.style;
        if (k.kind === "type") {
          const tb = textBox(k.el), edge = lerp(tb.left, tb.right, eio(u));
          s.clipPath = `inset(-40px ${clamp((1 - (edge - g.L) / k.w) * 100, 0, 100)}% -40px -40px)`;
          px = edge;
          py = tb.top + tb.height / 2 + Math.sin(u * 10) * Math.min(6, tb.height * 0.15);
          caret = { x: edge, t: tb.top, b: tb.bottom };
        } else if (k.kind === "draw") {
          const ex = eio(u), ey = eio(clamp(u * 1.12 - 0.04, 0, 1));
          s.clipPath = `inset(-40px ${(1 - ex) * 100}% ${(1 - ey) * 100}% -40px)`;
          px = g.L + ex * k.w;
          py = g.T + ey * k.h;
          rect = { L: g.L, T: g.T, R: px, B: py };
        } else if (k.kind === "drag") {
          const e = eout(u), dx = k.d[0] * (1 - e), dy = k.d[1] * (1 - e), p = grab(g, k);
          k.tx = dx; k.ty = dy;
          s.translate = `${dx}px ${dy}px`;
          px = p.x + dx; py = p.y + dy;
          rect = { L: g.L + dx, T: g.T + dy, R: g.R + dx, B: g.B + dy };
        } else {
          const e = eout(u);
          s.scale = String(0.8 + 0.2 * e);
          px = lerp(g.cx, g.cx + k.w * 0.25, e);
          py = lerp(g.cy, g.B + 12, e);
          rect = { L: g.L, T: g.T, R: g.R, B: g.B };
        }
        if (!k.shown) { k.shown = true; s.visibility = ""; }
        alpha = Math.min(1, (t - tr - ck) / 0.1);
      } else {
        if (!k.fin) { k.fin = true; clearEl(k); k.tx = k.ty = 0; }
        px = k.px; py = k.py;
        if (k.kind !== "type") rect = { L: g.L, T: g.T, R: g.R, B: g.B };
        alpha = 1 - (t - end) / hold; a.op = clamp(alpha, 0, 1);
        if (t > end + hold) { a.busy = false; return true; }
      }
      a.x = clamp(px, 6, w - 6);
      a.y = clamp(py, 6, h - 6);
      k.px = px; k.py = py;
      if (rect || caret) draws.push({ rect, caret, label: k.label, color: a.color, alpha });
      return false;
    };

    // ---- lanyard: kirim event pointer ke canvas 3D supaya kartunya benar-benar terseret
    const fire = (type, x, y, b) => {
      try {
        lan.cv.dispatchEvent(
          new PointerEvent(type, {
            bubbles: true, cancelable: true, composed: true, clientX: x, clientY: y,
            pointerId: pid, pointerType: "mouse", isPrimary: true,
            button: type === "pointermove" ? -1 : 0, buttons: b,
          })
        );
      } catch (e) { /* abaikan */ }
    };
    const stopReal = (e) => {
      if (e.isTrusted) e.stopImmediatePropagation();
    };
    const startLanyard = (now) => {
      const k = tasks.find((x) => x.label === "3D Lanyard");
      const cv = k && k.el.querySelector("canvas");
      const a = agents.find((x) => !x.busy);
      if (!cv || !a) { lanDone = true; return false; }
      cv.addEventListener("pointermove", stopReal, true);
      const r = cv.getBoundingClientRect();
      a.busy = true; a.op = 1; a.vx = a.vy = 0;
      a.x = r.left + r.width / 2 + 180; a.y = -60;
      lan = { cv, a, t0: now, p0: { x: a.x, y: a.y }, down: false, up: false };
      return true;
    };
    const stepLanyard = (now) => {
      const { cv, a } = lan;
      const r = cv.getBoundingClientRect();
      const G = { x: r.left + r.width / 2, y: r.top + r.height * 0.58 };
      const tt = (now - lan.t0) / 1000, T1 = 0.7, T2 = T1 + 0.15 + 1.7;
      let px, py;
      if (tt < T1) {
        const u = eio(tt / T1);
        px = lerp(lan.p0.x, G.x, u) + Math.sin(u * Math.PI) * 70;
        py = lerp(lan.p0.y, G.y, u);
      } else if (tt < T1 + 0.15) {
        px = G.x; py = G.y; a.press = 1;
        if (!lan.down) {
          lan.down = true;
          ripples.push({ x: px, y: py, t0: now, c: a.color });
          fire("pointerdown", px, py, 1);
        }
      } else if (tt < T2) {
        const u = (tt - T1 - 0.15) / 1.7;
        px = G.x + 190 * Math.sin(u * Math.PI * 3) * (1 - 0.4 * u);
        py = G.y + 40 * Math.sin(u * Math.PI);
        fire("pointermove", px, py, 1);
      } else {
        if (!lan.up) {
          lan.up = true; a.press = 0; lan.t3 = now; lan.ux = G.x; lan.uy = G.y;
          fire("pointerup", G.x, G.y, 0);
        }
        const u = clamp((now - lan.t3) / 500, 0, 1);
        px = lan.ux; py = lerp(lan.uy, -100, eio(u));
        if (u >= 1) {
          cv.removeEventListener("pointermove", stopReal, true);
          a.busy = false; lanDone = true; lan = null; phase = "idle";
          return;
        }
      }
      a.x = px; a.y = py;
    };

    // ---- gambar
    const drawSel = (d) => {
      const r = d.rect, pad = 6;
      const x = r.L - pad, y = r.T - pad;
      const bw = Math.max(r.R - r.L, 0) + pad * 2, bh = Math.max(r.B - r.T, 0) + pad * 2;
      ctx.save();
      ctx.globalAlpha = d.alpha;
      ctx.setLineDash([7, 5]);
      ctx.lineWidth = 1.5;
      ctx.strokeStyle = d.color;
      ctx.strokeRect(x, y, bw, bh);
      ctx.setLineDash([]);
      ctx.fillStyle = "#fff";
      [[x, y], [x + bw, y], [x, y + bh], [x + bw, y + bh]].forEach(([cx, cy]) => {
        ctx.fillRect(cx - 3, cy - 3, 6, 6);
        ctx.strokeRect(cx - 3, cy - 3, 6, 6);
      });
      ctx.font = "600 11px Inter, Arial, sans-serif";
      const tw = ctx.measureText(d.label).width + 14;
      const ly = y - 22 < 4 ? y + 4 : y - 22;
      ctx.fillStyle = d.color;
      ctx.fillRect(x, ly, tw, 18);
      ctx.fillStyle = "#0b0b14";
      ctx.fillText(d.label, x + 7, ly + 13);
      ctx.restore();
    };
    const drawArrow = (a) => {
      ctx.save();
      ctx.globalAlpha = a.op === undefined ? 1 : a.op; ctx.translate(a.x, a.y);
      ctx.scale(a.size * (1 - 0.18 * a.press), a.size * (1 - 0.18 * a.press));
      ctx.beginPath();
      ctx.moveTo(0, 0); ctx.lineTo(0, 17); ctx.lineTo(4, 13); ctx.lineTo(7.5, 20);
      ctx.lineTo(10, 19); ctx.lineTo(6.5, 12); ctx.lineTo(12, 12);
      ctx.closePath();
      ctx.shadowColor = a.color;
      ctx.shadowBlur = 10;
      ctx.fillStyle = a.color;
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(0,0,0,0.7)";
      ctx.stroke();
      ctx.restore();
    };

    const loop = (now) => {
      try {
        const t = now / 1000;
        ctx.clearRect(0, 0, w, h);
        draws.length = 0;

        if (phase === "wait" && readyRef.current) {
          if (!rdy) rdy = now;
          if (now - rdy > 300) { phase = "work"; workStart = now; }
        }
        if (phase === "idle") {
          const heroDone = tasks.slice(0, heroN).every((k) => k.state === 2);
          if (!lanDone && heroDone && window.scrollY < h * 0.5) {
            if (startLanyard(now)) phase = "lanyard";
          } else if (tasks.some((k) => k.state === 0 && inView(k))) {
            phase = "work"; workStart = now;
          } else if (lanDone && tasks.every((k) => k.state === 2)) {
            hasBuilt = true; phase = "done";
            return; // selesai total, berhenti
          }
        }
        if (phase === "work") {
          if (active.length < 3 && now - lastStart > 160) {
            const nxt = tasks.find((k) => k.state === 0 && inView(k));
            if (nxt && startTask(nxt, now)) lastStart = now;
          }
          if (!active.length && now - workStart > 600 && !tasks.some((k) => k.state === 0 && inView(k))) {
            phase = "exit"; exitAt = now;
          }
        }
        if (phase === "exit" && now - exitAt > 600) phase = "idle";

        for (let i = active.length - 1; i >= 0; i--) {
          if (stepTask(active[i], now)) { active[i].state = 2; active.splice(i, 1); }
        }
        if (phase === "lanyard" && lan) stepLanyard(now);

        agents.forEach((a, i) => {
          if (a.busy) return;
          let tx = a.x, ty = -140; // default: terbang ke atas
          if (phase === "work") {
            const k = active.length ? active[i % active.length] : null;
            if (k) {
              const g = geom(k);
              tx = g.cx + Math.cos(a.ang + t * a.spin) * (k.w / 2 + 50 + a.rad * 0.5);
              ty = g.cy + Math.sin(a.ang + t * a.spin) * (k.h / 2 + 40 + a.rad * 0.4);
            } else {
              tx = w / 2 + Math.cos(a.ang + t * a.spin) * w * 0.32;
              ty = h / 2 + Math.sin(a.ang + t * a.spin) * h * 0.28;
            }
            tx = clamp(tx, 20, w - 20);
            ty = clamp(ty, 20, h - 20);
          }
          a.vx += (tx - a.x) * a.stiff;
          a.vy += (ty - a.y) * a.stiff;
          a.vx *= 0.86; a.vy *= 0.86;
          a.x += a.vx; a.y += a.vy;
        });

        draws.forEach((d) => {
          if (d.rect) drawSel(d);
          if (d.caret) {
            ctx.save();
            ctx.globalAlpha = d.alpha;
            ctx.fillStyle = d.color;
            ctx.fillRect(d.caret.x - 1, d.caret.t - 3, 2, d.caret.b - d.caret.t + 6);
            ctx.restore();
          }
        });
        for (let i = ripples.length - 1; i >= 0; i--) {
          const r = ripples[i], u = (now - r.t0) / 450;
          if (u >= 1) { ripples.splice(i, 1); continue; }
          ctx.beginPath();
          ctx.arc(r.x, r.y, 6 + u * 26, 0, Math.PI * 2);
          ctx.strokeStyle = r.c;
          ctx.globalAlpha = 1 - u;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }
        agents.forEach((a) => { if (a.busy) drawArrow(a); });

        raf = requestAnimationFrame(loop);
      } catch (err) {
        console.error("CursorSwarm error:", err);
        tasks.forEach(clearEl); // pengaman: semua elemen ditampilkan lagi
      }
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (lan) lan.cv.removeEventListener("pointermove", stopReal, true);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: "fixed", top: 0, left: 0, zIndex: 9998, pointerEvents: "none" }}
    />
  );
}


