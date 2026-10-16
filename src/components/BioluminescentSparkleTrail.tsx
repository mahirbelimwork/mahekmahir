import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  decay: number;
  color: string;
  isHeart: boolean;
  rotation: number;
  rotationSpeed: number;
}

export const BioluminescentSparkleTrail: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastPosRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const colors = [
      '#EAD59E', // Golden stardust
      '#D4AF37', // Imperial gold
      '#F4C2D0', // Rose quartz
      '#E295A8', // Dusty pink
      '#FAF6F0', // Soft ivory
    ];

    const spawnParticles = (x: number, y: number, count: number = 3) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.8 + 0.4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isHeart = Math.random() < 0.28;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // slight upward float
          size: isHeart ? Math.random() * 8 + 6 : Math.random() * 3.5 + 1.5,
          opacity: 1,
          decay: Math.random() * 0.02 + 0.015,
          color,
          isHeart,
          rotation: Math.random() * Math.PI,
          rotationSpeed: (Math.random() - 0.5) * 0.08,
        });
      }

      // Keep maximum particle buffer bounded for ultra-fluid 60fps
      if (particlesRef.current.length > 120) {
        particlesRef.current.splice(0, particlesRef.current.length - 120);
      }
    };

    const onPointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = e.clientX;
        clientY = e.clientY;
      } else {
        return;
      }

      if (lastPosRef.current) {
        const dx = clientX - lastPosRef.current.x;
        const dy = clientY - lastPosRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Spawn smoothly along the drag line if distance > 6px
        if (dist > 6) {
          const steps = Math.min(Math.floor(dist / 8), 4);
          for (let s = 0; s <= steps; s++) {
            const ratio = s / steps;
            spawnParticles(
              lastPosRef.current.x + dx * ratio,
              lastPosRef.current.y + dy * ratio,
              1
            );
          }
          lastPosRef.current = { x: clientX, y: clientY };
        }
      } else {
        lastPosRef.current = { x: clientX, y: clientY };
        spawnParticles(clientX, clientY, 2);
      }
    };

    const onPointerLeave = () => {
      lastPosRef.current = null;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchstart', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerLeave, { passive: true });
    window.addEventListener('mouseleave', onPointerLeave);

    const drawHeart = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number,
      opacity: number,
      color: string,
      rotation: number
    ) => {
      c.save();
      c.translate(x, y);
      c.rotate(rotation);
      c.beginPath();
      const topCurveHeight = size * 0.3;
      c.moveTo(0, topCurveHeight);
      // Top left curve
      c.bezierCurveTo(-size / 2, -size / 2, -size, size / 3, 0, size);
      // Top right curve
      c.bezierCurveTo(size, size / 3, size / 2, -size / 2, 0, topCurveHeight);
      c.fillStyle = color;
      c.globalAlpha = opacity;
      c.shadowColor = color;
      c.shadowBlur = 8;
      c.fill();
      c.restore();
    };

    const render = () => {
      animId = requestAnimationFrame(render);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const list = particlesRef.current;
      for (let i = list.length - 1; i >= 0; i--) {
        const p = list[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy -= 0.02; // soft gravity/buoyancy
        p.opacity -= p.decay;
        p.rotation += p.rotationSpeed;

        if (p.opacity <= 0) {
          list.splice(i, 1);
          continue;
        }

        if (p.isHeart) {
          drawHeart(ctx, p.x, p.y, p.size, p.opacity, p.color, p.rotation);
        } else {
          ctx.save();
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.globalAlpha = p.opacity;
          ctx.shadowColor = p.color;
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.restore();
        }
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchstart', onPointerMove);
      window.removeEventListener('touchend', onPointerLeave);
      window.removeEventListener('mouseleave', onPointerLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      aria-hidden="true"
    />
  );
};
