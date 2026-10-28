import { useState } from 'react';
import Icon from './Icon.jsx';
import { api } from '../api.js';
import { INTERESTS, SITE } from '../config.js';

const EMPTY = { name: '', email: '', interest: INTERESTS[0], message: '', website: '' };

export default function ContactSection({ id = 'contact' }) {
  const [form, setForm] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  function validate() {
    const e = {};
    if (form.name.trim().length < 2) e.name = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) e.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) e.message = 'Please write a few words (at least 10 characters).';
    return e;
  }

  async function submit(ev) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus('sending');
    try {
      await api('/enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setStatus('sent');
      setForm(EMPTY);
    } catch (err) {
      setErrors(err.body?.errors || {});
      setStatus('error');
    }
  }

  return (
    <section className="contact" id={id}>
      <div className="wrap contact-grid">
        <div className="contact-copy">
          <span className="eyebrow light">Contact us</span>
          <h2>Your next idea starts with a conversation.</h2>
          <p>Curious about IEEE, a collaboration or getting involved? There's a place for your curiosity here.</p>
          <ul className="contact-list">
            <li>
              <Icon name="pin" />
              <span>
                <strong>Jabalpur Engineering College (JEC)</strong>
                <br />
                <small>{SITE.location}</small>
              </span>
            </li>
            <li>
              <Icon name="mail" />
              {SITE.email ? <a href={`mailto:${SITE.email}`}>{SITE.email}</a> : <span>Branch email · Update pending</span>}
            </li>
            <li>
              <Icon name="globe" />
              <a href={SITE.collegeUrl} target="_blank" rel="noreferrer">
                {SITE.collegeUrl.replace('https://', '')} ↗
              </a>
            </li>
          </ul>
        </div>

        <form className="form-card" onSubmit={submit} noValidate>
          <h3>Say hello.</h3>
          <p className="tiny muted">We read every message and reply as soon as we can.</p>

          {status === 'sent' ? (
            <div className="form-success" role="status">
              <Icon name="check" size={28} />
              <strong>Thanks, your message has been sent.</strong>
              <span>The branch team will get back to you soon.</span>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => setStatus('idle')}>
                Send another
              </button>
            </div>
          ) : (
            <>
              <label>
                Full name
                <input value={form.name} onChange={set('name')} placeholder="Your full name" autoComplete="name" aria-invalid={!!errors.name} />
                {errors.name && <em className="err">{errors.name}</em>}
              </label>

              <label>
                Email address
                <input type="email" value={form.email} onChange={set('email')} placeholder="you@example.com" autoComplete="email" aria-invalid={!!errors.email} />
                {errors.email && <em className="err">{errors.email}</em>}
              </label>

              <label>
                I'm interested in
                <select value={form.interest} onChange={set('interest')}>
                  {INTERESTS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </label>

              <label>
                Your message
                <textarea rows="4" value={form.message} onChange={set('message')} placeholder="Tell us what you'd like to explore…" aria-invalid={!!errors.message} />
                {errors.message && <em className="err">{errors.message}</em>}
              </label>

              {/* Honeypot: hidden from people, tempting for bots */}
              <input className="hp" tabIndex="-1" autoComplete="off" value={form.website} onChange={set('website')} aria-hidden="true" />

              {status === 'error' && !Object.keys(errors).length && (
                <p className="err" role="alert">Something went wrong. Please try again in a moment.</p>
              )}

              <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending…' : 'Send enquiry'} <Icon name="arrow" size={15} />
              </button>
              <p className="tiny muted">Your details are only used to reply to your enquiry.</p>
            </>
          )}
        </form>
      </div>
    </section>
  );
}
