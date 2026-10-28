import Icon from '../components/Icon.jsx';
import { EmptyState, PageHero } from '../components/Section.jsx';
import { fmtDate, useList, usePageTitle } from '../api.js';

export default function Achievements() {
  usePageTitle('Achievements');
  const { items, loading } = useList('/achievements/');

  return (
    <>
      <PageHero eyebrow="Ideas, effort and impact" title="Achievements" text="A record of what our members have built, won and shared." />
      <section className="section">
        <div className="wrap narrow">
          {loading ? (
            <p className="muted">Loading…</p>
          ) : items.length ? (
            <ol className="timeline">
              {items.map((a) => (
                <li key={a.id}>
                  <span className="tl-dot"><Icon name="award" size={14} /></span>
                  <div className="tl-card">
                    <span className="news-meta">
                      {fmtDate(a.date)}
                      {a.category ? ` · ${a.category}` : ''}
                    </span>
                    <h3>{a.title}</h3>
                    {a.description && <p>{a.description}</p>}
                    {a.link && (
                      <a className="more" href={a.link} target="_blank" rel="noreferrer">
                        Learn more <Icon name="arrow" size={14} />
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ol>
          ) : (
            <EmptyState icon="award" title="Verified records pending" text="Achievements will be listed here once they are verified." />
          )}
        </div>
      </section>
    </>
  );
}
