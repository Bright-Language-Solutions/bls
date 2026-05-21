export default function TestimonialCard({ quote, name, role, company }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="bls-card p-6 flex flex-col gap-4" style={{ height: '100%' }}>
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
