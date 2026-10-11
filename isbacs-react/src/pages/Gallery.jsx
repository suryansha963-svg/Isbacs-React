import { useState, useEffect } from 'react';

const IMAGES = [
  ['isbacs1.jpg', 'Book Release Ceremony'],
  ['isbacs2.jpg', 'Award Ceremony – First Prize'],
  ['isbacs3.jpg', 'Award Ceremony – First Prize (Female)'],
  ['isbacs4.jpg', 'Felicitation of Distinguished Guest'],
  ['isbacs5.jpg', 'Award Presentation'],
  ['isbacs6.jpg', 'Distinguished Speaker Felicitation'],
  ['isbacs7.png', 'Conference Highlights'],
];

export default function Gallery() {
  const [active, setActive] = useState(null);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setActive(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="page active">
      <section className="section" style={{ background: '#fff' }}>
        <div className="section-inner">
          <div className="section-tag">Event Gallery</div>
          <h2 className="section-title">From Molecule to Ecosystem: Global Security Through Sustainable Resource Management</h2>
          <p className="section-desc" style={{ maxWidth: 780 }}>
            Conference organised by <strong>Indian Society of Bio Agro Chemical Sciences (ISBACS)</strong> — held in hybrid mode at Balrampur Hall, March 12–14, 2026.
          </p>
          <div className="gallery-grid">
            {IMAGES.map(([f, cap]) => (
              <div className="gallery-item" key={f} onClick={() => setActive([f, cap])}>
                <img src={`images/conference/${f}`} alt={cap} loading="lazy" />
              </div>
            ))}
          </div>
          {active && (
            <div id="galleryLightbox" className="open" onClick={() => setActive(null)}>
              <span className="lb-close">✕</span>
              <img src={`images/conference/${active[0]}`} alt={active[1]} />
              <span className="lb-caption">{active[1]}</span>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
