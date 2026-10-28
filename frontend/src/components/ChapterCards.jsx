import { useState } from 'react';
import Icon from './Icon.jsx';

function Monogram({ code }) {
  return <span className="monogram" aria-hidden="true">{code.slice(0, 3)}</span>;
}

export function ChapterCard({ chapter }) {
  const [logoFailed, setLogoFailed] = useState(false);
  return (
    <article className="chapter-card">
      <div className="chapter-top">
        {chapter.icon && !logoFailed ? (
          <img src={chapter.icon} alt="" height="44" onError={() => setLogoFailed(true)} />
        ) : (
          <Monogram code={chapter.code} />
        )}
        <span className="chapter-code">{chapter.code}</span>
      </div>
      <h3>{chapter.name}</h3>
      <p>{chapter.description}</p>
      {chapter.tags?.length > 0 && <p className="chapter-tags">{chapter.tags.join(' · ')}</p>}
      <a className="btn btn-outline btn-sm" href={chapter.url} target="_blank" rel="noreferrer">
        View More <Icon name="arrow" size={14} />
      </a>
    </article>
  );
}

export function MoreWays({ chapters }) {
  const [openId, setOpenId] = useState(null);
  if (!chapters.length) return null;
  const current = chapters.find((c) => c.id === openId);

  return (
    <div className="more-ways">
      <div className="more-head">
        <Icon name="circlePlus" size={22} />
        <div>
          <strong>More ways to explore</strong>
          <span>Select a society to learn more · Local groups will be added once confirmed.</span>
        </div>
      </div>
      <div className="chips">
        {chapters.map((c) => (
          <button
            key={c.id}
            className={`chip ${openId === c.id ? 'on' : ''}`}
            aria-expanded={openId === c.id}
            onClick={() => setOpenId(openId === c.id ? null : c.id)}
          >
            {c.name} <Icon name={openId === c.id ? 'minus' : 'plus'} size={14} />
          </button>
        ))}
      </div>
      {current && (
        <div className="chip-detail">
          <p>{current.description}</p>
          <a className="btn btn-outline btn-sm" href={current.url} target="_blank" rel="noreferrer">
            Visit {current.code} <Icon name="arrow" size={14} />
          </a>
        </div>
      )}
    </div>
  );
}

export default function ChapterCards({ chapters }) {
  const featured = chapters.filter((c) => c.featured);
  const more = chapters.filter((c) => !c.featured);
  return (
    <>
      <div className="chapter-grid">
        {featured.map((c) => (
          <ChapterCard key={c.id} chapter={c} />
        ))}
      </div>
      <MoreWays chapters={more} />
    </>
  );
}
