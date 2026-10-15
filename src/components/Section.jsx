// A page section with a small mono kicker above a calm heading.
export default function Section({ id, kicker, title, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`} aria-labelledby={`${id}-title`}>
      <div className="wrap">
        <p className="kicker reveal">{kicker}</p>
        <h2 id={`${id}-title`} className="h2 reveal">
          {title}
        </h2>
        {children}
      </div>
    </section>
  );
}
