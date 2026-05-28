import { notFound } from 'next/navigation'
import Link from 'next/link'
import languages from '@/data/languages'

const REGION_MAP = {
  'indian-languages':      { key: 'indian',     name: 'Indian Languages',      accent: '#F5B819' },
  'european-languages':    { key: 'european',   name: 'European Languages',    accent: '#1466DB' },
  'asian-languages':       { key: 'asian',      name: 'Asian Languages',       accent: '#0E7C66' },
  'middle-east-languages': { key: 'middleEast', name: 'Middle East Languages', accent: '#8B5CF6' },
}

export async function generateStaticParams() {
  return Object.keys(REGION_MAP).map((region) => ({ region }))
}

export async function generateMetadata({ params }) {
  const meta = REGION_MAP[params.region]
  if (!meta) return {}
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguagesolutions.com'
  const desc = `Quality-assured translation and localisation for ${meta.name} by Bright Language Solutions — native-speaker experts for every language pair.`
  return {
    title: meta.name,
    description: desc,
    openGraph: {
      title: `${meta.name} | Bright Language Solutions`,
      description: desc,
      type: 'website',
      url: `${BASE}/languages/${params.region}`,
    },
  }
}

export default function RegionPage({ params }) {
  const meta = REGION_MAP[params.region]
  if (!meta) notFound()

  const langs = languages[meta.key] || []

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      {/* Back */}
      <Link
        href="/languages"
        style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 36 }}
      >
        ← All languages
      </Link>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <span
          style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: meta.accent + '18', color: meta.accent, fontSize: 13, fontWeight: 600, marginBottom: 16 }}
        >
          {langs.length} languages covered
        </span>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em' }}>
          {meta.name}
        </h1>
      </div>

      {/* Language grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4" style={{ marginBottom: 64 }}>
        {langs.map((lang) => (
          <div
            key={lang.slug}
            className="bls-card"
            style={{ padding: '20px 18px', width: '100%' }}
          >
            <p
              style={{
                fontSize: 28,
                lineHeight: 1.2,
                color: 'var(--ink)',
                marginBottom: 6,
                direction: lang.rtl ? 'rtl' : 'ltr',
              }}
            >
              {lang.nativeName}
            </p>
            <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--ink)', marginBottom: 4 }}>
              {lang.name}
            </p>
            <p style={{ fontSize: 12, color: 'var(--muted-c)', margin: 0 }}>
              {lang.script} script{lang.rtl ? ' · RTL' : ''}
            </p>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ textAlign: 'center', padding: '40px', background: 'var(--tint)', borderRadius: 20 }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 24, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>
          Need a specific language pair?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--muted-c)', marginBottom: 24 }}>
          Request a quote and our producer will match you with the right specialist.
        </p>
        <Link href="/get-quote" className="btn accent">Get a Quote →</Link>
      </div>
    </div>
  )
}
