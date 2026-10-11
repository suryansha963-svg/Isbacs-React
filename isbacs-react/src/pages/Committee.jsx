const MEMBERS = [
  ['Prof. Satyendra Kumar Verma', 'President', 'Professor', 'D-205, Varuna Garden, Sikraul, Varanasi', '9415894614'],
  ['Dr. Ajay Kumar', 'Secretary', 'Assoc. Professor', 'Pureetika, Gopiganj, Bhadohi', '8601861468'],
  ['Dr. Asha Rani', 'Joint Secretary', 'Assoc. Professor', 'Sofa, Dayal Nagar, Khair, Aligarh', '9870750553'],
  ['Dr. Prem Chand', 'Treasurer', 'Assoc. Professor', 'Udai Bhavan, Van Bihar Road, Jaunpur', '8826445948'],
  ['Prof. Ramesh Singh', 'Member', 'Professor', 'Sajhauli Bhraheta, Mirzapur', '9838590623'],
  ['Dr. Rahul', 'Member', 'Assoc. Professor', '53, Jamuniya, Jaunpur', '8318523315'],
  ['Dr. Gyaneshwar Sharma', 'Member', 'Assoc. Professor', 'Mishrauliya Pandit, Sant Kabir Nagar', '9953721194'],
  ['Dr. Archana Chitale Verma', 'Member', 'Assoc. Professor', 'D-205, Varuna Garden, Varanasi', '8318483619'],
  ['Smt. Seema Singh', 'Member', 'Student', '8/78, Azad Nagar, Kevtana, Prayagraj', '7376013628'],
  ['Smt. Akanksha Bind', 'Member', 'Student', '601, Prasad Ka Pura, Lapri, Jaunpur', '9219203154'],
];

export default function Committee() {
  return (
    <div className="page committee-bg active">
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Leadership</div>
          <h2 className="section-title">Management Committee</h2>
          <p className="section-desc">
            Our committee comprises dedicated professors and researchers from across Uttar Pradesh guiding the society towards its scientific objectives.
          </p>
          <div className="committee-grid">
            {MEMBERS.map(([name, role, job, addr, tel], i) => (
              <div className="member-card" key={name} style={i === 0 ? { borderLeft: '3px solid var(--gold)' } : undefined}>
                <div className="member-avatar" style={i === 0 ? { background: 'var(--gold)', color: 'var(--dark)' } : undefined}>{name.replace(/^(Prof\.|Dr\.|Smt\.)\s*/, '')[0]}</div>
                <div className="member-info">
                  <h4>{name}</h4>
                  <span className="member-role" style={i === 0 ? { background: '#fff8e1', color: '#7a5c00' } : undefined}>{role}</span>
                  <div className="member-detail">
                    {job} · {addr}
                    <br />
                    📞 <a href={`tel:${tel}`}>{tel}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
