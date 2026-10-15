// Endless strip of tools. The list is rendered twice so the CSS loop is
// seamless; the copy is hidden from screen readers. Stops for reduced motion.
export default function Marquee({ items, label }) {
  return (
    <div className="marquee" role="region" aria-label={label}>
      <div className="marquee-track">
        <ul className="marquee-list">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <ul className="marquee-list" aria-hidden="true">
          {items.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
