// To add a video, push an entry here: { id: 'YOUTUBE_VIDEO_ID', title: 'Title', note: 'ISBACS · 2026' }
const VIDEOS = [];

export default function Videos() {
  return (
    <div className="page active">
      <section className="section">
        <div className="section-inner">
          <div className="section-tag">Media</div>
          <h2 className="section-title">Videos</h2>
          <p className="section-desc">Watch our latest lectures, seminars, and workshop recordings.</p>
          {VIDEOS.length > 0 ? (
            <div className="videos-grid">
              {VIDEOS.map((v) => (
                <div className="video-card" key={v.id}>
                  <div className="video-embed">
                    <iframe src={`https://www.youtube.com/embed/${v.id}`} title={v.title} allowFullScreen loading="lazy"></iframe>
                  </div>
                  <div className="video-info">
                    <h4>{v.title}</h4>
                    <p>{v.note}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--muted)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎬</div>
              <p style={{ fontSize: '1rem' }}>Videos coming soon. Check back shortly!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
