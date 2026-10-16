import React, { useMemo } from 'react';

interface Particle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  rotation: number;
  color: string;
  isStardust: boolean;
}

export const FloatingPetals: React.FC<{ count?: number; active?: boolean }> = ({
  count = 24,
  active = true,
}) => {
  const particles = useMemo<Particle[]>(() => {
    const colors = [
      'rgba(197, 160, 89, 0.55)', // antique gold
      'rgba(234, 213, 158, 0.65)', // luminous champagne gold
      'rgba(194, 99, 125, 0.45)',  // luxury velvet rose
      'rgba(226, 149, 168, 0.35)', // soft blush
      'rgba(250, 246, 240, 0.45)', // incandescent ivory
    ];

    return Array.from({ length: count }, (_, i) => {
      const isStardust = i % 3 === 0;
      return {
        id: i,
        left: Math.random() * 96 + 2,
        size: isStardust ? Math.floor(Math.random() * 5) + 3 : Math.floor(Math.random() * 12) + 10,
        duration: isStardust ? Math.random() * 6 + 7 : Math.random() * 8 + 10,
        delay: Math.random() * 6,
        opacity: Math.random() * 0.4 + 0.35,
        rotation: Math.floor(Math.random() * 360),
        color: colors[i % colors.length],
        isStardust,
      };
    });
  }, [count]);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none overflow-hidden z-0"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute block pointer-events-none"
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: p.isStardust ? `${p.size}px` : `${p.size * 1.3}px`,
            backgroundColor: p.color,
            borderRadius: p.isStardust ? '50%' : '50% 0 50% 50%',
            opacity: p.opacity,
            transform: `rotate(${p.rotation}deg)`,
            boxShadow: p.isStardust
              ? '0 0 10px rgba(234, 213, 158, 0.7)'
              : '0 2px 8px rgba(0, 0, 0, 0.3)',
            animation: `fallPetalGold ${p.duration}s linear ${p.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
};
