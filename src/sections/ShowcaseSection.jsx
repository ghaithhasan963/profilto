import { useRef, useEffect, useMemo } from "react";
import { FaCode, FaUserLock, FaBrain, FaEye } from "react-icons/fa";

// ============== Neural background (per-card) ==============
function NeuralCanvas({ getMouse, density = 22, linkDist = 110 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });

    // Size sync with devicePixelRatio
    let w = canvas.clientWidth;
    let h = canvas.clientHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();

    const makePts = (count) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
      }));

    const points = makePts(density);

    let raf;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // subtle edge vignette
      const grad = ctx.createRadialGradient(
        w / 2,
        h / 2,
        Math.min(w, h) * 0.2,
        w / 2,
        h / 2,
        Math.max(w, h) * 0.7
      );
      grad.addColorStop(0, "rgba(0,0,0,0)");
      grad.addColorStop(1, "rgba(0,0,0,0.4)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // draw points
      ctx.fillStyle = "rgba(192,192,192,0.35)";
      for (const p of points) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // draw links with silver glow closer to mouse midpoint
      const mouse = getMouse();
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < linkDist) {
            let alpha = 0.1;
            if (mouse) {
              const midx = (a.x + b.x) / 2;
              const midy = (a.y + b.y) / 2;
              const md = Math.hypot(mouse.x - midx, mouse.y - midy);
              alpha = Math.min(0.6, Math.max(0.12, 1 - md / 200));
            }
            ctx.strokeStyle = `rgba(192,192,192,${alpha})`;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // motion + gentle mouse attraction
      for (const p of points) {
        if (mouse) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const d = Math.hypot(dx, dy);
          if (d < 130 && d > 0.001) {
            p.vx += (dx / d) * 0.00045;
            p.vy += (dy / d) * 0.00045;
          }
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }

      raf = requestAnimationFrame(render);
    };

    render();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [getMouse, density, linkDist]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

// ============== Card with 3D tilt + blurred glass + neural bg + spotlight ==============
function NeuralCard({ icon, title, description, tags, link }) {
  const cardRef = useRef(null);
  const mouseRef = useRef(null);

  const getMouse = useMemo(() => () => mouseRef.current, []);

  const onMouseMove = (e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // for neural canvas
    mouseRef.current = { x, y };

    // 3D tilt
    const rx = (y - cy) / 12;
    const ry = (x - cx) / 12;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg)`;

    // dynamic glow as mouse "light"
    const shadowX = (x - cx) / 4;
    const shadowY = (y - cy) / 4;
    el.style.boxShadow = `${shadowX}px ${shadowY}px 30px rgba(255,255,255,0.08)`;
  };

  const onMouseLeave = () => {
    mouseRef.current = null;
    if (cardRef.current) {
      cardRef.current.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg)";
      cardRef.current.style.boxShadow = "none";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative overflow-hidden rounded-xl border border-white/10 bg-black/60 backdrop-blur-lg transition-transform duration-300 shadow-[0_0_24px_rgba(255,255,255,0.06)]"
    >
      {/* Neural bg */}
      <div className="absolute inset-0 -z-10">
        <NeuralCanvas getMouse={getMouse} />
        {/* inner silver edge highlighting */}
        <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
        <div className="pointer-events-none absolute inset-0 rounded-xl shadow-[inset_0_0_30px_rgba(255,255,255,0.06)]" />
        {/* Mouse spotlight */}
        <div
          className="pointer-events-none absolute w-96 h-96 rounded-full -z-10"
          style={{
            left: mouseRef.current?.x - 200 || 0,
            top: mouseRef.current?.y - 200 || 0,
            background:
              "radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 40%, rgba(255,255,255,0) 80%)",
            filter: "blur(2px)",
            transition: "left 0.05s, top 0.05s",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 p-6 text-center text-white">
        <div className="flex justify-center mb-3">{icon}</div>
        <h3 className="text-xl font-bold text-cyan-400 mb-2">{title}</h3>
        <p className="text-sm text-white/80 mb-4">{description}</p>

        <div className="flex gap-2 justify-center flex-wrap mb-6">
          {tags?.map((t, i) => (
            <span
              key={i}
              className="bg-gray-700/70 text-white px-3 py-1 rounded-full text-xs"
            >
              {t}
            </span>
          ))}
        </div>

        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          >
            <FaEye />
            <span>Preview</span>
          </a>
        )}
      </div>
    </div>
  );
}

// ============== Showcase section ==============
export default function ShowcaseSection() {
  const projects = [
    {
      icon: <FaBrain className="text-3xl text-cyan-400" />,
      title: "Digital Shadow Academy for Cybersecurity",
      description:
        "A specialized cybersecurity academy delivering hands-on tracks, labs, and real-world challenges for all levels.",
      tags: ["Cybersecurity", "Academy", "Challenges"],
      link: "#",
    },
    {
      icon: <FaUserLock className="text-3xl text-cyan-400" />,
      title: "Secure Login System for Platforms",
      description:
        "Robust authentication with JWT, sessions, RBAC, 2FA, and secure account flows designed for modern web apps.",
      tags: ["Authentication", "Security", "2FA"],
      link: "#",
    },
    {
      icon: <FaCode className="text-3xl text-cyan-400" />,
      title: "Web Programming Learning Platform",
      description:
        "Interactive web dev learning with structured paths in HTML, CSS, JS, and backend — projects, quizzes, and reviews.",
      tags: ["Web Dev", "Learning", "Projects"],
      link: "#",
    },
  ];

  return (
    <section id="work" className="py-16 px-4 md:px-12">
      <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-10">
        Featured Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {projects.map((p, i) => (
          <NeuralCard key={i} {...p} />
        ))}
      </div>
    </section>
  );
}