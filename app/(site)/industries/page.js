import Link from 'next/link'
import industries from '@/data/industries'

export const metadata = {
  title: 'Industries',
  description: 'Specialist language services for legal, medical, technical, e-commerce, gaming, education, and media sectors — industry-trained linguists on every project.',
  openGraph: {
    title: 'Industries | Bright Language Solutions',
    description: 'Specialist language services for legal, medical, technical, e-commerce, gaming, education, and media sectors — industry-trained linguists on every project.',
    type: 'website',
    url: '/industries',
  },
}

const EMOJIS = { legal: '⚖️', medical: '🏥', technical: '⚙️', 'e-commerce': '🛒', gaming: '🎮', education: '🎓', 'media-entertainment': '📺' }

export default function IndustriesPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Industries
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 520 }}>
        Deep expertise across every sector.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        Our linguists hold subject-matter qualifications and understand the terminology, regulations, and expectations of your industry.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {industries.map((ind) => (
          <Link
            key={ind.slug}
            href={`/industries/${ind.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <div className="bls-card" style={{ padding: 28, height: '100%' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{EMOJIS[ind.slug] || '🌐'}</div>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>
                {ind.title}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted-c)', lineHeight: 1.7, marginBottom: 20 }}>
                {ind.description}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {ind.servicesOffered.slice(0, 3).map((s) => (
                  <span
                    key={s}
                    style={{ padding: '4px 10px', borderRadius: 999, border: '1px solid var(--rule)', fontSize: 12, color: 'var(--muted-c)', textTransform: 'capitalize' }}
                  >
                    {s.replace(/-/g, ' ')}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
