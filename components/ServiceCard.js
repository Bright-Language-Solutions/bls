import Link from 'next/link'
import {
  Languages, Mic, Mic2, Film, Captions, Globe,
  FileText, Layout, PenLine, Type,
} from 'lucide-react'

const ICON_MAP = {
  Languages, Mic, Mic2, Film, Captions, Globe,
  FileText, Layout, PenLine, Type,
}

const SERVICE_COLORS = {
  translation:         '#1466DB',
  interpretation:      '#10B981',
  'voice-over':        '#F5B819',
  dubbing:             '#8B5CF6',
  'subtitling-captioning': '#0E7C66',
  localization:        '#1466DB',
  transcription:       '#06184F',
  'desktop-publishing':'#D89E0B',
  'editing-proofreading':'#10B981',
  typesetting:         '#0E51B4',
}

export default function ServiceCard({ service, featured = false, className = '' }) {
  const Icon = ICON_MAP[service.icon] || Languages
  const color = SERVICE_COLORS[service.slug] || '#1466DB'

  if (featured) {
    return (
      <div
        className={`relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between ${className}`}
        style={{ background: 'var(--navy)', color: '#fff', minHeight: 260 }}
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
          style={{ color: 'var(--yellow)', fontSize: 14, fontWeight: 600, textDecoration: 'none', marginTop: 24, display: 'inline-flex', alignItems: 'center', gap: 4 }}
        >
          Learn more →
        </Link>
      </div>
    )
  }

  return (
    <div
      className={`bls-card p-6 flex flex-col justify-between ${className}`}
      style={{ minHeight: 200 }}
    >
      <div>
        <div
          style={{
            width: 52, height: 52, borderRadius: 12,
            background: color + '14',
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
        style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600, textDecoration: 'none', marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 4 }}
      >
        Learn more →
      </Link>
    </div>
  )
}
