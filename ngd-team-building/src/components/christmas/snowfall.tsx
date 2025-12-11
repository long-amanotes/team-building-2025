function Snowfall() {
  const snowflakes = Array.from({ length: 15 }, (_, i) => i);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50" aria-hidden="true">
      {snowflakes.map((i) => (
        <span key={i} className="snowflake">
          ❄
        </span>
      ))}
    </div>
  );
}

export { Snowfall };
