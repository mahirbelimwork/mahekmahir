import React, { useEffect, useState } from 'react';

export interface HeartParticle {
  id: number;
  emoji: string;
  x: number; // percentage (0 - 100)
  size: number; // in px
  duration: number; // in seconds
  delay: number; // in seconds
  drift: number; // in px
  rotation: number; // in degrees
}

const LUXURY_HEART_EMOJIS = ['❤️', '✨', '💖', '🌹', '💛', '💘', '🤍', '🥂'];

interface HeartRainOverlayProps {
  rainCount: number;
}

export const HeartRainOverlay: React.FC<HeartRainOverlayProps> = ({ rainCount }) => {
  const [particles, setParticles] = useState<HeartParticle[]>([]);

  useEffect(() => {
    if (rainCount === 0) return;

    // Generate a shower of falling golden & ruby heart emojis
    const newParticles: HeartParticle[] = Array.from({ length: 65 }, (_, i) => ({
      id: Date.now() + i + Math.random(),
      emoji: LUXURY_HEART_EMOJIS[Math.floor(Math.random() * LUXURY_HEART_EMOJIS.length)],
      x: Math.random() * 96 + 2,
      size: Math.floor(Math.random() * 24) + 20, // 20px to 44px
      duration: Math.random() * 2.2 + 2.8,
      delay: Math.random() * 1.6,
      drift: (Math.random() - 0.5) * 90,
      rotation: (Math.random() - 0.5) * 60,
    }));

    setParticles((prev) => [...prev, ...newParticles]);

    const timer = setTimeout(() => {
      setParticles([]);
    }, 6500);

    return () => clearTimeout(timer);
  }, [rainCount]);

  if (particles.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-50 select-none"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block pointer-events-none will-change-transform"
          style={{
            left: `${p.x}%`,
            top: '-50px',
            fontSize: `${p.size}px`,
            lineHeight: 1,
            filter: 'drop-shadow(0 4px 14px rgba(234, 213, 158, 0.45))',
            animation: `fallingHeartRain ${p.duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${p.delay}s forwards`,
            transform: `rotate(${p.rotation}deg)`,
            ['--drift' as string]: `${p.drift}px`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
