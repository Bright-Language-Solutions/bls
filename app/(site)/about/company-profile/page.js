import Link from 'next/link'

export const metadata = {
  title: 'Company Profile',
  description: 'Bright Language Solutions — quality-assured language services company. Founded to serve global businesses with precision translation, localisation, and voice services.',
  openGraph: {
    title: 'Company Profile | Bright Language Solutions',
    description: 'Quality-assured language services company serving 500+ global clients across 120+ languages since 2014.',
    type: 'website',
    url: '/about/company-profile',
  },
}

const CERTIFICATIONS = [
  { label: 'Quality Assured', desc: 'Rigorous quality management on every project' },
  { label: 'NDA Default', desc: 'Confidentiality on every project' },
]

const STATS = [
  { num: '1.4B+', label: 'words delivered', sub: 'since 2014' },
  { num: '120+',  label: 'languages',        sub: 'covered in-house' },
  { num: '48',    label: 'countries',         sub: 'linguist presence' },
  { num: '500+',  label: 'global clients',    sub: 'active accounts' },
]

const OFFICES = [
  { city: 'Mumbai',    role: 'Global HQ & Production Hub' },
  { city: 'London',    role: 'EMEA Production Hub' },
  { city: 'Bengaluru', role: 'Technology & Operations' },
  { city: 'Delhi',     role: 'North India Linguist Hub' },
]

export default function CompanyProfilePage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      {/* Breadcrumb */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', marginBottom: 40 }}>
        <Link href="/about" style={{ color: 'var(--blue)', textDecoration: 'none' }}>About</Link>
        {' / '}Company Profile
      </p>

      {/* Hero */}
      <div style={{ marginBottom: 64 }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
          Who we are
        </p>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 20, maxWidth: 680 }}>
          A language partner built for global business.
        </h1>
        <p style={{ fontSize: 17, color: 'var(--muted-c)', lineHeight: 1.75, maxWidth: 640 }}>
          Bright Language Solutions was founded on the belief that great language services should be invisible — meaning the output reads, sounds, and feels native without any trace of translation. We combine quality-assured processes with a producer model that keeps every project on track.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, background: 'var(--navy)', borderRadius: 20, padding: '40px 32px', marginBottom: 64 }}>
        {STATS.map(({ num, label, sub }) => (
          <div key={label} style={{ textAlign: 'center' }}>
            <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(36px, 4vw, 52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>{num}</p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.7)', margin: '8px 0 4px', fontWeight: 500 }}>{label}</p>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0 }}>{sub}</p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, marginBottom: 64 }}>
        {/* Certifications */}
        <div>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 20 }}>
            Certifications
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {CERTIFICATIONS.map(({ label, desc }) => (
              <div key={label} className="bls-card" style={{ padding: '18px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'var(--tint-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" fill="var(--blue)" opacity="0.12" />
                    <polyline points="8 12 11 15 16 9" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <div>
                  <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>{label}</p>
                  <p style={{ fontSize: 13, color: 'var(--muted-c)', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 20 }}>
            Global offices
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {OFFICES.map(({ city, role }) => (
              <div key={city} className="bls-card" style={{ padding: '18px 20px' }}>
                <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 18, fontWeight: 700, color: 'var(--ink)', margin: '0 0 4px', letterSpacing: '-0.01em' }}>{city}</p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--blue)', margin: 0 }}>{role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
        <Link href="/get-quote" className="btn accent">Get a Free Quote →</Link>
        <Link href="/about/why-choose-us" className="btn ghost">Why choose us</Link>
      </div>
    </div>
  )
}
