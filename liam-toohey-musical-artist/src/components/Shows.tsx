// src/components/Shows.tsx
import {
  IMAGES,
  countdownLabel,
  dateBits,
  mapsUrl,
  pastShows,
  upcomingShows,
  type Show,
} from '../constants/properties';

function Row({ show, past = false }: { show: Show; past?: boolean }) {
  const b = dateBits(show);
  return (
    <article className={`showrow ${past ? 'showrow--past' : ''}`}>
      <div className="showrow__date">
        <span>{b.month}</span>
        <strong>{b.day}</strong>
        <span>{b.weekday}</span>
      </div>
      <div className="showrow__info">
        {!past && <p className="showrow__count">{countdownLabel(show)}</p>}
        <h3>{show.venue}</h3>
        <p>
          {show.address} • {show.city}
        </p>
        <p className="muted">
          {show.time}
          {show.price ? ` • ${show.price}` : ''}
          {show.note ? ` • ${show.note}` : ''}
        </p>
      </div>
      {!past && (
        <div className="showrow__actions">
          {show.ticketUrl && (
            <a className="btn btn--primary btn--small" href={show.ticketUrl} target="_blank" rel="noreferrer">
              Tickets
            </a>
          )}
          <a className="btn btn--ghost btn--small" href={mapsUrl(show)} target="_blank" rel="noreferrer">
            Directions
          </a>
        </div>
      )}
    </article>
  );
}

export default function Shows() {
  const upcoming = upcomingShows();
  const past = pastShows();

  return (
    <section id="shows" className="section section--charcoal">
      <div className="container">
        <div className="sechead reveal">
          <p className="eyebrow">Come out</p>
          <h2 className="h-mega">
            Live <span className="red">shows</span>
          </h2>
          <span className="neon sechead__neon">doors open</span>
        </div>

        <div className="shows">
          <div className="shows__list">
            <h3 className="h-lg reveal">
              Upcoming <span className="red">dates</span>
            </h3>

            {upcoming.length ? (
              upcoming.map((s, i) => (
                <div key={s.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
                  <Row show={s} />
                </div>
              ))
            ) : (
              <p className="lede reveal">No dates posted right now. New shows land here first.</p>
            )}

            {past.length > 0 && (
              <>
                <h3 className="h-lg h-lg--spaced">Past shows</h3>
                {past.map((s) => (
                  <Row key={s.id} show={s} past />
                ))}
              </>
            )}

            <p className="shows__book reveal">
              Want Liam in your room? <a href="#book">Send a booking inquiry →</a>
            </p>
          </div>

          <div className="shows__poster reveal" style={{ transitionDelay: '150ms' }}>
            <img src={IMAGES.poster} alt="Liam Toohey Band live in concert poster" />
          </div>
        </div>
      </div>
    </section>
  );
}
