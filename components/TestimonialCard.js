export default function TestimonialCard({ quote, name, role, company }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div
      style={{
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--card-bg)',
        padding: '28px 24px',
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(6,24,79,0.06)',
        borderLeft: '4px solid #F5B819',
        borderTop: 'none',
        borderRight: 'none',
        borderBottom: 'none',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      {/* Large decorative quote mark */}
      <div
        aria-hidden="true"
        style={{
          fontSize: 80,
          lineHeight: 0.8,
          color: '#F5B819',
          opacity: 0.25,
          fontFamily: 'Georgia, serif',
          marginBottom: 12,
          userSelect: 'none',
        }}
      >&ldquo;</div>

      {/* Stars */}
      <div style={{ display: 'flex', gap: 3 }}>
        {Array.from({ length: 5 }).map((_, i) => (
          <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#F5B819">
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        ))}
      </div>

      {/* Quote */}
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, fontStyle: 'italic', flex: 1 }}>
        &ldquo;{quote}&rdquo;
      </p>

      {/* Author */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 4, borderTop: '1px solid var(--rule)' }}>
        <div
          style={{
            width: 40, height: 40, borderRadius: '50%',
            background: 'var(--navy)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
            boxShadow: '0 0 0 3px #F5B81940, 0 0 0 1px #F5B819',
          }}
        >
          <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 14, fontWeight: 600, color: '#fff' }}>
            {initials}
          </span>
        </div>
        <div>
          <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', margin: 0 }}>{name}</p>
          <p style={{ fontSize: 13, color: 'var(--muted-c)', margin: 0 }}>
            {role} · {company}
          </p>
        </div>
      </div>
    </div>
  )
}
