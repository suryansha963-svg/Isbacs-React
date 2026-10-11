const OBJ = [
  ['🌱', 'Promote bio-agro chemical research & education'],
  ['♻️', 'Develop eco-friendly agricultural chemicals'],
  ['🌿', 'Popularize bio-fertilizers & green technology'],
  ['🎓', 'Knowledge exchange among scientists & students'],
  ['📰', 'Publish research journals & bulletins for free'],
  ['🛡️', 'Natural resource conservation & environment'],
  ['💻', 'Digital platforms for e-learning & knowledge'],
  ['👩‍🔬', 'Empower women scientists & young researchers'],
];
const REG = [
  ['Society Name', 'Indian Society of Bio Agro Chemical Sciences'],
  ['Registration Number', 'VAR/08217/2025-2026'],
  ['File Number', 'V/VAR/0084834'],
  ['Registered Under', 'Societies Registration Act 1860'],
  ['Valid Period', '03/02/2026 to 02/02/2031'],
  ['Address', 'D-205, Varuna Garden, Central Jail Road, Sikraul, Varanasi, UP 221002'],
];

export default function About() {
  return (
    <div className="page active">
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">About the Society</div>
          <h2 className="section-title">Who We Are</h2>
          <div className="about-grid">
            <div>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.25rem' }}>
                The <strong>Indian Society of Bio Agro Chemical Sciences (ISBACS)</strong> is a registered nonprofit organization based in
                Varanasi, Uttar Pradesh. Founded to bridge the gap between modern agricultural science and practical farming, ISBACS works to
                promote safe, sustainable, and scientifically advanced agricultural practices.
              </p>
              <p style={{ color: 'var(--muted)', lineHeight: 1.8, marginBottom: '1.75rem' }}>
                The society brings together professors, researchers, scientists, and students committed to the advancement of bio-agro chemical
                sciences for the benefit of farmers and the environment.
              </p>
              <div className="obj-grid">
                {OBJ.map(([i, t]) => (
                  <div className="obj-item" key={t}>
                    <span className="obj-icon">{i}</span>
                    <span className="obj-text">{t}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="about-visual">
                <h3>Registration Details</h3>
                {REG.map(([l, v]) => (
                  <div className="reg-card" key={l}>
                    <div className="rl">{l}</div>
                    <div className="rv">{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: '1.1rem', color: 'var(--dark)', marginBottom: '.85rem' }}>Membership</h3>
                <div className="mem-cards">
                  <div className="mem-card life"><h4>Life Member</h4><div className="mem-price">₹2,000</div><p>One-time fee. Full lifetime benefits.</p></div>
                  <div className="mem-card general"><h4>General Member</h4><div className="mem-price">₹200</div><p>Annual fee. For aligned individuals.</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
