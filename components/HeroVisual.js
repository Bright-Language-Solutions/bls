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
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setIdx((i) => (i + 1) % TRANSLATIONS.length)
        setVisible(true)
      }, 300)
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  const current = TRANSLATIONS[idx]

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid var(--rule)',
        borderRadius: 20,
        padding: '28px 28px 24px',
        width: '100%',
        maxWidth: 360,
        boxShadow: '0 24px 48px -12px rgba(6,24,79,.10)',
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
            color: 'var(--muted-c)',
          }}
        >
          01/10
        </span>
      </div>

      {/* Source */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', marginBottom: 4 }}>
        SOURCE · English
      </p>
      <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 24, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
        Hello, world.
      </p>

      {/* Divider */}
      <div style={{ borderTop: '1px solid var(--rule)', marginBottom: 20 }} />

      {/* Target */}
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', marginBottom: 4 }}>
        TARGET · {current.lang}
      </p>
      <p
        style={{
          fontFamily: 'Bricolage Grotesque, system-ui',
          fontSize: 24,
          fontWeight: 600,
          color: 'var(--ink)',
          letterSpacing: '-0.02em',
          minHeight: 36,
          direction: current.rtl ? 'rtl' : 'ltr',
          opacity: visible ? 1 : 0,
          transform: visible ? 'none' : 'translateY(8px)',
          transition: 'opacity 0.3s ease, transform 0.3s ease',
        }}
      >
        {current.text}
      </p>

      {/* Footer row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span
            style={{ width: 8, height: 8, borderRadius: '50%', background: '#10B981', display: 'inline-block' }}
          />
          <span style={{ fontSize: 12, color: 'var(--muted-c)' }}>Reviewed by a native linguist</span>
        </div>
        <div
          style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--yellow)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="var(--navy)">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>
    </div>
  )
}
