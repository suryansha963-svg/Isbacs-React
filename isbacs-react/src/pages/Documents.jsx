import { useState, useEffect } from 'react';

const DOCS = [
  ['reg', '📄', 'Registration Certificate', 'VAR/08217/2025-2026 · dated 03/02/2026'],
  ['mem1', '📋', 'Memorandum of Association (Page 1)', 'स्मृति-पत्र — objectives and management committee'],
  ['mem2', '📋', 'Memorandum of Association (Page 2)', 'General body members list & signatures'],
  ['rules1', '📜', 'Rules of Association (Page 1)', 'नियमावली — membership types and general body'],
  ['rules2', '📜', 'Rules of Association (Page 2)', 'Management committee rights & responsibilities'],
  ['rules3', '📜', 'Rules of Association (Page 3)', 'Source of income, dissolution & society records'],
  ['rules3b', '👥', 'Committee Members List', 'Full details — names, DOB, address, mobile numbers'],
];

export default function Documents() {
  const [open, setOpen] = useState(null);
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(null);
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const src = open ? `images/documents/${open[0]}.png` : '';

  return (
    <div className="page active">
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Resources</div>
          <h2 className="section-title">Documents &amp; Publications</h2>
          <p className="section-desc">Access official society documents, research publications, and important certificates.</p>

          <h3 className="docs-section-title">📂 Official Society Documents</h3>
          <div className="docs-grid">
            {DOCS.map((d) => (
              <div className="doc-card" key={d[0]} onClick={() => setOpen(d)}>
                <div className="doc-icon-box">{d[1]}</div>
                <div className="doc-info">
                  <h4>{d[2]}</h4>
                  <p>{d[3]}</p>
                  <span className="doc-btn" style={{ cursor: 'pointer' }}>👁 View Document</span>
                </div>
              </div>
            ))}
          </div>

          {open && (
            <div className="doc-modal" onClick={() => setOpen(null)}>
              <div className="doc-modal-card" onClick={(e) => e.stopPropagation()}>
                <div className="doc-modal-head">
                  <span>{open[2]}</span>
                  <div style={{ display: 'flex', gap: '.75rem', alignItems: 'center' }}>
                    <a href={src} download={open[2] + '.png'} className="doc-save">⬇ Save Image</a>
                    <button onClick={() => setOpen(null)} className="doc-close" aria-label="Close">✕</button>
                  </div>
                </div>
                <div className="doc-modal-body">
                  <img src={src} alt={open[2]} />
                </div>
              </div>
            </div>
          )}

          <h3 className="docs-section-title">📚 Research &amp; Publications</h3>
          <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--muted)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '.75rem' }}>📁</div>
            <p>More documents and publications will be added soon.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
