import { useState } from 'react';

// Drop your real logo files into frontend/public/images/ (ieee-logo.png, jec-crest.png).
// Until then a simple text mark is shown.
export function IeeeLogo({ height = 30 }) {
  const [failed, setFailed] = useState(false);
  if (failed) return <span className="logo-fallback">IEEE</span>;
  return (
    <img
      src="/images/ieee-logo.png"
      alt="IEEE"
      height={height}
      className="logo-img"
      onError={() => setFailed(true)}
    />
  );
}

export function Crest({ height = 38 }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <svg className="crest-fallback" width={height * 0.86} height={height} viewBox="0 0 34 40" aria-label="JEC crest">
        <path d="M17 1l15 5v14c0 10-7 16-15 19C9 36 2 30 2 20V6z" fill="#8c1c13" stroke="#6a120c" strokeWidth="1.5" />
        <path d="M10 22l7-9 7 9z" fill="none" stroke="#f0d9a8" strokeWidth="1.5" />
      </svg>
    );
  return (
    <img
      src="/images/jec-crest.png"
      alt="Jabalpur Engineering College crest"
      height={height}
      className="logo-img"
      onError={() => setFailed(true)}
    />
  );
}
