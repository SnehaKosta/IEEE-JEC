import { useMemo, useState } from 'react';
import Icon from '../components/Icon.jsx';
import { NewsCard } from '../components/NewsCards.jsx';
import { EmptyState, PageHero } from '../components/Section.jsx';
import { useList, usePageTitle } from '../api.js';

const TABS = [
  ['all', 'All'],
  ['news', 'News'],
  ['event', 'Events'],
  ['announcement', 'Announcements'],
];

export default function NewsEvents() {
  usePageTitle('News & Events');
  const { items, loading, failed } = useList('/posts/');
  const [tab, setTab] = useState('all');
  const [q, setQ] = useState('');

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return items.filter(
      (p) =>
        (tab === 'all' || p.kind === tab) &&
        (!term || `${p.title} ${p.summary}`.toLowerCase().includes(term))
    );
  }, [items, tab, q]);

  return (
    <>
      <PageHero
        eyebrow="Updates & announcements"
        title="News & Events"
        text="Workshops, talks, competitions and announcements from the branch."
      />
      <section className="section">
        <div className="wrap">
          <div className="toolbar">
            <div className="tabs" role="tablist">
              {TABS.map(([key, label]) => (
                <button key={key} role="tab" aria-selected={tab === key} className={tab === key ? 'on' : ''} onClick={() => setTab(key)}>
                  {label}
                </button>
              ))}
            </div>
            <label className="search">
              <Icon name="search" size={16} />
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search news & events" aria-label="Search news and events" />
            </label>
          </div>

          {failed && <p className="notice">Could not reach the server. Please try again later.</p>}
          {loading ? (
            <p className="muted">Loading…</p>
          ) : shown.length ? (
            <div className="news-grid">
              {shown.map((p) => (
                <NewsCard key={p.id} post={p} />
              ))}
            </div>
          ) : (
            <EmptyState title="Nothing here yet" text="No posts match this view. Check back soon." />
          )}
        </div>
      </section>
    </>
  );
}
