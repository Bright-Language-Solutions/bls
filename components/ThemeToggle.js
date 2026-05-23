'use client'

import { useEffect, useState } from 'react'
import { Sun, Moon, MoonStar } from 'lucide-react'

export default function ThemeToggle({ size }) {
  const [dark, setDark] = useState(false)
  const isMobile = size === 'mobile'

  useEffect(() => {
    const saved = localStorage.getItem('bls-theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = saved === 'dark' || (!saved && prefersDark)
    setDark(isDark)
    applyTheme(isDark)
  }, [])

  function applyTheme(isDark) {
    const root = document.documentElement
    root.classList.toggle('dark', isDark)
    root.setAttribute('data-theme', isDark ? 'dark' : 'light')
    localStorage.setItem('bls-theme', isDark ? 'dark' : 'light')
  }

  function toggle() {
    const next = !dark
    setDark(next)
    applyTheme(next)
  }

  if (isMobile) {
    return (
      <button
        onClick={toggle}
        aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
        style={{
          width: 88,
          height: 44,
          borderRadius: 999,
          background: dark ? '#0D1F4A' : '#F3F6FC',
          border: dark ? '2px solid #1F2D55' : '2px solid #E2E6EE',
          boxShadow: dark ? '0 0 12px rgba(20,102,219,0.3)' : 'none',
          position: 'relative',
          cursor: 'pointer',
          flexShrink: 0,
          padding: 0,
          transition: 'background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease',
        }}
      >
        {/* Left icon — opposite mode */}
        <span
          style={{
            position: 'absolute',
            left: 10,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            pointerEvents: 'none',
          }}
        >
          {dark ? <Sun size={16} color="#95A0BD" /> : <Moon size={16} color="#9BA8BB" />}
        </span>

        {/* Knob — always on right */}
        <span
          style={{
            position: 'absolute',
            top: 4,
            right: 4,
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: dark ? '#1466DB' : '#06184F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.25s ease',
            pointerEvents: 'none',
          }}
        >
          {dark ? <MoonStar size={16} color="#ffffff" /> : <Sun size={16} color="#ffffff" />}
        </span>
      </button>
    )
  }

  // Default (desktop) — unchanged
  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: 56,
        height: 30,
        borderRadius: 999,
        border: '1px solid var(--rule)',
        background: 'transparent',
        position: 'relative',
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
      }}
    >
      <span
        style={{
          position: 'absolute',
          top: 2,
          left: dark ? 26 : 2,
          width: 24,
          height: 24,
          borderRadius: '50%',
          background: dark ? 'var(--yellow)' : 'var(--navy)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'left 0.25s cubic-bezier(.6,.2,.2,1)',
        }}
      >
        {dark ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#06184F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <line x1="12" y1="2" x2="12" y2="4" />
            <line x1="12" y1="20" x2="12" y2="22" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="2" y1="12" x2="4" y2="12" />
            <line x1="20" y1="12" x2="22" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  )
}
