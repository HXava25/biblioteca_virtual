import { useMemo } from 'react';
import { useTheme } from '../context/ThemeContext';

function AmbientParticles() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Íconos según el tema
  const dayIcons = ['☀️', '✨', '🔆', '🌤️', '✨'];
  const nightIcons = ['⭐', '✨', '🌟', '💫', '✨'];

  const currentIcons = isDark ? nightIcons : dayIcons;

  // Generamos 22 partículas con posiciones, tamaños y tiempos únicos memoizados
  const particles = useMemo(() => {
    return Array.from({ length: 22 }, (_, i) => ({
      id: i,
      left: `${(i * 4.6 + Math.random() * 3).toFixed(1)}%`,
      delay: `${(Math.random() * 8).toFixed(1)}s`,
      duration: `${(8 + Math.random() * 7).toFixed(1)}s`,
      size: `${(14 + Math.random() * 12).toFixed(0)}px`,
      opacity: (0.35 + Math.random() * 0.45).toFixed(2),
      iconIndex: i % 5,
    }));
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="ambient-particle"
          style={{
            left: p.left,
            fontSize: p.size,
            animationDelay: p.delay,
            animationDuration: p.duration,
            opacity: p.opacity,
            filter: isDark
              ? 'drop-shadow(0 0 6px rgba(255, 235, 100, 0.7))'
              : 'drop-shadow(0 0 4px rgba(255, 180, 0, 0.5))',
            transition: 'opacity 0.5s ease',
          }}
        >
          {currentIcons[p.iconIndex]}
        </span>
      ))}
    </div>
  );
}

export default AmbientParticles;

