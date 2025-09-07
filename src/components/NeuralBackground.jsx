import { useRef, useEffect } from "react";

const NeuralBackground = () => {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const onResize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", onResize);

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    const onLeave = () => {
      mouse.current.x = null;
      mouse.current.y = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const createPoints = (count, speed) =>
      Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
      }));

    const far = createPoints(55, 0.25);
    const near = createPoints(35, 0.6);

    const drawLayer = (pts, maxDist, dotAlpha, baseLineAlpha, attract) => {
      ctx.fillStyle = `rgba(192,192,192,${dotAlpha})`;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.hypot(dx, dy);
          if (dist < maxDist) {
            let glow = baseLineAlpha;
            if (mouse.current.x !== null) {
              const mx = (pts[i].x + pts[j].x) / 2;
              const my = (pts[i].y + pts[j].y) / 2;
              const md = Math.hypot(mouse.current.x - mx, mouse.current.y - my);
              glow = Math.min(0.65, Math.max(baseLineAlpha, 1 - md / 240));
            }
            ctx.strokeStyle = `rgba(192,192,192,${glow})`;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      for (const p of pts) {
        if (mouse.current.x !== null) {
          const dx = mouse.current.x - p.x;
          const dy = mouse.current.y - p.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 180 && dist > 0.001) {
            p.vx += (dx / dist) * attract;
            p.vy += (dy / dist) * attract;
          }
        }
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
    };

    let raf;
    const render = () => {
      ctx.clearRect(0, 0, w, h);

      if (mouse.current.x !== null) {
        const grad = ctx.createRadialGradient(
          mouse.current.x,
          mouse.current.y,
          0,
          mouse.current.x,
          mouse.current.y,
          420
        );
        grad.addColorStop(0, "rgba(255,255,255,0.06)");
        grad.addColorStop(1, "rgba(255,255,255,0)");
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      drawLayer(far, 110, 0.15, 0.08, 0.00015);
      drawLayer(near, 140, 0.28, 0.12, 0.00035);

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-20 pointer-events-none bg-black"
    />
  );
};

export default NeuralBackground;