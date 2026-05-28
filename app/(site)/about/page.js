import Link from 'next/link'

export const metadata = {
  title: 'About Us',
  description: 'Expert language partner with a 48-country linguist network. One producer, full accountability, on every project.',
  openGraph: {
    title: 'About Us | Bright Language Solutions',
    description: 'Expert language partner with a 48-country linguist network. One producer, full accountability, on every project.',
    type: 'website',
    url: '/about',
  },
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--yellow)', marginBottom: 16 }}>
            About Bright
          </p>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 600 }}>
            Built to bridge language gaps — at scale.
          </h1>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.7)', maxWidth: 540, lineHeight: 1.65 }}>
            Bright Language Solutions is a quality-assured language services company delivering translation, interpretation, voice, and media services in 120+ languages.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
          <div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 32, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
              Our mission
            </h2>
            <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.8, marginBottom: 20 }}>
              We believe that language should never be a barrier to doing business globally. Our mission is to help organisations communicate with clarity and confidence in every market they serve.
            </p>
            <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.8 }}>
              Every project at Bright is handled by a dedicated producer — one point of contact, full accountability, and a quality-assured process from brief to delivery.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {[
              { label: 'Founded', value: '2014' },
              { label: 'Languages covered', value: '120+' },
              { label: 'Projects delivered', value: '3,000+' },
              { label: 'Words translated', value: '1.4B+' },
              { label: 'Countries served', value: '48' },
            ].map(({ label, value }) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 0', borderBottom: '1px solid var(--rule)' }}>
                <span style={{ fontSize: 15, color: 'var(--muted-c)' }}>{label}</span>
                <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Team placeholder */}
      <section style={{ maxWidth: 1200, margin: '0 auto', padding: '72px 24px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 28, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
          Meet the team
        </h2>
        <p style={{ fontSize: 15, color: 'var(--muted-c)', marginBottom: 32 }}>
          Our team of producers, linguists, and engineers spans 3 continents and 20+ nationalities.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
          {['PR', 'MK', 'AS', 'JR', 'NV', 'DS'].map((init) => (
            <div key={init} style={{ width: 72, height: 72, borderRadius: '50%', background: 'var(--tint-2)', border: '2px solid var(--rule)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>{init}</span>
            </div>
          ))}
        </div>
        <Link href="/get-quote" className="btn accent">Work with us →</Link>
      </section>
    </>
  )
}
