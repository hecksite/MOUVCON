import React, { useEffect, useRef, memo } from 'react';

const BeamsBackground: React.FC = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafIdRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true, desynchronized: true });
    if (!ctx) return;

    const MINIMUM_BEAMS = 15; // Reduced from 20
    let beams: any[] = [];

    const opacityMap = {
      subtle: 0.7,
      medium: 0.85,
      strong: 1.0,
    };

    let intensity = 'strong';

    function random(min: number, max: number) {
      return Math.random() * (max - min) + min;
    }

    function createBeam(w: number, h: number) {
      const angle = -35 + Math.random() * 10;
      return {
        x: Math.random() * w * 1.5 - w * 0.25,
        y: Math.random() * h * 1.5 - h * 0.25,
        width: 30 + Math.random() * 60,
        length: h * 2.5,
        angle,
        speed: 0.6 + Math.random() * 1.2,
        opacity: 0.12 + Math.random() * 0.16,
        hue: 0, // Changed to 0 for grayscale
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.03,
      };
    }

    function resetBeam(beam: any, index: number, totalBeams: number, w: number, h: number) {
      const column = index % 3;
      const spacing = w / 3;
      beam.y = h + 100;
      beam.x = column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = 0; // Grayscale
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function updateCanvasSize() {
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      const w = Math.floor(canvas.clientWidth || window.innerWidth);
      const h = Math.floor(canvas.clientHeight || window.innerHeight);

      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const density = Math.min(1.5, Math.max(1, (w * h) / (1280 * 800)));
      const total = Math.floor(MINIMUM_BEAMS * density * 1.5);

      beams = Array.from({ length: total }, () => createBeam(w, h));
    }

    function drawBeam(c: CanvasRenderingContext2D, beam: any, w: number, h: number) {
      c.save();
      c.translate(beam.x, beam.y);
      c.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity = beam.opacity * (0.8 + Math.sin(beam.pulse) * 0.2) * opacityMap[intensity as keyof typeof opacityMap];

      // Changed to grayscale gradient
      const gradient = c.createLinearGradient(0, 0, 0, beam.length);
      gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
      gradient.addColorStop(0.1, `rgba(255, 255, 255, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(0.4, `rgba(255, 255, 255, ${pulsingOpacity})`);
      gradient.addColorStop(0.6, `rgba(255, 255, 255, ${pulsingOpacity})`);
      gradient.addColorStop(0.9, `rgba(255, 255, 255, ${pulsingOpacity * 0.5})`);
      gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

      c.fillStyle = gradient;
      c.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      c.restore();
    }

    function animate() {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;

      ctx.clearRect(0, 0, w, h);
      ctx.filter = 'blur(35px)';

      const total = beams.length;
      for (let i = 0; i < total; i++) {
        const b = beams[i];
        b.y -= b.speed;
        b.pulse += b.pulseSpeed;

        if (b.y + b.length < -100) {
          resetBeam(b, i, total, w, h);
        }
        drawBeam(ctx, b, w, h);
      }

      rafIdRef.current = requestAnimationFrame(animate);
    }

    function init() {
      const parent = canvas.parentElement;
      if (parent) {
        const rect = parent.getBoundingClientRect();
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
      }
      updateCanvasSize();
      cancelAnimationFrame(rafIdRef.current);
      animate();
    }

    const handleResize = () => {
      updateCanvasSize();
    };

    // Intersection Observer for performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
          if (!entry.isIntersecting) {
            cancelAnimationFrame(rafIdRef.current);
          } else {
            animate();
          }
        });
      },
      { threshold: 0 }
    );

    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    window.addEventListener('resize', handleResize, { passive: true });

    init();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafIdRef.current);
      if (canvas.parentElement) {
        observer.unobserve(canvas.parentElement);
      }
      observer.disconnect();
    };
  }, []);

  return (
    <div className="absolute inset-0 bg-neutral-950">
      <div className="relative w-full h-full">
        <canvas ref={canvasRef} className="absolute inset-0"></canvas>
        <div className="absolute inset-0 bg-neutral-950/5 backdrop-blur-3xl animate-pulse [animation-duration:8s]"></div>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-neutral-950 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent"></div>
          <div className="absolute -inset-[25%] bg-[radial-gradient(60%_60%_at_50%_40%,rgba(80,80,80,0.10),transparent)]"></div>
        </div>
      </div>
    </div>
  );
});

BeamsBackground.displayName = 'BeamsBackground';

export default BeamsBackground;
