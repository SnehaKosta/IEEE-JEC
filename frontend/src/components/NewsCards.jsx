import Icon from './Icon.jsx';
import { fmtDate } from '../api.js';

const KIND_LABEL = { news: 'News', event: 'Event', announcement: 'Announcement' };

export function NewsCard({ post }) {
  const body = (
    <>
      <div
        className="news-img"
        style={post.image_url ? { backgroundImage: `url(${post.image_url})` } : undefined}
      >
        <span className={`tag tag-${post.kind}`}>{KIND_LABEL[post.kind] || 'News'}</span>
      </div>
      <div className="news-body">
        <span className="news-meta">
          <Icon name="calendar" size={14} /> {fmtDate(post.date)}
          {post.location ? ` · ${post.location}` : ''}
        </span>
        <h3>{post.title}</h3>
        {post.summary && <p>{post.summary}</p>}
        {post.link && (
          <span className="more">
            Read more <Icon name="arrow" size={14} />
          </span>
        )}
      </div>
    </>
  );
  return post.link ? (
    <a className="news-card" href={post.link} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <article className="news-card">{body}</article>
  );
}

// Always renders exactly three slots: real posts first, then "coming soon" placeholders.
export default function NewsTriple({ posts, loading }) {
  const slots = Array.from({ length: 3 }, (_, i) => posts[i] || null);
  return (
    <div className="news-grid">
      {slots.map((post, i) =>
        post ? (
          <NewsCard key={post.id} post={post} />
        ) : (
          <div key={`empty-${i}`} className={`news-card placeholder ${loading ? 'skeleton' : ''}`}>
            <div className="news-img" />
            <div className="news-body">
              <span className="news-meta">{loading ? 'Loading…' : 'Coming soon'}</span>
              <h3>{loading ? ' ' : 'News slot available'}</h3>
              {!loading && <p>New announcements will appear here as soon as they are published.</p>}
            </div>
          </div>
        )
      )}
    </div>
  );
}
