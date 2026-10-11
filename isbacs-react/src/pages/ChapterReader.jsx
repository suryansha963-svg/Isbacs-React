import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getBook, loadChapter, store } from '../data/books.js';

const SIZES = [15, 16.5, 18, 20, 22];
const THEMES = [['light', 'Light'], ['sepia', 'Sepia'], ['dark', 'Dark']];
const REF_RE = /^(references?|bibliography|literature cited)\b/i;

function levelOf(text) {
  if (/^\d+\.\d+/.test(text)) return 3;
  if (/^(\d+\.?|[IVX]+\.)\s/.test(text)) return 2;
  if (/^(abstract|keywords?|introduction|conclusions?|references?|bibliography|acknowledg|summary)/i.test(text)) return 2;
  if (text === text.toUpperCase() && /[A-Z]/.test(text)) return 2;
  return 3;
}
const cleanHeading = (t) => t.replace(/\s*:\s*$/, '');

function Lines({ lines }) {
  const isList = lines.every((l) => /^[•■▪]/.test(l));
  if (isList) {
    return (
      <ul className="r-list">
        {lines.map((l, i) => <li key={i}>{l.replace(/^[•■▪]\s*/, '')}</li>)}
      </ul>
    );
  }
  return (
    <div className="r-lines" role="group" aria-label="Table or data block">
      {lines.map((l, i) => <div key={i}>{l}</div>)}
    </div>
  );
}

function Body({ blocks }) {
  let inRefs = false;
  return blocks.map((b, i) => {
    if (b.t === 'h') {
      inRefs = REF_RE.test(b.x);
      const Tag = levelOf(b.x) === 2 ? 'h2' : 'h3';
      return <Tag key={i} id={`s-${i}`} className="r-h">{cleanHeading(b.x)}</Tag>;
    }
    if (b.t === 'l') return <Lines key={i} lines={b.x} />;
    if (b.t === 'c') return <p key={i} className="r-caption">{b.x}</p>;
    return <p key={i} className={inRefs ? 'r-ref' : undefined}>{b.x}</p>;
  });
}

export default function ChapterReader() {
  const { slug, n } = useParams();
  const num = Number(n);
  const book = getBook(slug);
  const meta = book?.chapters.find((c) => c.n === num);
  const [data, setData] = useState(null);
  const [failed, setFailed] = useState(false);
  const [size, setSize] = useState(() => store.get('isbacs:size', 2));
  const [theme, setTheme] = useState(() => store.get('isbacs:theme', 'light'));
  const [drawer, setDrawer] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(null);
  const [copied, setCopied] = useState(false);
  const articleRef = useRef(null);

  useEffect(() => store.set('isbacs:size', size), [size]);
  useEffect(() => store.set('isbacs:theme', theme), [theme]);

  // load the chapter body (separate chunk per chapter)
  useEffect(() => {
    let live = true;
    setData(null); setFailed(false); setActive(null); setProgress(0); setDrawer(false);
    window.scrollTo(0, 0);
    loadChapter(slug, num).then((d) => { if (live) (d ? setData(d) : setFailed(true)); }).catch(() => live && setFailed(true));
    if (meta) {
      document.title = `${meta.title} — Ecosecurity through Resource Governance, Vol. ${book.roman}`;
      store.set('isbacs:last:' + slug, num);
    }
    return () => { live = false; };
  }, [slug, num]); // eslint-disable-line react-hooks/exhaustive-deps

  const outline = useMemo(
    () => (data ? data.blocks.map((b, i) => (b.t === 'h' && !/:\s+\S/.test(b.x) ? { id: `s-${i}`, text: cleanHeading(b.x), lvl: levelOf(b.x) } : null)).filter(Boolean) : []),
    [data]
  );

  // reading progress + current section
  useEffect(() => {
    if (!data) return;
    const onScroll = () => {
      const el = articleRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      setProgress(Math.min(100, Math.max(0, (-r.top / Math.max(total, 1)) * 100)));
      let cur = null;
      for (const o of outline) {
        const h = document.getElementById(o.id);
        if (h && h.getBoundingClientRect().top < 140) cur = o.id; else if (h) break;
      }
      setActive(cur);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, [data, outline]);

  if (!book || !meta) {
    return (
      <div className="page active"><section className="section"><div className="section-inner">
        <h2 className="section-title">Chapter not found</h2>
        <Link to="/books" className="btn-gold">← Back to the library</Link>
      </div></section></div>
    );
  }

  const prev = book.chapters.find((c) => c.n === num - 1);
  const next = book.chapters.find((c) => c.n === num + 1);
  const cite = `${meta.authors} (2026). ${meta.title}. In: ${book.editors.map((e) => e.name).join(', ')} (Eds.), ${book.title}, Volume ${book.roman}, pp. ${meta.pages[0]}–${meta.pages[1]}. ${book.publisher}, Varanasi. ISBN ${book.isbn}.`;
  const copy = async () => {
    try { await navigator.clipboard.writeText(cite); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* ignore */ }
  };
  const jump = (id) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
    setDrawer(false);
  };

  return (
    <div className={`page active reader theme-${theme}`}>
      <div className="progress" aria-hidden="true"><div style={{ width: progress + '%' }} /></div>

      <div className="reader-bar">
        <div className="reader-bar-inner">
          <Link to={`/books/${slug}`} className="rb-back">← Vol. {book.roman} contents</Link>
          <button className="rb-btn rb-menu" onClick={() => setDrawer(true)}>☰ Chapters</button>
          <div className="rb-tools">
            <div className="rb-group" aria-label="Text size">
              <button onClick={() => setSize(Math.max(0, size - 1))} disabled={size === 0} aria-label="Smaller text">A−</button>
              <button onClick={() => setSize(Math.min(SIZES.length - 1, size + 1))} disabled={size === SIZES.length - 1} aria-label="Larger text">A+</button>
            </div>
            <div className="rb-group" aria-label="Theme">
              {THEMES.map(([k, label]) => (
                <button key={k} className={theme === k ? 'on' : ''} onClick={() => setTheme(k)}>{label}</button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="reader-layout">
        <aside className={'reader-side' + (drawer ? ' open' : '')}>
          <div className="side-head">
            <span>Volume {book.roman} · Chapters</span>
            <button className="side-close" onClick={() => setDrawer(false)} aria-label="Close">✕</button>
          </div>
          <ol className="side-chapters">
            {book.chapters.map((c) => (
              <li key={c.n} className={c.n === num ? 'cur' : ''}>
                <Link to={`/books/${slug}/chapter/${c.n}`}>
                  <b>{c.n}</b><span>{c.title}</span>
                </Link>
                {c.n === num && outline.length > 0 && (
                  <ul className="side-outline">
                    {outline.map((o) => (
                      <li key={o.id} className={(o.lvl === 3 ? 'sub ' : '') + (active === o.id ? 'on' : '')}>
                        <a href={`#${o.id}`} onClick={(e) => { e.preventDefault(); jump(o.id); }}>{o.text}</a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </aside>
        {drawer && <div className="side-scrim" onClick={() => setDrawer(false)} />}

        <main className="reader-main">
          <article ref={articleRef} className="chapter" style={{ '--fs': SIZES[size] + 'px' }}>
            <header className="chapter-head">
              <div className="ch-kicker">Volume {book.roman} · Chapter {num} · pp. {meta.pages[0]}–{meta.pages[1]} · {meta.minutes} min read</div>
              <h1>{meta.title}</h1>
              <p className="ch-by">{meta.authors}</p>
              {data?.affiliations?.length > 0 && (
                <ul className="ch-aff">{data.affiliations.map((a, i) => <li key={i}>{a}</li>)}</ul>
              )}
            </header>

            {!data && !failed && <p className="loading">Loading chapter…</p>}
            {failed && <p className="loading">This chapter could not be loaded. <button className="linklike" onClick={() => window.location.reload()}>Try again</button></p>}
            {data && <div className="chapter-body"><Body blocks={data.blocks} /></div>}

            {data && (
              <div className="cite">
                <div className="cite-h">Cite this chapter</div>
                <p>{cite}</p>
                <button className="rb-btn" onClick={copy}>{copied ? 'Copied ✓' : 'Copy citation'}</button>
              </div>
            )}
          </article>

          <div className="pager" role="navigation" aria-label="Chapter navigation">
            {prev ? (
              <Link to={`/books/${slug}/chapter/${prev.n}`} className="pg prev"><small>← Previous · Chapter {prev.n}</small><span>{prev.title}</span></Link>
            ) : <Link to={`/books/${slug}`} className="pg prev"><small>← Back</small><span>Volume {book.roman} contents</span></Link>}
            {next ? (
              <Link to={`/books/${slug}/chapter/${next.n}`} className="pg next"><small>Next · Chapter {next.n} →</small><span>{next.title}</span></Link>
            ) : <Link to="/books" className="pg next"><small>End of Volume {book.roman} →</small><span>Back to the library</span></Link>}
          </div>
        </main>
      </div>
    </div>
  );
}
