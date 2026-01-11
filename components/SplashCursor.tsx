import React, { useEffect, useRef } from 'react';

const SplashCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Configuration
    const POINTER_COLOR = '255, 255, 255';
    const TRAIL_LENGTH = 35;
    const SPLASH_THRESHOLD = 5;

    // State
    let mouse = { x: width / 2, y: height / 2 };
    let velocity = { x: 0, y: 0 };
    let points: { x: number; y: number }[] = [];

    for (let i = 0; i < TRAIL_LENGTH; i++) {
      points.push({ x: width / 2, y: height / 2 });
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      size: number;

      constructor(x: number, y: number, vx: number, vy: number) {
        this.x = x;
        this.y = y;
        this.vx = vx * 0.2 + (Math.random() - 0.5) * 2;
        this.vy = vy * 0.2 + (Math.random() - 0.5) * 2;
        this.life = 1;
        this.size = Math.random() * 3 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vx *= 0.94;
        this.vy *= 0.94;
        this.life -= 0.02;
        this.size *= 0.96;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${POINTER_COLOR}, ${this.life * 0.6})`;
        ctx.fill();
      }
    }

    let particles: Particle[] = [];

    const onMouseMove = (e: MouseEvent) => {
      velocity.x = e.clientX - mouse.x;
      velocity.y = e.clientY - mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      const speed = Math.hypot(velocity.x, velocity.y);
      if (speed > SPLASH_THRESHOLD) {
        const count = Math.min(Math.floor(speed / 4), 6);
        for (let i = 0; i < count; i++) particles.push(new Particle(mouse.x, mouse.y, velocity.x, velocity.y));
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      let leaderX = mouse.x;
      let leaderY = mouse.y;

      points.forEach((point, index) => {
        const baseEase = 0.35;
        const easing = baseEase - (index / TRAIL_LENGTH) * 0.25;
        point.x += (leaderX - point.x) * easing;
        point.y += (leaderY - point.y) * easing;
        leaderX = point.x;
        leaderY = point.y;
      });

      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.shadowBlur = 15;
      ctx.shadowColor = `rgba(${POINTER_COLOR}, 0.25)`;

      if (points.length > 1) {
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        for (let i = 1; i < points.length - 1; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2;
          const yc = (points[i].y + points[i + 1].y) / 2;
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
        }
        ctx.strokeStyle = `rgba(${POINTER_COLOR}, 0.12)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      ctx.shadowBlur = 0;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const ratio = i / points.length;
        const radius = Math.max(0.5, (1 - ratio) * 5);
        const opacity = (1 - ratio) * 0.5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${POINTER_COLOR}, ${opacity})`;
        ctx.fill();
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) particles.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };

    const anim = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(anim);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[120]"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SplashCursor;
