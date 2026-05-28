import Link from 'next/link'
import {
  Languages, Mic, Mic2, Film, Captions, Globe,
  FileText, Layout, PenLine, Type, ArrowRight,
} from 'lucide-react'

const ICON_MAP = {
  Languages, Mic, Mic2, Film, Captions, Globe,
  FileText, Layout, PenLine, Type,
}

const SERVICE_COLORS = {
  translation:              '#1466DB',
  interpretation:           '#7C3AED',
  'voice-over':             '#EA580C',
  dubbing:                  '#DC2626',
  'subtitling-captioning':  '#0891B2',
  localization:             '#059669',
  transcription:            '#D97706',
  'desktop-publishing':     '#BE185D',
  'editing-proofreading':   '#4F46E5',
  typesetting:              '#0F766E',
}

export default function ServiceCard({ service, featured = false, className = '' }) {
  const Icon = ICON_MAP[service.icon] || Languages
  const color = SERVICE_COLORS[service.slug] || '#1466DB'

  if (featured) {
    return (
      <div
        className={`service-card-featured relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between ${className}`}
        style={{ background: '#06184F', color: '#fff', minHeight: 280 }}
      >
        {/* Decorative orbit rings */}
        <svg
          aria-hidden="true"
          width="220"
          height="220"
          viewBox="0 0 220 220"
          fill="none"
          style={{ position: 'absolute', bottom: -60, right: -60, opacity: 0.12 }}
        >
          <circle cx="110" cy="110" r="100" stroke="#fff" strokeWidth="1.5" strokeDasharray="6 4" />
          <circle cx="110" cy="110" r="70"  stroke="#fff" strokeWidth="1.5" strokeDasharray="4 6" />
          <circle cx="110" cy="110" r="40"  stroke="#fff" strokeWidth="1" />
        </svg>

        {/* Decorative wave arcs bottom-right */}
        <svg
          aria-hidden="true"
          width="140"
          height="80"
          viewBox="0 0 140 80"
          fill="none"
          style={{ position: 'absolute', bottom: 0, right: 0, opacity: 0.1 }}
        >
          <path d="M140 80 Q100 40 60 80" stroke="#fff" strokeWidth="2" fill="none" />
          <path d="M140 60 Q90 20 40 60" stroke="#fff" strokeWidth="2" fill="none" />
          <path d="M140 40 Q80 0 20 40" stroke="#fff" strokeWidth="2" fill="none" />
        </svg>

        <div>
          <div
            style={{
              width: 52, height: 52, borderRadius: 12,
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 20,
            }}
          >
            <Icon size={26} color="#fff" />
          </div>
          <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 28, fontWeight: 600, letterSpacing: '-0.02em', color: '#fff', marginBottom: 10 }}>
            {service.title}
          </h3>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', lineHeight: 1.65 }}>
            {service.tagline}
          </p>
        </div>

        <Link
          href={`/services/${service.slug}`}
          style={{ color: 'var(--yellow)', fontSize: 14, fontWeight: 600, textDecoration: 'none', marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    )
  }

  return (
    <div
      className={`bls-card service-card flex flex-col justify-between overflow-hidden ${className}`}
      style={{ minHeight: 200 }}
    >
      {/* Top accent bar */}
      <div style={{ height: 4, background: color, borderRadius: '16px 16px 0 0' }} />

      <div style={{ padding: '20px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <div
            style={{
              width: 52, height: 52, borderRadius: 12,
              background: color + '15',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: 16,
            }}
          >
            <Icon size={24} color={color} />
          </div>
          <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--ink)', marginBottom: 8 }}>
            {service.title}
          </h3>
          <p style={{ fontSize: 14, color: 'var(--muted-c)', lineHeight: 1.65 }}>
            {service.tagline}
          </p>
        </div>
        <Link
          href={`/services/${service.slug}`}
          style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600, textDecoration: 'none', marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6 }}
        >
          Learn more <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  )
}
