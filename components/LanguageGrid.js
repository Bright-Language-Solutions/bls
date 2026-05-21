import Link from 'next/link'

export default function LanguageGrid({ regionName, regionSlug, languages, accent = '#1466DB', showMax = 8 }) {
  const displayed = languages.slice(0, showMax)
  const remaining = languages.length - showMax

  return (
    <div className="bls-card p-6" style={{ height: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em' }}>
          {regionName}
        </h3>
        <span
          style={{
            background: accent + '18',
            color: accent,
            fontSize: 12,
            fontWeight: 600,
            padding: '4px 10px',
            borderRadius: 999,
          }}
        >
          {languages.length} covered
        </span>
      </div>

      {/* Language grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', marginBottom: 16 }}>
        {displayed.map((lang) => (
          <div key={lang.slug} style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 18,
                lineHeight: 1.2,
                color: 'var(--ink)',
                direction: lang.rtl ? 'rtl' : 'ltr',
              }}
            >
              {lang.nativeName}
            </span>
            <span style={{ fontSize: 12, color: 'var(--muted-c)' }}>{lang.name}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--rule)', paddingTop: 12 }}>
        {remaining > 0 && (
          <span style={{ fontSize: 13, color: 'var(--muted-c)' }}>+ {remaining} more</span>
        )}
        <Link
          href={`/languages/${regionSlug}`}
          style={{ fontSize: 13, color: accent, fontWeight: 600, textDecoration: 'none', marginLeft: 'auto' }}
        >
          See all →
        </Link>
      </div>
    </div>
  )
}
