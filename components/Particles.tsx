import React, { useEffect, useRef, memo } from 'react';

const Particles: React.FC<{ density?: number; color?: string; opacity?: number }> = memo(({ density = 25000, color = '255,255,255', opacity = 0.05 }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const particlesRef = useRef<Array<{ x: number; y: number; vx: number; vy: number; r: number; o: number }>>([]);
  const lastTimeRef = useRef<number>(0);
  const fpsInterval = 1000 / 30; // Cap at 30 FPS for performance

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    const initParticles = () => {
      const area = width * height;
      const count = Math.min(60, Math.max(15, Math.floor(area / density))); // Cap particle count
      particlesRef.current = [];
      for (let i = 0; i < count; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.15,
          vy: (Math.random() - 0.5) * 0.15,
          r: Math.random() * 1.2 + 0.5,
          o: Math.random() * 0.5 + 0.1
        });
      }
    };

    const draw = (timestamp: number) => {
      const elapsed = timestamp - lastTimeRef.current;
      
      if (elapsed > fpsInterval) {
        lastTimeRef.current = timestamp - (elapsed % fpsInterval);
        
        ctx.clearRect(0, 0, width, height);
        
        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          
          if (p.x < 0) p.x = width;
          else if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          else if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.fillStyle = `rgba(${color}, ${p.o * opacity})`;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      
      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    
    let resizeTimeout: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 200);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(resizeTimeout);
    };
  }, [density, color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ width: '100%', height: '100%' }}
    />
  );
});

export default Particles;
