export const metadata = {
  title: 'Contact Us',
  description: 'Contact Bright Language Solutions — email, phone, and office locations in Mumbai and London. Get in touch and we will reply within four hours.',
  openGraph: {
    title: 'Contact Us | Bright Language Solutions',
    description: 'Contact Bright Language Solutions — email, phone, and office locations in Mumbai and London. Get in touch and we will reply within four hours.',
    type: 'website',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Contact
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 480 }}>
        Let&rsquo;s talk about your project.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 480, marginBottom: 56 }}>
        Our producers are online 24/7. Fill in the form and we&rsquo;ll reply by end of business.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64 }}>
        {/* Contact info */}
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 40 }}>
            {[
              { label: 'Email', value: 'hello@brightlanguage.in', href: 'mailto:hello@brightlanguage.in' },
              { label: 'Phone', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { label: 'Mumbai (HQ)', value: 'Level 8, One BKC, Bandra Kurla Complex, Mumbai 400051' },
              { label: 'London', value: '86-90 Paul Street, London EC2A 4NE' },
              { label: 'Hours', value: '24/7 producer cover for urgent briefs' },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', marginBottom: 4 }}>
                  {label}
                </p>
                {href ? (
                  <a href={href} style={{ fontSize: 16, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none' }}>{value}</a>
                ) : (
                  <p style={{ fontSize: 15, color: 'var(--ink)', margin: 0, lineHeight: 1.6 }}>{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div>
          <form
            action={`mailto:hello@brightlanguage.in`}
            method="get"
            encType="text/plain"
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label style={{ fontSize: 13, color: 'var(--muted-c)', display: 'block', marginBottom: 6 }}>Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your name"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--rule)', fontSize: 14, color: 'var(--ink)', background: 'var(--bg)', outline: 'none', boxSizing: 'border-box', fontFamily: 'Manrope, system-ui' }}
                />
              </div>
              <div>
                <label style={{ fontSize: 13, color: 'var(--muted-c)', display: 'block', marginBottom: 6 }}>Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="you@company.com"
                  style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--rule)', fontSize: 14, color: 'var(--ink)', background: 'var(--bg)', outline: 'none', boxSizing: 'border-box', fontFamily: 'Manrope, system-ui' }}
                />
              </div>
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted-c)', display: 'block', marginBottom: 6 }}>Subject</label>
              <input
                type="text"
                name="subject"
                placeholder="Project enquiry"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--rule)', fontSize: 14, color: 'var(--ink)', background: 'var(--bg)', outline: 'none', boxSizing: 'border-box', fontFamily: 'Manrope, system-ui' }}
              />
            </div>
            <div>
              <label style={{ fontSize: 13, color: 'var(--muted-c)', display: 'block', marginBottom: 6 }}>Message</label>
              <textarea
                name="body"
                rows={5}
                placeholder="Tell us about your project…"
                style={{ width: '100%', padding: '12px 14px', borderRadius: 10, border: '1px solid var(--rule)', fontSize: 14, color: 'var(--ink)', background: 'var(--bg)', outline: 'none', resize: 'vertical', fontFamily: 'Manrope, system-ui', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" className="btn accent" style={{ width: '100%', justifyContent: 'center' }}>
              Send Message →
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
