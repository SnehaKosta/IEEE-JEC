import Icon from './Icon.jsx';

export function Eyebrow({ children }) {
  return <span className="eyebrow">{children}</span>;
}

export function SectionHead({ eyebrow, title, text, id }) {
  return (
    <div className="section-head" id={id}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p className="lead">{text}</p>}
    </div>
  );
}

export function PageHero({ eyebrow, title, text }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        {text && <p className="lead">{text}</p>}
      </div>
    </section>
  );
}

export function ExternalButton({ href, children }) {
  return (
    <a className="btn btn-outline" href={href} target="_blank" rel="noreferrer">
      {children} <Icon name="arrow" size={15} />
    </a>
  );
}

export function EmptyState({ icon = 'calendar', title, text }) {
  return (
    <div className="empty">
      <Icon name={icon} size={26} />
      <strong>{title}</strong>
      <span>{text}</span>
    </div>
  );
}
