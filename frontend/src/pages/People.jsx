import { useState } from 'react';
import Icon from '../components/Icon.jsx';
import { EmptyState, PageHero } from '../components/Section.jsx';
import { useList, usePageTitle } from '../api.js';

function initials(name) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function PersonCard({ p }) {
  const [broken, setBroken] = useState(false);
  return (
    <article className="person-card">
      {p.photo_url && !broken ? (
        <img src={p.photo_url} alt={p.name} onError={() => setBroken(true)} />
      ) : (
        <div className="avatar" aria-hidden="true">{initials(p.name)}</div>
      )}
      <h3>{p.name}</h3>
      <strong className="role">{p.role}</strong>
      {(p.department || p.tenure) && (
        <span className="muted tiny">{[p.department, p.tenure].filter(Boolean).join(' · ')}</span>
      )}
      {p.bio && <p>{p.bio}</p>}
      {p.linkedin && (
        <a className="btn btn-outline btn-sm" href={p.linkedin} target="_blank" rel="noreferrer">
          <Icon name="linkedin" size={14} /> LinkedIn
        </a>
      )}
    </article>
  );
}

export default function People({ category, title, eyebrow, intro, emptyText }) {
  usePageTitle(title);
  const { items, loading } = useList(`/people/?category=${category}`);

  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} text={intro} />
      <section className="section">
        <div className="wrap">
          {loading ? (
            <p className="muted">Loading…</p>
          ) : items.length ? (
            <div className="person-grid">
              {items.map((p) => (
                <PersonCard key={p.id} p={p} />
              ))}
            </div>
          ) : (
            <EmptyState icon="users" title="Profiles pending" text={emptyText} />
          )}
        </div>
      </section>
    </>
  );
}
