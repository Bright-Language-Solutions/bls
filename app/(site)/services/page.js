import Link from 'next/link'
import ServiceCard from '@/components/ServiceCard'
import services from '@/data/services'

export const metadata = {
  title: 'Our Services',
  description: 'Explore all 10 language services by Bright Language Solutions — translation, interpretation, voice-over, dubbing, subtitling, localization, and more.',
  openGraph: {
    title: 'Our Services | Bright Language Solutions',
    description: 'Explore all 10 language services by Bright Language Solutions — translation, interpretation, voice-over, dubbing, subtitling, localization, and more.',
    type: 'website',
    url: '/services',
  },
}

export default function ServicesPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 56 }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
          Services
        </p>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 520 }}>
          Every language service under one roof.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520 }}>
          ISO-certified quality across translation, interpretation, voice, media, and publishing — all managed by a dedicated producer.
        </p>
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {services.map((svc, i) => (
          <ServiceCard
            key={svc.slug}
            service={svc}
            featured={i === 0}
            className={i === 0 ? 'col-span-2' : ''}
          />
        ))}
      </div>

      {/* CTA */}
      <div style={{ marginTop: 64, padding: '40px', background: 'var(--tint)', borderRadius: 20, textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 28, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 12 }}>
          Not sure which service you need?
        </h2>
        <p style={{ fontSize: 15, color: 'var(--muted-c)', marginBottom: 24 }}>
          Share your brief and our producers will recommend the right approach.
        </p>
        <Link href="/get-quote" className="btn accent">Get a Free Quote →</Link>
      </div>
    </div>
  )
}
