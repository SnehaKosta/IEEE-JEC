import { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { QUOTES } from '../config.js';
import { dayOfYear } from '../api.js';

const FALLBACK_BG = 'linear-gradient(120deg, #0b4a73 0%, #03283f 100%)';

export function QuoteCard() {
  const q = QUOTES[dayOfYear() % QUOTES.length];
  return (
    <aside className="quote-card" aria-label="Quote of the day">
      <div className="quote-top">
        <span className="eyebrow-sm">Quote of the day</span>
        <Icon name="quote" size={18} />
      </div>
      <p className="quote-sa" lang="sa">{q.sa}</p>
      <p className="quote-roman">{q.roman}</p>
      <p className="quote-en">{q.en}</p>
    </aside>
  );
}

export default function HeroSlider({ slides }) {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = slides.length;

  useEffect(() => {
    if (paused) return undefined;
    const t = setInterval(() => setI((x) => (x + 1) % n), 6000);
    return () => clearInterval(t);
  }, [paused, n]);

  const go = (d) => setI((x) => (x + d + n) % n);

  return (
    <section
      id="gallery-slider"
      className="slider"
      aria-roledescription="carousel"
      aria-label="Campus highlights"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {slides.map((s, idx) => (
        <div
          key={s.title}
          className={`slide ${idx === i ? 'active' : ''}`}
          style={{ backgroundImage: `url(${s.image}), ${FALLBACK_BG}` }}
          aria-hidden={idx !== i}
        />
      ))}
      <div className="slider-shade" />

      <div className="wrap slider-in">
        <div className="slide-caption">
          <span className="eyebrow-sm light">{slides[i].label}</span>
          <h2>{slides[i].title}</h2>
          <div className="dots" role="tablist" aria-label="Choose slide">
            {slides.map((s, idx) => (
              <button
                key={s.title}
                role="tab"
                aria-selected={idx === i}
                className={idx === i ? 'on' : ''}
                onClick={() => setI(idx)}
              >
                <span>{String(idx + 1).padStart(2, '0')}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="slider-right">
          <QuoteCard />
          <div className="arrows">
            <button onClick={() => go(-1)} aria-label="Previous slide"><Icon name="left" /></button>
            <button onClick={() => go(1)} aria-label="Next slide"><Icon name="right" /></button>
          </div>
        </div>
      </div>
    </section>
  );
}
