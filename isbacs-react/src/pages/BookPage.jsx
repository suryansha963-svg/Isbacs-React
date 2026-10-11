import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBook, loadFront, store } from '../data/books.js';
import BookCover from '../components/BookCover.jsx';

const TABS = [
  ['contents', 'Contents'],
  ['preface', 'Preface'],
  ['ack', 'Acknowledgements'],
  ['about', 'About this volume'],
];

export default function BookPage() {
  const { slug } = useParams();
  const book = getBook(slug);
  const [tab, setTab] = useState('contents');
  const [q, setQ] = useState('');
  const [front, setFront] = useState(null);
  const last = store.get('isbacs:last:' + slug, null);

  useEffect(() => {
    setTab('contents');
    setQ('');
    setFront(null);
    loadFront(slug).then(setFront);
    if (book) document.title = `Volume ${book.roman} — Ecosecurity through Resource Governance`;
  }, [slug]); // eslint-disable-line react-hooks/exhaustive-deps

  const chapters = useMemo(() => {
    if (!book) return [];
    const needle = q.trim().toLowerCase();
    return book.chapters.filter((c) => !needle || (c.title + ' ' + c.authors).toLowerCase().includes(needle));
  }, [book, q]);

  if (!book) {
    return (
      <div className="page active">
        <section className="section"><div className="section-inner">
          <h2 className="section-title">Volume not found</h2>
          <Link to="/books" className="btn-gold">← Back to the library</Link>
        </div></section>
      </div>
    );
  }
  const other = getBook(slug === 'vol1' ? 'vol2' : 'vol1');
  const totalMin = book.chapters.reduce((a, c) => a + c.minutes, 0);

  return (
    <div className="page active">
      <header className={`book-hero bh-${book.slug}`}>
        <div className="book-hero-inner">
          <div className="crumbs"><Link to="/books">Library</Link> / Volume {book.roman}</div>
          <div className="book-hero-grid">
            <BookCover book={book} />
            <div>
              <div className="vol-tag light">Volume {book.roman} · {book.published}</div>
              <h1>{book.title}</h1>
              <p className="bh-editors">
                Edited by {book.editors.map((e) => e.name).join(', ')}
              </p>
              <ul className="vol-facts light">
                <li><b>{book.chapters.length}</b> chapters</li>
                <li><b>{book.pages}</b> pages</li>
                <li>≈ <b>{Math.round(totalMin / 60)}</b> hours of reading</li>
              </ul>
              <div className="vol-actions">
                <Link to={`/books/${slug}/chapter/1`} className="btn-gold">Start with Chapter 1</Link>
                {last && last > 1 && (
                  <Link to={`/books/${slug}/chapter/${last}`} className="btn-ghost light">Continue: Chapter {last} →</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className="section">
        <div className="section-inner">
          <div className="tabs" role="tablist">
            {TABS.map(([k, label]) => (
              <button key={k} role="tab" aria-selected={tab === k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>{label}</button>
            ))}
          </div>

          {tab === 'contents' && (
            <>
              <div className="finder">
                <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search the ${book.chapters.length} chapters by title or author…`} aria-label="Search chapters" />
              </div>
              <ul className="chapter-list">
                {chapters.map((c) => (
                  <li key={c.n}>
                    <Link to={`/books/${slug}/chapter/${c.n}`} className="chapter-row">
                      <span className={`ch-badge ${slug}`}><small>Chapter</small>{c.n}</span>
                      <span className="ch-main">
                        <span className="ch-title">{c.title}</span>
                        <span className="ch-authors">{c.authors}</span>
                      </span>
                      <span className="ch-meta">pp. {c.pages[0]}–{c.pages[1]}<br />{c.minutes} min read</span>
                    </Link>
                  </li>
                ))}
              </ul>
              {chapters.length === 0 && <p className="empty">No chapter matches “{q}”.</p>}
            </>
          )}

          {tab === 'preface' && (
            <article className="prose-card">
              <h2>Preface</h2>
              {front ? front.preface.map((p, i) => <p key={i}>{p}</p>) : <p>Loading…</p>}
              {front && (
                <div className="sign">
                  <strong>Editors</strong>
                  {front.preface_editors.map((e) => <div key={e}>{e}</div>)}
                </div>
              )}
            </article>
          )}

          {tab === 'ack' && (
            <article className="prose-card">
              <h2>Acknowledgements</h2>
              {front ? front.acknowledgements.map((p, i) => <p key={i}>{p}</p>) : <p>Loading…</p>}
              <div className="sign">
                <strong>Editors</strong>
                {book.editors.map((e) => <div key={e.name}>{e.name}</div>)}
              </div>
            </article>
          )}

          {tab === 'about' && (
            <article className="prose-card">
              <h2>About this volume</h2>
              <dl className="meta-list">
                <dt>Title</dt><dd>{book.title}</dd>
                <dt>Volume</dt><dd>{book.roman} — {book.published}</dd>
                <dt>Editors</dt>
                <dd>{book.editors.map((e) => <div key={e.name}>{e.name}, {e.dept}</div>)}</dd>
                <dt>ISBN</dt><dd>{book.isbn}</dd>
                <dt>MRP</dt><dd>{book.mrp}</dd>
                <dt>Publisher</dt>
                <dd>
                  {book.publisher}<br />
                  D-205, Varuna Garden, Central Jail Road, Sikraul, Varanasi, UP 221002<br />
                  Tel.: +91-8318483619 · <a href="mailto:isbacs2026@gmail.com">isbacs2026@gmail.com</a>
                </dd>
                <dt>Copyright</dt>
                <dd>© 2026 Authors and Editors. No part of this book may be reproduced or transmitted in any form by any means, electronic or mechanical, including photocopy, recording, or any information storage and retrieval system, without permission in writing from the copyright owners.</dd>
                <dt>Disclaimer</dt>
                <dd>The authors are solely responsible for the contents published in this book. The publishers don’t take any responsibility for the same in any manner. Errors, if any, are purely unintentional, and readers are requested to communicate such errors to the editors or publishers to avoid discrepancies in the future.</dd>
              </dl>
            </article>
          )}

          <div className="other-vol">
            <span>Also available:</span>
            <Link to={`/books/${other.slug}`}>Volume {other.roman} — {other.chapters.length} chapters →</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
