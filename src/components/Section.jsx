// Section header styled like a console log line: "[03] experience".
export default function Section({ id, index, title, kicker, children }) {
  return (
    <section id={id} className="section reveal" aria-labelledby={`${id}-title`}>
      <header className="section-head">
        <p className="section-tag" aria-hidden="true">
          <span className="section-index">[{index}]</span> {id}
          {kicker && <span className="section-kicker"> · {kicker}</span>}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
      </header>
      {children}
    </section>
  );
}
