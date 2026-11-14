import { Link } from 'react-router-dom';

const MEMBERS = [
  {
    name: 'Dr. Anuj Kumar Pandey',
    role: 'Senior Demonstrator',
    affiliation: 'Central Research Laboratory, Department of Biochemistry, Dr. Ram Manohar Lohia Institute of Medical Sciences, Lucknow-226010, Uttar Pradesh, India',
    emails: ['dr.anujkumar.pandey.demo.2024@drrmlims.ac.in', 'anujpandey551@kgmcindia.edu'],
  },
  {
    name: 'Dr. Mukul Kumar Singh',
    role: 'Scientist',
    affiliation: 'Department of Biology, Faculty of Medicine, Charles University, Pilsen, Czech Republic',
    emails: ['Mukul.singh@lfp.cuni.cz'],
  },
  {
    name: 'Dr. Sarika Sahu',
    role: 'Scientist',
    affiliation: 'Division of Agricultural Bioinformatics, ICAR-Indian Agricultural Statistics Research Institute, New Delhi',
    emails: [],
  },
  {
    name: 'Dr. Ram Chandra Maurya',
    role: 'Assistant Professor',
    affiliation: 'Department of Zoology, Sobhan Singh Jeena University, Campus - Almora',
    emails: ['mauryarc@gmail.com', 'rammauryazoology@ssjua.ac.in'],
  },
  {
    name: 'Prof. Birendra Kumar Nirmal',
    role: 'Head, Department of Zoology',
    affiliation: 'Harishchandra P G College, Varanasi',
    emails: ['bknirmal@hcpgcollege.edu.in'],
  },
  {
    name: 'Dr. Saurabh Kumar',
    role: 'Senior Demonstrator',
    affiliation: 'Sanjay Gandhi Post Graduate Institute of Medical Sciences Lucknow-226014, Uttar Pradesh, India',
    emails: ['saurabhkbt@sgpgi.ac.in'],
  },
  {
    name: 'Dr. Shama Parveen',
    role: 'Senior Demonstrator',
    affiliation: 'Sanjay Gandhi Post Graduate Institute of Medical Sciences Lucknow-226014, Uttar Pradesh, India',
    emails: ['shamap@sgpgi.ac.in'],
  },
];

export default function EditorialBoard() {
  return (
    <main className="page active editorial-page">
      <header className="editorial-hero">
        <div className="editorial-hero-inner">
          <Link to="/publications" className="editorial-back">← Publications &amp; Research</Link>
          <div className="editorial-kicker">Journal · Online · Monthly</div>
          <h1>Editorial Board</h1>
          <p className="editorial-journal-title">Journal of Bio Agro Chemical Research</p>
          <p className="editorial-intro">Meet the scholars and professionals associated with the journal.</p>
        </div>
      </header>
      <section className="section editorial-section">
        <div className="section-inner">
          <div className="editorial-grid">
            {MEMBERS.map((member) => (
              <article className="editorial-card" key={member.name}>
                <div className="editorial-avatar" aria-hidden="true">{member.name.replace(/^(Dr\.|Prof\.)\s*/, '').split(/\s+/).map((part) => part[0]).slice(0, 2).join('')}</div>
                <div className="editorial-card-content">
                  <h2>{member.name}</h2>
                  <p className="editorial-role">{member.role}</p>
                  <p className="editorial-affiliation">{member.affiliation}</p>
                  {member.emails.length > 0 && (
                    <div className="editorial-emails" aria-label="Email addresses">
                      {member.emails.map((email) => <a key={email} href={`mailto:${email}`}>{email}</a>)}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="editorial-note">Journal details are based on the ISSN application information provided: new title, online publication, monthly frequency, starting in 2026, with multidisciplinary subjects.</p>
        </div>
      </section>
    </main>
  );
}
