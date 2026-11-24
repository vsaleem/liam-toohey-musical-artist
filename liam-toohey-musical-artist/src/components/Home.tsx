// src/components/Home.tsx
import { ARTIST, IMAGES, dateBits, upcomingShows } from '../constants/properties';

export default function Home() {
  const next = upcomingShows()[0];
  const bits = next ? dateBits(next) : null;

  const tickerText = next
    ? `LIVE IN CONCERT • ${bits!.weekday.toUpperCase()} ${bits!.month.toUpperCase()} ${bits!.day} • ${next.venue.toUpperCase()} • ${next.city.toUpperCase()} • `
    : 'LIVE IN CONCERT • NEW DATES SOON • ';

  return (
    <>
      <section id="home" className="hero">
        <div className="hero__photo" style={{ backgroundImage: `url(${IMAGES.live})` }} />
        <div className="hero__beams" aria-hidden="true">
          <span className="beam beam--a" />
          <span className="beam beam--b" />
          <span className="beam beam--c" />
        </div>
        <div className="hero__shade" />
        <div className="grain" aria-hidden="true" />

        <div className="container hero__content">
          <p className="eyebrow">
            <span className="dot" /> {ARTIST.tagline}
          </p>
          <h1 className="hero__title">
            <span className="hero__line">Liam</span>
            <span className="hero__line hero__line--red">Toohey</span>
            <span className="neon hero__band">Band</span>
          </h1>
          <p className="hero__headline">{ARTIST.headline}</p>

          <div className="hero__ctas">
            <a href="#music" className="btn btn--primary">
              Hear the music
            </a>
            <a href="#shows" className="btn btn--ghost">
              Upcoming shows
            </a>
          </div>
        </div>

        <div className="hero__scroll" aria-hidden="true">
          <span>Step inside</span>
          <i />
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div className="ticker__track">
          {Array.from({ length: 6 }).map((_, i) => (
            <span key={i}>{tickerText}</span>
          ))}
        </div>
      </div>
    </>
  );
}
