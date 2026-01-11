import React, { useEffect, useRef, memo } from 'react';

interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  baseSize: number;
  size: number;
}

type Shape = 'grid' | 'random' | 'wave' | 'spiral';

interface MorphingParticlesProps {
  particleCount?: number;
  color?: string;
  opacity?: number;
  morphDuration?: number;
  className?: string;
}

const MorphingParticles: React.FC<MorphingParticlesProps> = memo(({
  particleCount = 350,
  color = '255, 255, 255',
  opacity = 0.6,
  morphDuration = 8000,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const shapeIndexRef = useRef(0);
  const animationRef = useRef<number>();
  const lastMorphRef = useRef(Date.now());

  const shapes: Shape[] = ['grid', 'random', 'wave', 'spiral'];

  const getShapeTargets = (shape: Shape, width: number, height: number, count: number): { x: number; y: number }[] => {
    const targets: { x: number; y: number }[] = [];
    const centerX = width / 2;
    const centerY = height / 2;
    const padding = 80;

    switch (shape) {
      case 'grid': {
        const cols = Math.ceil(Math.sqrt(count * (width / height)));
        const rows = Math.ceil(count / cols);
        const cellW = (width - padding * 2) / cols;
        const cellH = (height - padding * 2) / rows;
        for (let i = 0; i < count; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          targets.push({
            x: padding + col * cellW + cellW / 2,
            y: padding + row * cellH + cellH / 2
          });
        }
        break;
      }
      case 'random': {
        for (let i = 0; i < count; i++) {
          targets.push({
            x: padding + Math.random() * (width - padding * 2),
            y: padding + Math.random() * (height - padding * 2)
          });
        }
        break;
      }
      case 'wave': {
        const amplitude = height * 0.25;
        const frequency = 3;
        for (let i = 0; i < count; i++) {
          const progress = i / count;
          const x = padding + progress * (width - padding * 2);
          const y = centerY + Math.sin(progress * Math.PI * frequency * 2) * amplitude;
          targets.push({ x, y });
        }
        break;
      }
      case 'spiral': {
        const maxRadius = Math.min(width, height) * 0.4;
        const turns = 4;
        for (let i = 0; i < count; i++) {
          const progress = i / count;
          const angle = progress * Math.PI * 2 * turns;
          const radius = progress * maxRadius;
          targets.push({
            x: centerX + Math.cos(angle) * radius,
            y: centerY + Math.sin(angle) * radius
          });
        }
        break;
      }
    }
    return targets;
  };

  const lerp = (start: number, end: number, factor: number): number => {
    return start + (end - start) * factor;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    };

    const initParticles = () => {
      const rect = canvas.getBoundingClientRect();
      const targets = getShapeTargets(shapes[0], rect.width, rect.height, particleCount);
      
      particlesRef.current = targets.map((target) => ({
        x: rect.width / 2 + (Math.random() - 0.5) * 100,
        y: rect.height / 2 + (Math.random() - 0.5) * 100,
        targetX: target.x,
        targetY: target.y,
        baseSize: 1.5 + Math.random() * 1.5,
        size: 1.5 + Math.random() * 1.5
      }));
    };

    const morphToShape = (shapeIndex: number) => {
      const rect = canvas.getBoundingClientRect();
      const targets = getShapeTargets(shapes[shapeIndex], rect.width, rect.height, particleCount);
      
      particlesRef.current.forEach((particle, i) => {
        if (targets[i]) {
          particle.targetX = targets[i].x;
          particle.targetY = targets[i].y;
        }
      });
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    const animate = () => {
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const now = Date.now();
      if (now - lastMorphRef.current > morphDuration) {
        shapeIndexRef.current = (shapeIndexRef.current + 1) % shapes.length;
        morphToShape(shapeIndexRef.current);
        lastMorphRef.current = now;
      }

      const mouse = mouseRef.current;
      const hoverRadius = 100;

      particlesRef.current.forEach((particle) => {
        // Smooth movement towards target
        particle.x = lerp(particle.x, particle.targetX, 0.03);
        particle.y = lerp(particle.y, particle.targetY, 0.03);

        // Mouse hover effect
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < hoverRadius) {
          const scale = 1 + (1 - dist / hoverRadius) * 2;
          particle.size = lerp(particle.size, particle.baseSize * scale, 0.1);
        } else {
          particle.size = lerp(particle.size, particle.baseSize, 0.1);
        }

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${opacity})`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    window.addEventListener('resize', () => {
      resizeCanvas();
      morphToShape(shapeIndexRef.current);
    });
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [particleCount, color, opacity, morphDuration]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-auto ${className}`}
      style={{ background: 'transparent' }}
    />
  );
});

MorphingParticles.displayName = 'MorphingParticles';

export default MorphingParticles;
