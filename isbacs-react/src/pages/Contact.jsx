const INFO = [
  ['📍', 'Address', 'D-205, Varuna Garden, Central Jail Road, Sikraul, Varanasi, UP 221002'],
  ['📞', 'President', '9415894614 — Prof. Satyendra Kumar Verma'],
  ['📱', 'Secretary', '8601861468 — Dr. Ajay Kumar'],
  ['🏛️', 'Reg. No.', 'VAR/08217/2025-2026'],
  ['📍', 'Work Area', 'Uttar Pradesh, India'],
];

export default function Contact() {
  return (
    <div className="page active">
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Get in Touch</div>
          <h2 className="section-title">Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-info-card">
              <h3>Society Office</h3>
              {INFO.map(([icon, label, value]) => (
                <div className="contact-item" key={label}>
                  <div className="ci-icon">{icon}</div>
                  <div>
                    <div className="ci-label">{label}</div>
                    <div className="ci-value">{value}</div>
                  </div>
                </div>
              ))}
            </div>
            <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
              <h3>Send a Message</h3>
              <div className="form-group"><label>Your Name</label><input type="text" placeholder="Full name" /></div>
              <div className="form-group"><label>Email</label><input type="email" placeholder="Your email" /></div>
              <div className="form-group"><label>Phone</label><input type="tel" placeholder="Your phone number" /></div>
              <div className="form-group">
                <label>Subject</label>
                <select>
                  <option>Membership Enquiry</option>
                  <option>Research Collaboration</option>
                  <option>Workshop / Seminar</option>
                  <option>General Enquiry</option>
                </select>
              </div>
              <div className="form-group"><label>Message</label><textarea placeholder="Write your message..."></textarea></div>
              <button className="btn-primary" type="submit">Send Message →</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
