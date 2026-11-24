// src/components/Music.tsx
import { LINKS, TRACKS } from '../constants/properties';

export default function Music() {
  return (
    <section id="music" className="section">
      <div className="container">
        <div className="sechead reveal">
          <p className="eyebrow">Hear it first</p>
          <h2 className="h-mega">
            The <span className="red">music</span>
          </h2>
          <span className="neon sechead__neon">press play</span>
        </div>

        <div className="platforms reveal">
          <a className="btn btn--primary" href={LINKS.spotify}>
            Spotify
          </a>
          <a className="btn btn--ghost" href={LINKS.apple}>
            Apple Music
          </a>
          <a className="btn btn--ghost" href={LINKS.youtube}>
            YouTube
          </a>
        </div>

        {/* TODO: drop a Spotify / Bandcamp / YouTube iframe here */}
        <div className="embed reveal" role="img" aria-label="Player placeholder">
          <div className="embed__eq" aria-hidden="true">
            {Array.from({ length: 24 }).map((_, i) => (
              <i key={i} style={{ animationDelay: `${(i % 8) * 0.12}s` }} />
            ))}
          </div>
          <p>Player embed goes here</p>
        </div>

        <h3 className="h-lg reveal">
          Setlist <span className="red">essentials</span>
        </h3>

        <ol className="tracks">
          {TRACKS.map((t, i) => (
            <li key={t.title} className="reveal" style={{ transitionDelay: `${i * 70}ms` }}>
              <a href={t.url} className="track">
                <span className="track__num">{String(i + 1).padStart(2, '0')}</span>
                <span className="track__title">{t.title}</span>
                <span className="track__note">{t.note}</span>
                <span className="track__play" aria-hidden="true">
                  ▶
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
