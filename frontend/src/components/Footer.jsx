import { Link } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Crest, IeeeLogo } from './Logo.jsx';
import { SITE } from '../config.js';

const SOCIALS = [
  // ['linkedin', 'LinkedIn'],
  ['instagram', 'Instagram'],
  // ['youtube', 'YouTube'],
];

export default function Footer() {
  const hasSocial = SOCIALS.some(([k]) => SITE.social[k]);

  return (
    <footer className="site-footer">
      <div className="wrap footer-grid">
        <div className="footer-brand">
          <div className="footer-logos">
            <IeeeLogo height={30} />
            <Crest height={38} />
          </div>
          <p className="footer-name">
            IEEE Student Branch
            <br />
            Jabalpur Engineering College (JEC)
          </p>
          <p className="muted">Technology with purpose. Learning without limits.</p>
          <div className="socials">
            {SOCIALS.map(([key, label]) =>
              SITE.social[key] ? (
                <a key={key} href={SITE.social[key]} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon name={key} />
                </a>
              ) : (
                <span key={key} aria-label={`${label} (coming soon)`} title="Coming soon">
                  <Icon name={key} />
                </span>
              )
            )}
          </div>
          {!hasSocial && <p className="tiny muted">Official social links · To be updated</p>}
        </div>

        <div>
          <h4>Explore</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/news">News & Events</Link></li>
            <li><Link to="/committee">Committee</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4>Community</h4>
          <ul>
            <li><Link to="/mentors">IEEE Fellows / Faculty Mentors</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/chapters">Society Chapters</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4>IEEE Network</h4>
          <ul>
            <li><a href="https://www.ieee.org" target="_blank" rel="noreferrer">IEEE.org ↗</a></li>
            <li><a href="https://ieeexplore.ieee.org" target="_blank" rel="noreferrer">IEEE Xplore ↗</a></li>
            <li><a href="https://www.ieee.org/membership/join/index.html" target="_blank" rel="noreferrer">IEEE membership ↗</a></li>
            <li><a href={SITE.collegeUrl} target="_blank" rel="noreferrer">JEC official website ↗</a></li>
          </ul>
        </div>
      </div>

      <div className="wrap footer-bottom">
        <span>© {new Date().getFullYear()} IEEE Student Branch · Jabalpur Engineering College (JEC). All rights reserved.</span>
        <span className="footer-motto">Action is superior to inaction</span>
      </div>
    </footer>
  );
}
