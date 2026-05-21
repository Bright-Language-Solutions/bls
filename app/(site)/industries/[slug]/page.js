import { notFound } from 'next/navigation'
import Link from 'next/link'
import industries from '@/data/industries'
import services from '@/data/services'

export async function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }))
}

export async function generateMetadata({ params }) {
  const industry = industries.find((i) => i.slug === params.slug)
  if (!industry) return {}
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguage.in'
  const desc = industry.description.slice(0, 160)
  return {
    title: industry.title,
    description: desc,
    openGraph: {
      title: `${industry.title} | Bright Language Solutions`,
      description: desc,
      type: 'website',
      url: `${BASE}/industries/${industry.slug}`,
    },
  }
}

const EMOJIS = { legal: '⚖️', medical: '🏥', technical: '⚙️', 'e-commerce': '🛒', gaming: '🎮', education: '🎓', 'media-entertainment': '📺' }

export default function IndustryPage({ params }) {
  const industry = industries.find((i) => i.slug === params.slug)
  if (!industry) notFound()

  const offeredServices = services.filter((s) => industry.servicesOffered.includes(s.slug))

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #06184F 0%, #00102E 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link
            href="/industries"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
          >
            ← All industries
          </Link>
          <div style={{ fontSize: 52, marginBottom: 20 }}>{EMOJIS[industry.slug] || '🌐'}</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 600 }}>
            {industry.title}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 560, lineHeight: 1.65 }}>
            {industry.description}
          </p>
        </div>
      </section>

      {/* Highlights + Services */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 26, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Why teams choose us
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {industry.highlights.map((h) => (
                <li key={h} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--ink)', lineHeight: 1.65 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="10" fill="var(--blue)" opacity="0.12" />
                    <polyline points="8 12 11 15 16 9" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 26, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Services for {industry.title}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {offeredServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '14px 18px',
                    borderRadius: 12,
                    border: '1px solid var(--rule)',
                    textDecoration: 'none',
                    color: 'var(--ink)',
                    fontSize: 15,
                    fontWeight: 500,
                    transition: 'border-color 0.2s, background 0.2s',
                  }}
                  className="hover:border-[var(--blue)] hover:bg-[var(--tint)]"
                >
                  {svc.title}
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--muted-c)" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div style={{ marginTop: 64, textAlign: 'center', padding: '48px', background: 'var(--tint)', borderRadius: 20 }}>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 28, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Ready to work with {industry.title} specialists?
          </h2>
          <p style={{ fontSize: 15, color: 'var(--muted-c)', marginBottom: 28 }}>
            Share your brief and our producer will respond within four working hours.
          </p>
          <Link href="/get-quote" className="btn accent">Get a Quote →</Link>
        </div>
      </section>
    </>
  )
}
