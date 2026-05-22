'use client'

import { useEffect, useState } from 'react'

const TRANSLATIONS = [
  { lang: 'EN', text: 'Hello, world.' },
  { lang: 'ES', text: 'Hola, mundo.' },
  { lang: 'FR', text: 'Bonjour, le monde.' },
  { lang: 'ZH', text: '你好，世界。' },
  { lang: 'HI', text: 'नमस्ते, दुनिया।' },
  { lang: 'AR', text: 'مرحبا بالعالم.', rtl: true },
  { lang: 'JA', text: 'こんにちは、世界。' },
  { lang: 'RU', text: 'Привет, мир.' },
  { lang: 'IT', text: 'Ciao, mondo.' },
  { lang: 'PT', text: 'Olá, mundo.' },
]

export default function HeroVisual() {
  const [idx, setIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setIdx((i) => (i + 1) % TRANSLATIONS.length)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  const current = TRANSLATIONS[idx]

  return (
    <div
      style={{
        background: '#ffffff',
        color: '#06184F',
        border: '1px solid #E2E6EE',
        borderRadius: 20,
        padding: '28px 28px 24px',
        width: '100%',
        maxWidth: 360,
        boxShadow: '0 24px 64px -12px rgba(6,24,79,0.15), 0 0 0 1px rgba(6,24,79,0.06)',
        position: 'relative',
      }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span
            style={{
              width: 8, height: 8, borderRadius: '50%',
              background: '#10B981',
              display: 'inline-block',
              animation: 'pulseDot 2s ease-in-out infinite',
            }}
          />
          <span style={{ fontSize: 13, fontWeight: 600, color: '#10B981' }}>Live translation</span>
        </div>
        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 12,
            color: '#5A6577',
          }}
        >
          01/10
        </span>
      </div>

      {/* Source */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#5A6577', marginBottom: 4 }}>
        SOURCE · English
      </p>
      <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 24, fontWeight: 600, color: '#06184F', letterSpacing: '-0.02em', marginBottom: 20 }}>
        Hello, world.
      </p>

      {/* Divider */}
      <div style={{ borderTop: '1px solid #E2E6EE', marginBottom: 20 }} />

      {/* Target */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: '#5A6577', marginBottom: 4 }}>
        TARGET · {current.lang}
      </p>
      <p
        style={{
          fontFamily: 'Bricolage Grotesque, system-ui',
          fontSize: 24,
          fontWeight: 600,
          color: '#06184F',
          letterSpacing: '-0.02em',
          minHeight: 36,
          direction: current.rtl ? 'rtl' : 'ltr',
          opacity: 1,
        }}
      >
        {current.text}
      </p>

      {/* Footer row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: '1px solid #E2E6EE' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}
          />
          <span style={{ fontSize: 12, color: '#5A6577' }}>Reviewed by a native linguist</span>
        </div>
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: '#F5B819',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#06184F">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
