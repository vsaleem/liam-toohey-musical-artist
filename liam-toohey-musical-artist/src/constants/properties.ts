// src/constants/properties.ts
// Single place to edit content. Anything marked TODO is a placeholder.

export type Show = {
  id: string;
  date: string; // YYYY-MM-DD (local)
  time: string;
  venue: string;
  address: string;
  city: string;
  price?: string;
  ticketUrl?: string;
  note?: string;
};

export type Track = {
  title: string;
  note?: string;
  url: string;
};

export const ARTIST = {
  name: 'Liam Toohey',
  band: 'Liam Toohey Band',
  headline: 'Turn the lights down. Turn the room up.',
  tagline: 'Live in concert',
};

// TODO: replace with real addresses / handles
export const BOOKING_EMAIL = 'booking@example.com';

export const LINKS = {
  facebook: 'https://www.facebook.com/liam.toohey.252737',
  spotify: '#', // TODO
  apple: '#', // TODO
  youtube: '#', // TODO
  instagram: '#', // TODO
};

export const SHOWS: Show[] = [
  {
    id: 'locals-2026-11-27',
    date: '2026-11-27',
    time: '7:00 PM',
    venue: 'Locals Bars & Stage',
    address: '1433 Walnut St. #A',
    city: 'Des Moines, IA 50309',
    price: '$10 cover',
    note: 'Live in concert',
  },
  // Add more shows here. Past shows move to "Past shows" automatically.
];

// TODO: replace with real releases and links
export const TRACKS: Track[] = [
  { title: 'Track Title One', note: 'Single', url: '#' },
  { title: 'Track Title Two', note: 'Live favorite', url: '#' },
  { title: 'Track Title Three', note: 'Studio', url: '#' },
  { title: 'Track Title Four', note: 'Studio', url: '#' },
];

// TODO: replace with Liam's own words
export const BIO = [
  'Liam Toohey Band is a live act built for small rooms and big feelings: acoustic guitar, harmonica, and a voice that fills the place up.',
  'Every night is a little different. Come early, find a spot near the stage, and stay for the last song.',
  'Replace this copy with Liam’s story: where he started, who he plays with, and what the songs are about.',
];

export const IMAGES = {
  live: '/images/song-cover.jpg',
  poster: '/images/poster.jpg',
  tee: '/images/tee.jpg',
  logo: '/images/logo.jpg',
};

/* ---------- helpers ---------- */

function parts(date: string): [number, number, number] {
  const [y, m, d] = date.split('-').map(Number);
  return [y, m, d];
}

export function endOfShowDay(s: Show): Date {
  const [y, m, d] = parts(s.date);
  return new Date(y, m - 1, d, 23, 59, 59);
}

export function upcomingShows(now = new Date()): Show[] {
  return SHOWS.filter((s) => endOfShowDay(s) >= now).sort(
    (a, b) => endOfShowDay(a).getTime() - endOfShowDay(b).getTime(),
  );
}

export function pastShows(now = new Date()): Show[] {
  return SHOWS.filter((s) => endOfShowDay(s) < now).sort(
    (a, b) => endOfShowDay(b).getTime() - endOfShowDay(a).getTime(),
  );
}

export function daysUntil(s: Show, now = new Date()): number {
  const [y, m, d] = parts(s.date);
  const start = new Date(y, m - 1, d);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return Math.round((start.getTime() - today.getTime()) / 86_400_000);
}

export function dateBits(s: Show) {
  const [y, m, d] = parts(s.date);
  const dt = new Date(y, m - 1, d);
  return {
    weekday: dt.toLocaleDateString('en-US', { weekday: 'short' }),
    month: dt.toLocaleDateString('en-US', { month: 'short' }),
    day: String(d),
    year: String(y),
    long: dt.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' }),
  };
}

export function mapsUrl(s: Show): string {
  const q = encodeURIComponent(`${s.venue}, ${s.address}, ${s.city}`);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function countdownLabel(s: Show): string {
  const n = daysUntil(s);
  if (n <= 0) return 'Tonight';
  if (n === 1) return 'Tomorrow';
  return `${n} days out`;
}
