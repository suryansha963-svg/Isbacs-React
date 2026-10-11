import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS } from '../data/books.js';

const AREAS = [
  ['🌱', 'green', 'Sustainable Agriculture', 'Developing eco-friendly farming practices that improve yields while preserving soil health and biodiversity.'],
  ['🧪', 'gold', 'Bio-Based Chemicals', 'Research into plant-derived and microbial compounds as alternatives to synthetic agrochemicals.'],
  ['🌾', 'green', 'Soil Science & Nutrition', 'Studies on soil microbiology, organic matter dynamics, and nutrient cycling in agricultural ecosystems.'],
  ['🐛', 'gold', 'Biopesticides', 'Investigation of biological agents — microorganisms, plant extracts, and natural predators — for integrated pest management.'],
  ['💧', 'green', 'Water & Resource Management', 'Efficient irrigation strategies and water-quality research to support agricultural productivity in Uttar Pradesh.'],
  ['🧬', 'gold', 'Agricultural Biotechnology', 'Application of molecular and cellular techniques to develop disease-resistant, high-yield, and climate-adaptive crop varieties.'],
];

const PDF_LINK = {
  display: 'inline-flex', alignItems: 'center', gap: '.35rem', fontSize: '.78rem', fontWeight: 600, color: '#3a3a8a',
  textDecoration: 'none', background: '#f0f0ff', padding: '.3rem .85rem', borderRadius: '2rem', border: '1px solid #c8c8f8',
};

const TABS = [['all', 'All'], ['journal', 'Journal Articles'], ['conference', 'Conference Papers'], ['book', 'Book Chapters']];

export default function Publications() {
  const [tab, setTab] = useState('all');
  const show = (type) => tab === 'all' || tab === type;

  return (
    <div className="page active">
      <div className="pub-hero">
        <div className="pub-hero-inner">
          <div className="pub-hero-tag">📚 Academic Output</div>
          <h2>Publications &amp; Research</h2>
          <p>Advancing the frontiers of bio-agro-chemical sciences through peer-reviewed research, collaborative studies, and scientific outreach.</p>
          <div className="pub-stats">
            <div className="pub-stat"><div className="ps-num">0</div><div className="ps-label">Research Areas</div></div>
            <div className="pub-stat"><div className="ps-num">0</div><div className="ps-label">Publications</div></div>
            <div className="pub-stat"><div className="ps-num">0</div><div className="ps-label">Partner Institutions</div></div>
            <div className="pub-stat"><div className="ps-num">2026</div><div className="ps-label">Active Since</div></div>
          </div>
        </div>
      </div>

      <section className="section research-areas">
        <div className="section-inner">
          <div className="section-tag">Focus Domains</div>
          <h2 className="section-title">Research Areas</h2>
          <p className="section-desc">Our members conduct research spanning the intersection of biology, agriculture, and chemical sciences with a focus on sustainable and practical outcomes.</p>
          <div className="research-grid">
            {AREAS.map(([icon, tone, title, desc]) => (
              <div className="ra-card" key={title}>
                <div className={'ra-icon ' + tone}>{icon}</div>
                <div className="ra-title">{title}</div>
                <div className="ra-desc">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section pub-list-section">
        <div className="section-inner">
          <div className="section-tag">📄 Scholarly Works</div>
          <h2 className="section-title">Recent Publications</h2>
          <p className="section-desc">A selection of research papers, conference proceedings, and book chapters contributed by ISBACS members and collaborators.</p>
          <div className="pub-tabs">
            {TABS.map(([k, label]) => (
              <div key={k} className={'pub-tab' + (tab === k ? ' active' : '')} onClick={() => setTab(k)}>{label}</div>
            ))}
          </div>
          <div className="pub-items">
            {show('book') &&
              BOOKS.map((b) => (
                <div className="pub-item" key={b.slug}>
                  <div className="pub-item-meta"><span className="pub-type book">Book</span><span className="pub-year">2026</span></div>
                  <h4>Ecosecurity through Resource Governance — Volume {b.roman}</h4>
                  <div className="pub-authors">Edited by {b.editors.map((e) => e.name).join(', ')} · ISBN {b.isbn}</div>
                  <div className="pub-journal">{b.chapters.length} peer-reviewed chapters · {b.pages} pages · ISBACS, Varanasi</div>
                  <div style={{ marginTop: '.75rem' }}>
                    <Link to={`/books/${b.slug}`} style={PDF_LINK}>📖 Read chapters online</Link>
                  </div>
                </div>
              ))}
            {show('book') && (
              <>
                <div className="pub-item" data-type="book">
                  <div className="pub-item-meta"><span className="pub-type book">Book</span><span className="pub-year">2026</span></div>
                  <h4>MEGASRM2026 Abstract Book — Vol. 1</h4>
                  <div className="pub-authors">ISBACS · MEGASRM 2026 Conference Proceedings</div>
                  <div className="pub-journal">Abstract compilation from the MEGASRM 2026 international conference</div>
                  <div style={{ marginTop: '.75rem' }}>
                    <a href="https://drive.google.com/file/d/1mXMVLhSKiFzrTqUQbUz-h-hYSdF20lL2/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={PDF_LINK}>📖 View PDF</a>
                  </div>
                </div>
                <div className="pub-item" data-type="book">
                  <div className="pub-item-meta"><span className="pub-type book">Book</span><span className="pub-year">2026</span></div>
                  <h4>MEGASRM2026 Abstract Book — Vol. 2</h4>
                  <div className="pub-authors">ISBACS · MEGASRM 2026 Conference Proceedings</div>
                  <div className="pub-journal">Abstract compilation from the MEGASRM 2026 international conference</div>
                  <div style={{ marginTop: '.75rem' }}>
                    <a href="https://drive.google.com/file/d/1ms7ilcGwzzf0UFP7-hRkmKm_1rUFnsAQ/view?usp=sharing" target="_blank" rel="noopener noreferrer" style={PDF_LINK}>📖 View PDF</a>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pub-collab" style={{ marginTop: '2.5rem' }}>
            <h3>Submit Your Research Paper</h3>
            <p>ISBACS invites researchers, academicians, and students to submit original research papers for review and publication. Contribute to advancing bio-agro-chemical sciences.</p>
            <div className="pub-collab-btns">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLSd7uyPt--am4HB71-UETVk94J4OgQAq5o3060PqUV-i9eUosA/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="pub-collab-btn primary">📄 Research Paper Submission</a>
            </div>
          </div>
          <div className="pub-collab" style={{ marginTop: '1.5rem' }}>
            <h3>Submit Your Book Chapter</h3>
            <p>Authors are welcomed to submit book chapters for inclusion in ISBACS-affiliated academic volumes. Share your expertise and contribute to our growing body of scientific literature.</p>
            <div className="pub-collab-btns">
              <a href="https://docs.google.com/forms/d/e/1FAIpQLScrY5ADaen8t7xLT-WV9FQP07_NidId66hW6lv2A0w-jXH3Tw/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="pub-collab-btn primary">📖 Book Chapter Submission</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
