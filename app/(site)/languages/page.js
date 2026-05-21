import Link from 'next/link'
import LanguageGrid from '@/components/LanguageGrid'
import languages from '@/data/languages'

export const metadata = {
  title: 'Languages',
  description: 'Translation and localisation in 120+ languages — Indian, European, Asian, and Middle East language coverage by certified native-speaker experts.',
  openGraph: {
    title: 'Languages | Bright Language Solutions',
    description: 'Translation and localisation in 120+ languages — Indian, European, Asian, and Middle East language coverage by certified native-speaker experts.',
    type: 'website',
    url: '/languages',
  },
}

const REGIONS = [
  { key: 'indian',     name: 'Indian Languages',      slug: 'indian-languages',      accent: '#F5B819' },
  { key: 'european',   name: 'European Languages',     slug: 'european-languages',     accent: '#1466DB' },
  { key: 'asian',      name: 'Asian Languages',        slug: 'asian-languages',        accent: '#0E7C66' },
  { key: 'middleEast', name: 'Middle East Languages',  slug: 'middle-east-languages',  accent: '#8B5CF6' },
]

export default function LanguagesPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      {/* Header */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Languages
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 520 }}>
        120+ languages, organised your way.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        Native-speaker translators and interpreters in every region. Browse by language family or search for your pair.
      </p>

      {/* Region grids */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
        {REGIONS.map((r) => (
          <LanguageGrid
            key={r.key}
            regionName={r.name}
            regionSlug={r.slug}
            languages={languages[r.key] || []}
            accent={r.accent}
            showMax={8}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 64, textAlign: 'center' }}>
        <p style={{ fontSize: 15, color: 'var(--muted-c)', marginBottom: 20 }}>
          Don&rsquo;t see your language? We likely cover it.
        </p>
        <Link href="/get-quote" className="btn accent">Request a Custom Language Pair →</Link>
      </div>
    </div>
  )
}
