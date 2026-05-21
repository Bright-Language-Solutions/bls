import Link from 'next/link'
import industries from '@/data/industries'

export const metadata = {
  title: 'Industries We Serve',
  description: 'Language services for legal, medical, technical, e-commerce, gaming, education, and media industries — with trained linguists in every vertical.',
  openGraph: {
    title: 'Industries We Serve | Bright Language Solutions',
    description: 'Language services for legal, medical, technical, e-commerce, gaming, education, and media industries — with trained linguists in every vertical.',
    type: 'website',
    url: '/about/industries-we-serve',
  },
}

const EMOJIS = { legal: '⚖️', medical: '🏥', technical: '⚙️', 'e-commerce': '🛒', gaming: '🎮', education: '🎓', 'media-entertainment': '📺' }

export default function IndustriesWeServePage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Industries we serve
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 520 }}>
        Deep expertise across every sector.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        Our linguists hold subject-matter qualifications and understand the terminology, compliance requirements, and expectations of your industry.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
        {industries.map((ind) => (
          <Link key={ind.slug} href={`/industries/${ind.slug}`} style={{ textDecoration: 'none' }}>
            <div className="bls-card" style={{ padding: 28, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: 36, marginBottom: 16 }}>{EMOJIS[ind.slug] || '🌐'}</div>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 10 }}>
                {ind.title}
              </h2>
              <p style={{ fontSize: 14, color: 'var(--muted-c)', lineHeight: 1.65, marginBottom: 16, flex: 1 }}>
                {ind.description.slice(0, 120)}…
              </p>
              <span style={{ fontSize: 13, color: 'var(--blue)', fontWeight: 600 }}>
                Explore industry →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
