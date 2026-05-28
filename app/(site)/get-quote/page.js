import QuoteForm from '@/components/QuoteForm'

export const metadata = {
  title: 'Get a Quote',
  description: 'Request a free translation or localisation quote from Bright Language Solutions. Share your brief and get a response within four working hours.',
  openGraph: {
    title: 'Get a Quote | Bright Language Solutions',
    description: 'Request a free translation or localisation quote from Bright Language Solutions. Share your brief and get a response within four working hours.',
    type: 'website',
    url: '/get-quote',
  },
}

export default function GetQuotePage() {
  return (
    <main style={{ width: '100%', maxWidth: '100vw', overflowX: 'hidden', background: 'var(--bg)' }}>
      <div
        className="get-quote-grid"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px 16px',
        }}
      >
        {/* Left — context */}
        <div className="text-center lg:text-left" style={{ width: '100%', minWidth: 0 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            Get a quote
          </p>
          <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(28px, 6vw, 48px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 20, maxWidth: 420 }}>
            Send us your brief.
          </h1>
          <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.75, marginBottom: 36 }}>
            Our producers respond within four working hours. No obligation — just a straight conversation about your project.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
            {[
              { step: '01', title: 'Share your brief', desc: 'Tell us your service, language pair, and deadline.' },
              { step: '02', title: 'We respond', desc: 'A producer reviews and replies within four hours.' },
              { step: '03', title: 'Kickoff', desc: 'Once approved, we start within 24 hours.' },
            ].map(({ step, title, desc }) => (
              <div key={step} style={{ display: 'flex', gap: 16 }}>
                <div
                  style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: 'var(--tint-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 14, fontWeight: 700, color: 'var(--blue)' }}>{step}</span>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--ink)', margin: '0 0 4px' }}>{title}</p>
                  <p style={{ fontSize: 14, color: 'var(--muted-c)', margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            {['Quality-assured', 'NDA by default', 'Reply in 4 hrs', '120+ languages'].map((badge) => (
              <span
                key={badge}
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  border: '1px solid var(--rule)',
                  fontSize: 13,
                  color: 'var(--ink)',
                  fontWeight: 500,
                }}
              >
                {badge}
              </span>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div style={{ width: '100%', minWidth: 0 }}>
          <QuoteForm />
        </div>
      </div>
    </main>
  )
}
