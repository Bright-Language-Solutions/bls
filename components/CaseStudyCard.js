import Link from 'next/link'

export default function CaseStudyCard({ tag, title, client, metric, slug }) {
  return (
    <div className="bls-card p-6 flex flex-col justify-between" style={{ minHeight: 220 }}>
      {/* Tag */}
      <div>
        <span
          style={{
            display: 'inline-block',
            background: 'var(--tint-2)',
            color: 'var(--blue)',
            fontSize: 11,
            fontFamily: 'JetBrains Mono, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            padding: '4px 10px',
            borderRadius: 999,
            marginBottom: 16,
          }}
        >
          {tag}
        </span>

        <h3
          style={{
            fontFamily: 'Bricolage Grotesque, system-ui',
            fontSize: 22,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--ink)',
            lineHeight: 1.3,
            marginBottom: 20,
          }}
        >
          {title}
        </h3>
      </div>

      <div>
        {/* Client + Result row */}
        <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
          <div>
            <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted-c)', marginBottom: 2 }}>
              Client
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)' }}>{client}</p>
          </div>
          <div>
            <p style={{ fontSize: 11, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--muted-c)', marginBottom: 2 }}>
              Result
            </p>
            <p
              style={{
                fontFamily: 'Bricolage Grotesque, system-ui',
                fontSize: 22,
                fontWeight: 600,
                color: 'var(--yellow)',
                letterSpacing: '-0.02em',
              }}
            >
              {metric}
            </p>
          </div>
        </div>

        {slug ? (
          <Link
            href={`/case-studies/${slug}`}
            style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          >
            Read study →
          </Link>
        ) : (
          <span style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600 }}>Read study →</span>
        )}
      </div>
    </div>
  )
}
