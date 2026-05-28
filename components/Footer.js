'use client'

import Link from 'next/link'
import { useState } from 'react'
import nav from '@/data/nav'

const SERVICES    = nav.find((n) => n.label === 'Services')?.children?.slice(0, 6) || []
const INDUSTRIES  = nav.find((n) => n.label === 'Industries')?.children?.slice(0, 4) || []

const LANG_REGIONS = [
  { label: 'Indian Languages',      href: '/languages/indian-languages' },
  { label: 'European Languages',    href: '/languages/european-languages' },
  { label: 'Asian Languages',       href: '/languages/asian-languages' },
  { label: 'Middle East Languages', href: '/languages/middle-east-languages' },
]

const COMPANY = [
  { label: 'About Us',         href: '/about' },
  { label: 'Why Choose Us',    href: '/about/why-choose-us' },
  { label: 'Case Studies',     href: '/case-studies' },
  { label: 'Testimonials',     href: '/testimonials' },
  { label: 'Contact',          href: '/contact' },
]

const HEADING_STYLE = {
  fontSize: 14, fontWeight: 600,
  fontFamily: 'JetBrains Mono, monospace',
  textTransform: 'uppercase', letterSpacing: '0.18em',
  color: 'rgba(255,255,255,0.4)', marginBottom: 16,
}

function FooterCol({ title, children }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="footer-accordion-col" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Header — clickable on mobile, static on desktop */}
      <button
        className="footer-col-btn"
        onClick={() => setOpen((v) => !v)}
        style={{
          width: '100%', background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 0', textAlign: 'left',
        }}
        aria-expanded={open}
      >
        <span style={HEADING_STYLE}>{title}</span>
        <svg
          className={`footer-col-chevron${open ? ' open' : ''}`}
          width="16" height="16" viewBox="0 0 24 24"
          fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {/* Content — always visible on desktop via CSS, toggled on mobile */}
      <div
        className="footer-col-content"
        style={{
          overflow: 'hidden',
          maxHeight: open ? 600 : 0,
          transition: 'max-height 0.3s ease',
          paddingBottom: open ? 20 : 0,
        }}
      >
        {children}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer style={{ background: '#02091F', color: '#fff' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px 40px' }}>

        {/* Main columns — auto-fit desktop, single col mobile */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 40,
            marginBottom: 48,
            alignItems: 'start',
          }}
        >
          {/* Brand column — always visible */}
          <div>
            <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 10, textDecoration: 'none', marginBottom: 16 }}>
              <img
                src="/assets/logo-dark.png"
                alt="Bright Language Solutions"
                style={{ height: 80, width: 'auto', objectFit: 'contain', maxWidth: 220, mixBlendMode: 'lighten', padding: '4px 0', marginBottom: 16 }}
              />
            </Link>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7, marginBottom: 20, maxWidth: 220 }}>
              ISO 17100 &amp; 9001 certified language services in 120+ languages. Engineered by linguists, reviewed by humans.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 20 }}>
              {['ISO 17100', 'ISO 9001'].map((badge) => (
                <span
                  key={badge}
                  style={{
                    display: 'inline-block', padding: '4px 10px', borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.15)', fontSize: 12,
                    color: 'rgba(255,255,255,0.6)', fontFamily: 'JetBrains Mono, monospace',
                    textTransform: 'uppercase', letterSpacing: '0.14em', width: 'fit-content',
                  }}
                >
                  {badge}
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              {['LinkedIn', 'Twitter', 'Instagram'].map((s) => (
                <a
                  key={s} href="#" aria-label={s}
                  style={{
                    width: 36, height: 36, borderRadius: 999,
                    border: '1px solid rgba(255,255,255,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
                    fontSize: 14, fontWeight: 700, transition: 'border-color 0.2s',
                  }}
                >
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Services — accordion on mobile */}
          <FooterCol title="Services">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} style={{ fontSize: 14, lineHeight: 2, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCol>

          {/* Languages — accordion on mobile */}
          <FooterCol title="Languages">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {LANG_REGIONS.map((r) => (
                <li key={r.href}>
                  <Link href={r.href} style={{ fontSize: 14, lineHeight: 2, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                    {r.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCol>

          {/* Industries + Company — accordion on mobile */}
          <FooterCol title="Industries & Company">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {INDUSTRIES.map((i) => (
                <li key={i.href}>
                  <Link href={i.href} style={{ fontSize: 14, lineHeight: 2, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p style={{ ...HEADING_STYLE, marginBottom: 12 }}>Company</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {COMPANY.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} style={{ fontSize: 14, lineHeight: 2, color: 'rgba(255,255,255,0.65)', textDecoration: 'none' }}>
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterCol>
        </div>

        {/* Newsletter strip */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.08)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            padding: '28px 0', marginBottom: 28,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 16, flexWrap: 'wrap',
          }}
          className="footer-newsletter-row"
        >
          <p style={{ fontSize: 15, fontWeight: 600, color: '#fff', margin: 0 }}>
            Industry insights, delivered monthly.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            style={{ display: 'flex', gap: 8, flexShrink: 0 }}
            className="footer-newsletter-form"
          >
            <input
              type="email"
              placeholder="you@company.com"
              style={{
                padding: '10px 16px', borderRadius: 999,
                border: '1px solid rgba(255,255,255,0.15)',
                background: 'rgba(255,255,255,0.06)', color: '#fff',
                fontSize: 14, outline: 'none', width: 220,
              }}
            />
            <button type="submit" className="btn accent sm" style={{ whiteSpace: 'nowrap' }}>
              Subscribe →
            </button>
          </form>
        </div>

        {/* Bottom bar */}
        <div
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}
          className="footer-bottom-bar"
        >
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', margin: 0 }}>
            &copy; 2026 Bright Language Solutions. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 20 }}>
            {[
              { label: 'Privacy',      href: '/privacy' },
              { label: 'Terms',        href: '/terms' },
              { label: 'Vendor login', href: '/admin/login' },
            ].map((l) => (
              <Link key={l.href} href={l.href} style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
