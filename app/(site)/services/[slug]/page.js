import { notFound } from 'next/navigation'
import Link from 'next/link'
import services from '@/data/services'

export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) return {}
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguage.in'
  return {
    title: service.title,
    description: service.tagline,
    openGraph: {
      title: `${service.title} | Bright Language Solutions`,
      description: service.tagline,
      type: 'website',
      url: `${BASE}/services/${service.slug}`,
    },
  }
}

export default function ServicePage({ params }) {
  const service = services.find((s) => s.slug === params.slug)
  if (!service) notFound()

  const related = service.relatedIndustries || []

  return (
    <>
      {/* Hero band */}
      <section style={{ background: 'var(--navy)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link
            href="/services"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
          >
            ← All services
          </Link>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--yellow)', marginBottom: 16 }}>
            Service
          </p>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 600 }}>
            {service.title}
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 540, lineHeight: 1.65 }}>
            {service.tagline}
          </p>
        </div>
      </section>

      {/* Content */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 64 }}>
          {/* Left */}
          <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 26, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              Overview
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.8, marginBottom: 40 }}>
              {service.description}
            </p>

            <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              What&rsquo;s included
            </h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {service.features.map((f) => (
                <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 15, color: 'var(--ink)', lineHeight: 1.6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <circle cx="12" cy="12" r="10" fill="var(--blue)" opacity="0.12" />
                    <polyline points="8 12 11 15 16 9" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Right */}
          <div>
            <div className="bls-card" style={{ padding: 28, marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
                Get a quote for this service
              </h3>
              <p style={{ fontSize: 14, color: 'var(--muted-c)', marginBottom: 20, lineHeight: 1.6 }}>
                Tell us about your project. We reply within four working hours.
              </p>
              <Link href={`/get-quote?service=${service.title}`} className="btn accent" style={{ width: '100%', justifyContent: 'center' }}>
                Request a Quote →
              </Link>
              <p style={{ fontSize: 12, color: 'var(--muted-c)', textAlign: 'center', marginTop: 12 }}>
                NDA by default · No spam
              </p>
            </div>

            {related.length > 0 && (
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', marginBottom: 12 }}>
                  Industries served
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {related.map((ind) => (
                    <Link
                      key={ind}
                      href={`/industries/${ind}`}
                      style={{
                        padding: '6px 14px',
                        borderRadius: 999,
                        border: '1px solid var(--rule)',
                        fontSize: 13,
                        color: 'var(--ink)',
                        textDecoration: 'none',
                        textTransform: 'capitalize',
                        transition: 'border-color 0.2s',
                      }}
                      className="hover:border-[var(--blue)]"
                    >
                      {ind.replace(/-/g, ' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: 'linear-gradient(135deg, #06184F 0%, #00102E 100%)',
          padding: '64px 24px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Ready to get started?
        </h2>
        <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginBottom: 28 }}>
          Share your brief and we&rsquo;ll reply within four working hours.
        </p>
        <Link href="/get-quote" className="btn accent">Get a Quote for {service.title} →</Link>
      </section>
    </>
  )
}
