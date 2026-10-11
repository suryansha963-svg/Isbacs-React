// A typeset cover drawn in CSS (no cover image was supplied with the books)
export default function BookCover({ book, size = 'md' }) {
  return (
    <div className={`book-cover bc-${book.slug} bc-${size}`} role="img" aria-label={`Cover of Ecosecurity through Resource Governance, Volume ${book.roman}`}>
      <div className="bc-spine" />
      <div className="bc-inner">
        <div className="bc-org">ISBACS · 2026</div>
        <div className="bc-leaf">🌿</div>
        <div className="bc-title">
          Ecosecurity <span>through</span> Resource Governance
        </div>
        <div className="bc-vol">Volume {book.roman}</div>
        <div className="bc-editors">
          {book.editors.map((e) => (
            <div key={e.name}>{e.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
