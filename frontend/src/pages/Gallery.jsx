import { useEffect, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { EmptyState, PageHero } from '../components/Section.jsx';
import { useList, usePageTitle } from '../api.js';

export default function Gallery() {
  usePageTitle('Gallery');
  const { items, loading } = useList('/gallery/');
  const [active, setActive] = useState(null); // index into items

  useEffect(() => {
    if (active === null) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') setActive((i) => (i + 1) % items.length);
      if (e.key === 'ArrowLeft') setActive((i) => (i - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [active, items.length]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <PageHero eyebrow="Moments from the branch" title="Gallery" text="Workshops, talks, projects and the people who make them happen." />
      <section className="section">
        <div className="wrap">
          {loading ? (
            <p className="muted">Loading…</p>
          ) : items.length ? (
            <div className="gallery-grid">
              {items.map((g, i) => (
                <button key={g.id} className="gallery-item" onClick={() => setActive(i)} aria-label={`Open ${g.caption}`}>
                  <img src={g.image_url} alt={g.caption} loading="lazy" />
                  <span>{g.caption}</span>
                </button>
              ))}
            </div>
          ) : (
            <EmptyState icon="calendar" title="Photos coming soon" text="Event photos will appear here once they are added." />
          )}
        </div>
      </section>

      {current && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={current.caption} onClick={() => setActive(null)}>
          <button className="lb-close" aria-label="Close" onClick={() => setActive(null)}><Icon name="x" size={22} /></button>
          {items.length > 1 && (
            <button className="lb-nav prev" aria-label="Previous" onClick={(e) => { e.stopPropagation(); setActive((active - 1 + items.length) % items.length); }}>
              <Icon name="left" size={22} />
            </button>
          )}
          <figure onClick={(e) => e.stopPropagation()}>
            <img src={current.image_url} alt={current.caption} />
            <figcaption>{current.caption}</figcaption>
          </figure>
          {items.length > 1 && (
            <button className="lb-nav next" aria-label="Next" onClick={(e) => { e.stopPropagation(); setActive((active + 1) % items.length); }}>
              <Icon name="right" size={22} />
            </button>
          )}
        </div>
      )}
    </>
  );
}
