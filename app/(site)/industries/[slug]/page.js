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
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguagesolutions.com'
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

  const offeredServices = services.filter((s) => (industry.servicesOffered || []).includes(s.slug))

  return (
    <>
      {/* Hero band — full width navy */}
      <section style={{ background: 'linear-gradient(135deg, #06184F 0%, #00102E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link
            href="/industries"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
          >
            ← All industries
          </Link>
          <div style={{ fontSize: 52, marginBottom: 20 }}>{EMOJIS[industry.slug] || '🌐'}</div>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16 }}>
            {industry.title}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 640, lineHeight: 1.65 }}>
            {industry.description}
          </p>
        </div>
      </section>

      {/* Services offered — chip grid */}
      {offeredServices.length > 0 && (
        <section style={{ borderBottom: '1px solid var(--rule)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Services for {industry.title}
            </h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              {offeredServices.map((svc) => (
                <Link
                  key={svc.slug}
                  href={`/services/${svc.slug}`}
                  style={{
                    padding: '10px 20px',
                    borderRadius: 999,
                    border: '1px solid var(--rule)',
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--ink)',
                    textDecoration: 'none',
                    background: 'var(--tint)',
                    transition: 'border-color 0.2s, background 0.2s, color 0.2s',
                  }}
                  className="hover:border-[var(--blue)] hover:bg-[var(--blue)] hover:text-white"
                >
                  {svc.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Highlights — 3-col grid on desktop */}
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 26, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 32 }}>
            Why teams choose us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {industry.highlights.map((h) => (
              <div key={h} className="bls-card" style={{ padding: '20px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--ink)', lineHeight: 1.65 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="10" fill="var(--blue)" opacity="0.12" />
                    <polyline points="8 12 11 15 16 9" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {h}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band — full width navy gradient */}
      <section style={{ background: 'linear-gradient(135deg, #06184F 0%, #00102E 100%)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 28, fontWeight: 600, color: '#fff', letterSpacing: '-0.02em', marginBottom: 12 }}>
            Ready to work with {industry.title} specialists?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 28 }}>
            Share your brief and our producer will respond within four working hours.
          </p>
          <Link href="/get-quote" className="btn accent">Get a Quote →</Link>
        </div>
      </section>
    </>
  )
}
