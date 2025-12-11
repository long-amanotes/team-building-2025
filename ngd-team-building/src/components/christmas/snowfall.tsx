import { useThemeStore } from '@/store/theme-store';

// Generate random snowflakes with varied properties
const generateSnowflakes = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    animationDuration: `${8 + Math.random() * 12}s`,
    animationDelay: `${-Math.random() * 10}s`, // Negative delay = starts mid-animation
    fontSize: `${0.6 + Math.random() * 0.8}rem`,
    opacity: 0.4 + Math.random() * 0.5,
  }));
};

const snowflakes = generateSnowflakes(25);

function Snowfall() {
  const { snowfallEnabled } = useThemeStore();

  if (!snowfallEnabled) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[9999]" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="snowflake-item"
          style={{
            left: flake.left,
            animationDuration: flake.animationDuration,
            animationDelay: flake.animationDelay,
            fontSize: flake.fontSize,
            opacity: flake.opacity,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
}

export { Snowfall };
