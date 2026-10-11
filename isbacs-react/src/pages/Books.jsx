import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS, ALL_CHAPTERS } from '../data/books.js';
import BookCover from '../components/BookCover.jsx';

export default function Books() {
  const [q, setQ] = useState('');
  const [vol, setVol] = useState('all');

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return ALL_CHAPTERS.filter(
      (c) =>
        (vol === 'all' || c.book.slug === vol) &&
        (!needle || (c.title + ' ' + c.authors).toLowerCase().includes(needle))
    );
  }, [q, vol]);

  const totalChapters = ALL_CHAPTERS.length;
  const totalPages = BOOKS.reduce((a, b) => a + b.pages, 0);

  return (
    <div className="page active">
      <header className="books-hero">
        <div className="books-hero-inner">
          <div className="hero-badge">📚 ISBACS Library · September 2026</div>
          <h1>
            Ecosecurity through <em>Resource Governance</em>
          </h1>
          <p>
            A two-volume edited book bringing together scholars, practitioners and researchers on plant health, human health, materials,
            biodiversity and sustainable resource management. Choose a volume, then open any chapter and read it in full.
          </p>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">2</div><div className="label">Volumes</div></div>
            <div className="hero-stat"><div className="num">{totalChapters}</div><div className="label">Chapters</div></div>
            <div className="hero-stat"><div className="num">{totalPages}</div><div className="label">Pages</div></div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-inner">
          <div className="section-tag">The Volumes</div>
          <h2 className="section-title">Pick a volume</h2>
          <div className="volume-grid">
            {BOOKS.map((b) => (
              <article className="volume-card" key={b.slug}>
                <Link to={`/books/${b.slug}`} className="volume-cover-link" aria-label={`Open Volume ${b.roman}`}>
                  <BookCover book={b} />
                </Link>
                <div className="volume-body">
                  <div className="vol-tag">Volume {b.roman}</div>
                  <h3>{b.title}</h3>
                  <p className="vol-editors">
                    <strong>Editors:</strong> {b.editors.map((e) => e.name).join(' · ')}
                  </p>
                  <ul className="vol-facts">
                    <li><b>{b.chapters.length}</b> chapters</li>
                    <li><b>{b.pages}</b> pages</li>
                    <li>ISBN {b.isbn}</li>
                  </ul>
                  <div className="vol-actions">
                    <Link to={`/books/${b.slug}`} className="btn-gold">Browse chapters</Link>
                    <Link to={`/books/${b.slug}/chapter/1`} className="btn-ghost">Start reading →</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: '#fff' }}>
        <div className="section-inner">
          <div className="section-tag">All Chapters</div>
          <h2 className="section-title">Find a chapter</h2>
          <p className="section-desc">Search across both volumes by topic, crop, disease or author.</p>
          <div className="finder">
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search e.g. guava, diabetes, Ramesh Singh…"
              aria-label="Search chapters"
            />
            <div className="seg" role="tablist" aria-label="Volume filter">
              {[['all', 'Both volumes'], ...BOOKS.map((b) => [b.slug, `Vol. ${b.roman}`])].map(([k, label]) => (
                <button key={k} className={vol === k ? 'on' : ''} onClick={() => setVol(k)}>{label}</button>
              ))}
            </div>
          </div>
          <div className="result-count">{results.length} chapter{results.length === 1 ? '' : 's'}</div>
          <ul className="chapter-list">
            {results.map((c) => (
              <li key={c.book.slug + c.n}>
                <Link to={`/books/${c.book.slug}/chapter/${c.n}`} className="chapter-row">
                  <span className={`ch-badge ${c.book.slug}`}>
                    <small>Vol. {c.book.roman}</small>
                    {c.n}
                  </span>
                  <span className="ch-main">
                    <span className="ch-title">{c.title}</span>
                    <span className="ch-authors">{c.authors}</span>
                  </span>
                  <span className="ch-meta">pp. {c.pages[0]}–{c.pages[1]}<br />{c.minutes} min read</span>
                </Link>
              </li>
            ))}
          </ul>
          {results.length === 0 && <p className="empty">No chapter matches “{q}”.</p>}
        </div>
      </section>
    </div>
  );
}
