// src/components/About.tsx
// Contains both the About section and the Booking section (#book).
import { useState, type FormEvent } from 'react';
import { BIO, BOOKING_EMAIL, IMAGES } from '../constants/properties';

export default function About() {
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? '');

    const subject = `Booking inquiry: ${get('event') || 'Show'} (${get('date') || 'date TBD'})`;
    const body = [
      `Name: ${get('name')}`,
      `Email: ${get('email')}`,
      `Venue / event: ${get('event')}`,
      `Date: ${get('date')}`,
      '',
      get('message'),
    ].join('\n');

    window.location.href = `mailto:${BOOKING_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <>
      <section id="about" className="section">
        <div className="container">
          <div className="sechead reveal">
            <p className="eyebrow">Backstage</p>
            <h2 className="h-mega">
              Meet <span className="red">Liam</span>
            </h2>
            <span className="neon sechead__neon">hello, stranger</span>
          </div>

          <div className="about">
            <div className="about__photo reveal">
              <img src={IMAGES.live} alt="Liam Toohey playing guitar and harmonica on stage" />
            </div>

            <div className="about__copy">
              {BIO.map((p, i) => (
                <p
                  key={i}
                  className={`reveal ${i === 0 ? 'lede lede--big' : 'lede'}`}
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {p}
                </p>
              ))}
              <div className="about__cta reveal" style={{ transitionDelay: '300ms' }}>
                <a href="#shows" className="btn btn--primary">
                  See him live
                </a>
                <a href="#book" className="btn btn--ghost">
                  Book a show
                </a>
              </div>
            </div>
          </div>

          <div className="gallery" style={{ marginTop: '4rem' }}>
            <div className="reveal">
              <img src={IMAGES.tee} alt="Black Liam Toohey Band t-shirt with red script logo" />
            </div>
            <div className="reveal" style={{ transitionDelay: '120ms' }}>
              <img src={IMAGES.logo} alt="Liam Toohey Band logo with roses" />
            </div>
          </div>
        </div>
      </section>

      <section id="book" className="section section--charcoal">
        <div className="container">
          <div className="sechead reveal">
            <p className="eyebrow">Bookings</p>
            <h2 className="h-mega">
              Book the <span className="red">band</span>
            </h2>
            <span className="neon sechead__neon">your stage, our noise</span>
          </div>

          <div className="book">
            <div className="book__intro reveal">
              <p className="lede lede--big">
                Bars, listening rooms, private nights, festivals. Tell us about your room and we’ll get back to you.
              </p>
              <p className="muted" style={{ marginTop: '1.2rem' }}>
                Prefer email? <a href={`mailto:${BOOKING_EMAIL}`}>{BOOKING_EMAIL}</a>
              </p>
            </div>

            <form className="form reveal" style={{ transitionDelay: '120ms' }} onSubmit={onSubmit}>
              <label>
                Your name
                <input name="name" required autoComplete="name" />
              </label>
              <label>
                Email
                <input name="email" type="email" required autoComplete="email" />
              </label>
              <div className="form__row">
                <label>
                  Venue or event
                  <input name="event" required />
                </label>
                <label>
                  Date
                  <input name="date" type="date" />
                </label>
              </div>
              <label>
                Tell us about the night
                <textarea name="message" rows={5} required />
              </label>
              <button className="btn btn--primary" type="submit">
                Send inquiry
              </button>
              {sent && (
                <p className="form__note" role="status">
                  Your email app should be open. If not, write us at {BOOKING_EMAIL}.
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
