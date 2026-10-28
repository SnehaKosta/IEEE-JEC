import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Icon from './Icon.jsx';
import { Crest, IeeeLogo } from './Logo.jsx';
import { MOTTO, NAV } from '../config.js';

export default function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <header className="site-header">
        <div className="topbar">
          <div className="wrap topbar-in">
            <span>Advancing Technology for Humanity</span>
            <span className="toplinks">
              <a href="https://www.ieee.org" target="_blank" rel="noreferrer">IEEE.org ↗</a>
              <a href="https://ieeexplore.ieee.org" target="_blank" rel="noreferrer">IEEE Xplore ↗</a>
            </span>
          </div>
        </div>

        <div className="wrap brandrow">
          <Link to="/" className="brand" aria-label="IEEE Student Branch JEC home">
            <IeeeLogo />
            <Crest />
            <span className="brand-div" />
            <span className="brand-text">
              <strong>{`Jabalpur Engineering College`}</strong>
              <small>IEEE Student Branch · Jabalpur, India</small>
            </span>
          </Link>

          <div className="motto">
            <span className="sa" lang="sa">{MOTTO.sa}</span>
            <small>{MOTTO.roman}</small>
          </div>

          <button
            className="menu-btn"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="main-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <Icon name={open ? 'x' : 'menu'} size={22} />
          </button>
        </div>
      </header>

      <nav id="main-nav" className={`mainnav ${open ? 'open' : ''}`} aria-label="Main">
        <div className="wrap mainnav-in">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'} className="navlink">
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </>
  );
}
