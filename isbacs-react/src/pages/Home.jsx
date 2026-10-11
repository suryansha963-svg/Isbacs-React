import { Link } from 'react-router-dom';
import { BOOKS } from '../data/books.js';
import BookCover from '../components/BookCover.jsx';

const CARDS = [
  ['🔬', 'Research & Education', 'Promoting bio-agro chemical research and publishing scientific journals', 'var(--green-pale)', 'var(--green)'],
  ['🌾', 'Farmer Empowerment', 'Training farmers in safe eco-friendly agricultural practices', '#fff8e1', 'var(--gold)'],
  ['💻', 'Digital Outreach', 'E-learning and digital tools for sharing knowledge widely', '#f0f0ff', '#6c63ff'],
  ['🤝', 'Collaboration', 'National & international partnerships for scientific advancement', '#fff0f5', '#e91e8c'],
];

export default function Home() {
  return (
    <div className="page active">
      <div className="hero">
        <div className="hero-content">
          <div className="hero-badge">📋 Reg. No. VAR/08217/2025-2026</div>
          <h1>
            Indian Society of <em>Bio Agro Chemical Sciences</em>
          </h1>
          <p>Advancing sustainable agriculture through science, education, and community empowerment across Uttar Pradesh</p>
          <div className="hero-reg">✅ Registered under Societies Registration Act 1860 · Valid till 02/02/2031</div>
          <div className="hero-stats">
            <div className="hero-stat"><div className="num">10</div><div className="label">Committee Members</div></div>
            <div className="hero-stat"><div className="num">20+</div><div className="label">Objectives</div></div>
            <div className="hero-stat"><div className="num">2026</div><div className="label">Est. Varanasi, UP</div></div>
          </div>
        </div>
      </div>

      <section className="section" style={{ background: '#fff' }}>
        <div className="section-inner">
          <div className="section-tag">Our Mission</div>
          <h2 className="section-title">Bridging Science &amp; Sustainable Farming</h2>
          <p className="section-desc">
            ISBACS promotes bio-agro chemical sciences through research, seminars, workshops, and digital platforms — making
            scientific knowledge accessible to farmers and researchers alike.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(210px,1fr))', gap: '1.25rem' }}>
            {CARDS.map(([icon, title, text, bg, border]) => (
              <div key={title} style={{ background: bg, borderRadius: '.75rem', padding: '1.4rem', borderLeft: `4px solid ${border}` }}>
                <div style={{ fontSize: '1.6rem', marginBottom: '.4rem' }}>{icon}</div>
                <h4 style={{ color: 'var(--dark)', fontFamily: "'Playfair Display',serif", marginBottom: '.3rem' }}>{title}</h4>
                <p style={{ fontSize: '.82rem', color: 'var(--muted)' }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section home-books">
        <div className="section-inner">
          <div className="section-tag">Read Online</div>
          <h2 className="section-title">Ecosecurity through Resource Governance</h2>
          <p className="section-desc">
            Our two-volume edited book, published in September 2026. Open any chapter and read it in full, right here.
          </p>
          <div className="home-books-grid">
            {BOOKS.map((b) => (
              <Link key={b.slug} to={`/books/${b.slug}`} className="home-book">
                <BookCover book={b} size="sm" />
                <div>
                  <div className="hb-vol">Volume {b.roman}</div>
                  <h3>{b.chapters.length} chapters</h3>
                  <p>
                    Edited by {b.editors.map((e) => e.name).join(', ')}
                  </p>
                  <span className="hb-cta">Browse chapters →</span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link to="/books" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>
              Open the book library →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
