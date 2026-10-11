import generated from './books.generated.json';

export const BOOKS = generated;

export const getBook = (slug) => BOOKS.find((b) => b.slug === slug);
export const bookTitle = (b) => `${b.title}, Volume ${b.roman}`;

// every chapter of every volume, flattened (used by the library search)
export const ALL_CHAPTERS = BOOKS.flatMap((b) => b.chapters.map((c) => ({ ...c, book: b })));

// chapter bodies are separate JSON files, loaded only when a chapter is opened
const chapterLoaders = import.meta.glob('./*/ch*.json');
const frontLoaders = import.meta.glob('./*/front.json');

export async function loadChapter(slug, n) {
  const load = chapterLoaders[`./${slug}/ch${n}.json`];
  if (!load) return null;
  return (await load()).default;
}

export async function loadFront(slug) {
  const load = frontLoaders[`./${slug}/front.json`];
  return load ? (await load()).default : null;
}

export const authorsOf = (c) => c.authors;

// ---- tiny localStorage helpers (can throw in private mode, so always wrapped) ----
export const store = {
  get(key, fallback) {
    try {
      const v = window.localStorage.getItem(key);
      return v == null ? fallback : JSON.parse(v);
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  },
};
