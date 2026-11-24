// src/App.tsx
import { useEffect, useState } from 'react';
import './Redroom.css';
import Home from './components/Home';
import Music from './components/Music';
import Shows from './components/Shows';
import About from './components/About';
import { ARTIST, IMAGES, LINKS } from './constants/properties';

const NAV = [
  { id: 'music', label: 'Music' },
  { id: 'shows', label: 'Shows' },
  { id: 'about', label: 'About' },
  { id: 'book', label: 'Book' },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  // solid nav after scrolling
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // highlight the section currently in view
  useEffect(() => {
    const ids = ['home', ...NAV.map((n) => n.id)];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  // fade-up reveal for every .reveal element
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <div className="app">
      <header className={`nav ${scrolled || open ? 'nav--solid' : ''}`}>
        <div className="container nav__inner">
          <a href="#home" className="nav__brand" aria-label="Liam Toohey Band home">
            <img src={IMAGES.logo} alt="" className="nav__logo" />
            <span>{ARTIST.name}</span>
          </a>

          <nav className={`nav__links ${open ? 'is-open' : ''}`} aria-label="Primary">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={active === n.id ? 'active' : ''}
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            ))}
            <a href="#shows" className="btn btn--small nav__cta" onClick={() => setOpen(false)}>
              Get in the room
            </a>
          </nav>

          <button
            className="nav__toggle"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <Home />
        <Music />
        <Shows />
        <About />
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <img src={IMAGES.logo} alt={ARTIST.band} className="footer__logo" />
          <div className="footer__cols">
            <div>
              <h4>Explore</h4>
              {NAV.map((n) => (
                <a key={n.id} href={`#${n.id}`}>
                  {n.id === 'book' ? 'Book Liam' : n.label}
                </a>
              ))}
            </div>
            <div>
              <h4>Listen &amp; follow</h4>
              <a href={LINKS.spotify}>Spotify</a>
              <a href={LINKS.apple}>Apple Music</a>
              <a href={LINKS.youtube}>YouTube</a>
              <a href={LINKS.facebook} target="_blank" rel="noreferrer">
                Facebook
              </a>
            </div>
          </div>
        </div>
        <p className="footer__legal">
          © {new Date().getFullYear()} {ARTIST.band}. See you down front.
        </p>
      </footer>
    </div>
  );
}
