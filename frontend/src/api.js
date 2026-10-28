import { useEffect, useState } from 'react';

const BASE = import.meta.env.VITE_API_URL || '/api';

export async function api(path, options) {
  const res = await fetch(`${BASE}${path}`, options);
  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error('Request failed');
    err.body = body;
    throw err;
  }
  return body;
}

// Loads a list from the API. Falls back to `fallback` if the server is unreachable.
export function useList(path, fallback = []) {
  const [state, setState] = useState({ items: fallback, loading: true, failed: false });

  useEffect(() => {
    let alive = true;
    api(path)
      .then((d) => alive && setState({ items: d.results || [], loading: false, failed: false }))
      .catch(() => alive && setState({ items: fallback, loading: false, failed: true }));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  return state;
}

export function usePageTitle(title) {
  useEffect(() => {
    document.title = title
      ? `${title} · IEEE SB JEC`
      : 'IEEE Student Branch · Jabalpur Engineering College';
  }, [title]);
}

export function fmtDate(iso) {
  if (!iso) return '';
  return new Date(iso + 'T00:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function dayOfYear(d = new Date()) {
  const start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d - start) / 86400000);
}
