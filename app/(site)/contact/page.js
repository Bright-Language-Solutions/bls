export const metadata = {
  title: 'Contact Us',
  description: 'Contact Bright Language Solutions — email, phone, and our New Delhi office. Get in touch and we will reply within four hours.',
  openGraph: {
    title: 'Contact Us | Bright Language Solutions',
    description: 'Contact Bright Language Solutions — email, phone, and our New Delhi office. Get in touch and we will reply within four hours.',
    type: 'website',
    url: '/contact',
  },
}

export default function ContactPage() {
  return (
    <div style={{ maxWidth: 1280, margin: '0 auto', padding: '32px 16px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Contact
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 480 }}>
        Let&rsquo;s talk about your project.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 480, marginBottom: 40 }}>
        Our producers are online 24/7. Fill in the form and we&rsquo;ll reply by end of business.
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: 32,
          width: '100%',
          boxSizing: 'border-box',
          padding: '32px 16px',
          maxWidth: 1280,
          margin: '0 auto',
        }}
        className="contact-grid"
      >
        {/* Contact info */}
        <div style={{ width: '100%', minWidth: 0 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28, marginBottom: 40 }}>
            {[
              { label: 'Email', value: 'info@brightlanguagesolutions.com', href: 'mailto:info@brightlanguagesolutions.com' },
              { label: 'Phone', value: '+91 83684 40255', href: 'tel:+918368440255' },
              { label: 'WhatsApp', value: '+91 83684 40255', href: 'https://api.whatsapp.com/send?phone=918368440255&text=Hello%20Bright%20Language%20Solutions' },
              { label: 'Address (HQ)', value: 'Plot No. 153, 1st Floor, Block-D1, Mansa Ram Park, Uttam Nagar, New Delhi - 110059' },
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
        <div style={{ width: '100%', minWidth: 0 }}>
          <form
            action={`mailto:info@brightlanguagesolutions.com`}
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
