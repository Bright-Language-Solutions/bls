'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import {
  ChevronDown, ChevronRight, ArrowRight,
  Menu, X,
  Phone, Mail, Clock,
  Building2, Layers, Globe, Briefcase,
  BookOpen, Star,
  FileText, Headphones, Mic, Film, AlignLeft,
  ClipboardList, Monitor, PenLine, AlignJustify,
  MapPin, Scale, Activity, Cpu, ShoppingBag, Gamepad2, GraduationCap,
} from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import nav from '@/data/nav'

const NAV_ICONS = {
  About: Building2,
  Services: Layers,
  Languages: Globe,
  Industries: Briefcase,
  Contact: Mail,
}

const CHILD_ICONS = {
  'Company Profile': BookOpen,
  'Why Choose Us': Star,
  'Industries We Serve': Briefcase,
  Translation: FileText,
  Interpretation: Headphones,
  'Voice-Over': Mic,
  Dubbing: Film,
  'Subtitling & Captioning': AlignLeft,
  Localization: Globe,
  Transcription: ClipboardList,
  'Desktop Publishing': Monitor,
  'Editing & Proofreading': PenLine,
  Typesetting: AlignJustify,
  'Indian Languages': MapPin,
  'European Languages': Globe,
  'Asian Languages': Globe,
  'Middle East Languages': Globe,
  Legal: Scale,
  'Medical & Healthcare': Activity,
  'Technical & Engineering': Cpu,
  'E-Commerce & Retail': ShoppingBag,
  'Gaming & Interactive Media': Gamepad2,
  'Education & E-Learning': GraduationCap,
  'Media & Entertainment': Film,
}

const CHILD_DESC = {
  'Company Profile': 'Our story & credentials',
  'Why Choose Us': 'What sets us apart',
  'Industries We Serve': 'Sectors we specialise in',
  Translation: 'Accurate human translation',
  Interpretation: 'Live & remote interpreting',
  'Voice-Over': 'Professional voice talent',
  Dubbing: 'Lip-sync replacement audio',
  'Subtitling & Captioning': 'SRT, VTT & burned-in',
  Localization: 'Cultural adaptation at scale',
  Transcription: 'Audio & video to text',
  'Desktop Publishing': 'Multilingual typeset layouts',
  'Editing & Proofreading': 'Quality assurance & polish',
  Typesetting: 'RTL, CJK & complex scripts',
  'Indian Languages': 'Hindi, Tamil, Marathi & more',
  'European Languages': 'French, German, Spanish & more',
  'Asian Languages': 'Japanese, Chinese, Korean & more',
  'Middle East Languages': 'Arabic, Persian, Hebrew & more',
  Legal: 'Contracts, courts & compliance',
  'Medical & Healthcare': 'Clinical & pharma content',
  'Technical & Engineering': 'Manuals & technical docs',
  'E-Commerce & Retail': 'Product & marketing copy',
  'Gaming & Interactive Media': 'UI, narrative & localisation',
  'Education & E-Learning': 'Courses & training materials',
  'Media & Entertainment': 'Scripts, subs & AV content',
}

const DROPDOWN_LABELS = ['About', 'Services', 'Languages', 'Industries']

/* ─── Desktop dropdown panel ────────────────────────────────── */
function DropdownPanel({ item, isDark }) {
  const isServices = item.label === 'Services'
  const width = item.label === 'Services' ? 560
    : item.label === 'Languages' ? 280
    : item.label === 'Industries' ? 300
    : 260
  return (
    <div
      style={{
        width,
        minWidth: width,
        boxSizing: 'border-box',
        overflow: 'hidden',
        padding: '6px',
        background: isDark ? '#0D1F4A' : '#ffffff',
        border: `1px solid ${isDark ? '#1F2D55' : '#E2E6EE'}`,
        borderRadius: 14,
        boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 10px 10px',
          marginBottom: 6,
          borderBottom: isDark ? '1px solid #1F2D55' : '1px solid #E2E6EE',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: isDark ? '#95A0BD' : '#5A6577',
          }}
        >
          {item.label}
        </span>
        <Link
          href={item.href}
          style={{
            fontSize: 12,
            color: 'var(--blue)',
            fontWeight: 600,
            textDecoration: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: 3,
          }}
        >
          View all <ChevronRight size={12} />
        </Link>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isServices ? '1fr 1fr' : '1fr',
          gap: 2,
        }}
      >
        {item.children.map((child) => {
          const Icon = CHILD_ICONS[child.label]
          const desc = CHILD_DESC[child.label]
          return (
            <Link key={child.href} href={child.href} style={{ textDecoration: 'none' }}>
              <div className="bls-dd-item" style={{ padding: '10px 16px', width: '100%', boxSizing: 'border-box' }}>
                <span className="bls-dd-icon" style={{ width: 28, height: 28, flexShrink: 0 }}>
                  {Icon && <Icon size={15} />}
                </span>
                <span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 13,
                      fontWeight: 500,
                      color: isDark ? '#F4F7FE' : '#06184F',
                      lineHeight: 1.3,
                    }}
                  >
                    {child.label}
                  </span>
                  {desc && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: 11,
                        color: isDark ? '#95A0BD' : '#5A6577',
                        marginTop: 2,
                        lineHeight: 1.4,
                      }}
                    >
                      {desc}
                    </span>
                  )}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/* ─── Desktop nav item with hover dropdown ───────────────────── */
function NavItem({ item, isDark }) {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)
  const Icon = NAV_ICONS[item.label]
  const linkColor = isDark ? '#F4F7FE' : '#06184F'
  const hoverBg = isDark ? 'rgba(255,255,255,0.08)' : '#F3F6FC'

  function enter() {
    clearTimeout(timer.current)
    setOpen(true)
  }
  function leave() {
    timer.current = setTimeout(() => setOpen(false), 120)
  }

  if (!item.children) {
    return (
      <Link
        href={item.href}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 15,
          fontWeight: 500,
          color: linkColor,
          textDecoration: 'none',
          padding: '7px 12px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
      >
        {Icon && <Icon size={15} style={{ opacity: 0.65, flexShrink: 0 }} />}
        {item.label}
      </Link>
    )
  }

  return (
    <div style={{ position: 'relative' }} onMouseEnter={enter} onMouseLeave={leave}>
      <button
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          fontSize: 15,
          fontWeight: 500,
          color: linkColor,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '7px 12px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
          transition: 'background 0.15s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'none')}
      >
        {Icon && <Icon size={15} style={{ opacity: 0.65, flexShrink: 0 }} />}
        {item.label}
        <ChevronDown
          size={14}
          style={{
            color: isDark ? '#95A0BD' : '#5A6577',
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: ['Industries', 'Languages'].includes(item.label) ? 'auto' : 0,
          right: ['Industries', 'Languages'].includes(item.label) ? 0 : 'auto',
          marginTop: 8,
          zIndex: 50,
          overflow: 'visible',
        }}>
          <DropdownPanel item={item} isDark={isDark} />
        </div>
      )}
    </div>
  )
}

/* ─── Mobile accordion item ──────────────────────────────────── */
function MobileItem({ item, onClose, expanded, onToggle }) {
  const Icon = NAV_ICONS[item.label]
  const isExpanded = expanded === item.label

  const iconPill = {
    width: 32,
    height: 32,
    borderRadius: 999,
    background: 'var(--tint)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  }

  if (!item.children) {
    return (
      <div style={{ borderBottom: '1px solid var(--rule)' }}>
        <Link
          href={item.href}
          onClick={onClose}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            padding: '14px 20px',
            minHeight: 52,
            fontSize: 16,
            fontWeight: 500,
            color: 'var(--ink)',
            textDecoration: 'none',
          }}
        >
          <span style={iconPill}>
            {Icon && <Icon size={18} style={{ color: 'var(--blue)' }} />}
          </span>
          {item.label}
        </Link>
      </div>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid var(--rule)' }}>
      <button
        onClick={() => onToggle(item.label)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '14px 20px',
          minHeight: 52,
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--ink)',
          textAlign: 'left',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 16, fontWeight: 500 }}>
          <span style={iconPill}>
            {Icon && <Icon size={18} style={{ color: 'var(--blue)' }} />}
          </span>
          {item.label}
        </span>
        <ChevronDown
          size={16}
          style={{
            opacity: 0.5,
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: isExpanded ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      {isExpanded && (
        <div style={{ paddingBottom: 4 }}>
          {item.children.map((child) => {
            const CIcon = CHILD_ICONS[child.label]
            return (
              <Link
                key={child.href}
                href={child.href}
                onClick={onClose}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '10px 20px 10px 56px',
                  fontSize: 14,
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  borderBottom: '1px solid var(--rule)',
                }}
              >
                {CIcon && <CIcon size={13} />}
                {child.label}
              </Link>
            )
          })}
          <Link
            href={item.href}
            onClick={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 5,
              padding: '10px 20px 10px 56px',
              fontSize: 13,
              color: 'var(--blue)',
              fontWeight: 600,
              textDecoration: 'none',
            }}
          >
            View all <ChevronRight size={12} />
          </Link>
        </div>
      )}
    </div>
  )
}

/* ─── Main Navbar ────────────────────────────────────────────── */
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileExpanded, setMobileExpanded] = useState(null)
  const [scrolled, setScrolled] = useState(false)
  const [isDark, setIsDark] = useState(false)

  const pathname = typeof window !== 'undefined' ? window.location.pathname : '/'
  const isHomePage = pathname === '/'

  useEffect(() => {
    const checkScroll = () => {
      setScrolled(window.scrollY > 80)
    }
    checkScroll()
    window.addEventListener('scroll', checkScroll, { passive: true })

    const checkDark = () =>
      setIsDark(
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark'
      )
    checkDark()
    const observer = new MutationObserver(checkDark)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    })

    return () => {
      window.removeEventListener('scroll', checkScroll)
      observer.disconnect()
    }
  }, [])

  const toggleAccordion = (label) =>
    setMobileExpanded((prev) => (prev === label ? null : label))

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const dropdownItems = nav.filter((i) => DROPDOWN_LABELS.includes(i.label))
  const contactItem = nav.find((i) => i.label === 'Contact')
  const mobileItems = nav.filter((i) => i.label !== 'Home' && i.label !== 'Get Quote')

  return (
    <>
      {/* Utility bar — hidden on mobile */}
      <div className="hidden md:block" style={{ background: 'var(--navy)', color: '#fff', fontSize: 13 }}>
        <div
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '7px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 8,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <a
              href="tel:+918368440255"
              style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Phone size={12} />
              +91 83684 40255
            </a>
            <a
              href="mailto:info@brightlanguagesolutions.com"
              style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Mail size={12} />
              info@brightlanguagesolutions.com
            </a>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: '#10B981',
                display: 'inline-block',
                flexShrink: 0,
                animation: 'pulseDot 2s ease-in-out infinite',
              }}
            />
            <span
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.7)',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              <Clock size={11} />
              Live · 24/7 Support
            </span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        className={`bls-navbar ${scrolled ? (isDark ? 'scrolled-dark' : 'scrolled-light') : ''}`}
        style={{
          backgroundColor: (scrolled || !isHomePage)
            ? (isDark ? '#06112E' : '#ffffff')
            : 'transparent',
          borderBottom: (scrolled || !isHomePage)
            ? `1px solid ${isDark ? '#1F2D55' : '#E2E6EE'}`
            : 'none',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 40,
          width: '100%',
          transition: 'background-color 0.3s ease, border-color 0.3s ease',
        }}
      >
        {/* ── MOBILE NAV (< 1024px) ── */}
        <div
          className="flex lg:hidden"
          style={{
            width: '100%',
            maxWidth: '100vw',
            overflowX: 'hidden',
            boxSizing: 'border-box',
            margin: '0 auto',
            height: 64,
            padding: '0 12px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 8,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <img
              src={scrolled && !isDark ? '/assets/logo-light.jpg' : '/assets/logo-dark.png'}
              alt="Bright Language Solutions"
              style={{ height: 36, width: 'auto', objectFit: 'contain', maxWidth: 120 }}
            />
          </Link>

          {/* Right: ThemeToggle | Get a Quote | Hamburger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <ThemeToggle size="mobile" />

            <Link
              href="/get-quote"
              style={{
                background: 'linear-gradient(135deg, #F5B819, #E8A800)',
                color: '#06184F',
                fontSize: 13,
                fontWeight: 700,
                padding: '8px 14px',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                flexShrink: 0,
                boxShadow: isDark ? '0 4px 20px rgba(245,184,25,0.5)' : '0 4px 16px rgba(245,184,25,0.4)',
                textDecoration: 'none',
              }}
            >
              Get a Quote →
            </Link>

            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              style={{
                width: 40,
                height: 40,
                borderRadius: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDark ? '#0D1F4A' : '#F3F6FC',
                border: isDark ? '1.5px solid #1466DB' : '1.5px solid #E2E6EE',
                boxShadow: isDark ? '0 0 8px rgba(20,102,219,0.2)' : 'none',
                cursor: 'pointer',
                color: 'var(--ink)',
                flexShrink: 0,
              }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* ── DESKTOP NAV (≥ 1024px) ── */}
        <div
          className="hidden lg:flex"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            height: 68,
            padding: '0 16px',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={scrolled && !isDark ? '/assets/logo-light.jpg' : '/assets/logo-dark.png'}
                alt="Bright Language Solutions"
                className="bls-nav-logo"
                style={{ height: 90, width: 'auto', objectFit: 'contain', maxWidth: 280 }}
              />
            </div>
          </Link>

          {/* Nav links */}
          <div
            className="flex items-center flex-1 justify-center"
            style={{ gap: 2 }}
          >
            {dropdownItems.map((item) => (
              <NavItem key={item.label} item={item} isDark={isDark} />
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {contactItem && (
              <Link
                href="/contact"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 500,
                  color: isDark ? '#F4F7FE' : '#06184F',
                  textDecoration: 'none',
                  padding: '7px 12px',
                  borderRadius: 8,
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.08)' : '#F3F6FC')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <Mail size={15} style={{ opacity: 0.65, flexShrink: 0 }} />
                Contact Us
              </Link>
            )}

            <div style={{ width: 1, height: 20, background: 'var(--rule)', margin: '0 2px' }} />

            <div style={{ flexShrink: 0, transform: 'scale(0.85)' }}>
              <ThemeToggle />
            </div>

            <Link
              href="/get-quote"
              className="btn accent sm"
              style={{ gap: 6 }}
            >
              Get a Quote
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile drawer */}
      {mobileOpen && (
        <>
          {/* Backdrop overlay */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 60,
              background: 'rgba(0,0,0,0.5)',
            }}
            onClick={() => setMobileOpen(false)}
          />

          {/* Drawer panel */}
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              zIndex: 61,
              background: 'var(--bg)',
              borderLeft: '1px solid var(--rule)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Drawer header — 56px */}
            <div
              style={{
                height: 56,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 20px',
                borderBottom: '1px solid var(--rule)',
                flexShrink: 0,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <img src="/assets/mark.svg"      alt="" className="logo-light" style={{ height: 32 }} />
                <img src="/assets/mark-dark.svg" alt="" className="logo-dark"  style={{ height: 32 }} />
                <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--ink)' }}>Menu</span>
              </div>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close navigation"
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--ink)',
                  padding: 8,
                  borderRadius: 8,
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={24} />
              </button>
            </div>

            {/* Drawer body — scrollable */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {mobileItems.map((item) => (
                <MobileItem
                  key={item.label}
                  item={item}
                  onClose={() => setMobileOpen(false)}
                  expanded={mobileExpanded}
                  onToggle={toggleAccordion}
                />
              ))}
            </div>

            {/* Drawer footer — pinned */}
            <div style={{ padding: '16px 20px 24px', flexShrink: 0 }}>
              <Link
                href="/get-quote"
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '16px 0',
                  background: '#F5B819',
                  color: '#06184F',
                  fontSize: 16,
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderRadius: 999,
                }}
              >
                Get a Quote →
              </Link>
              <p
                style={{
                  textAlign: 'center',
                  fontSize: 12,
                  color: 'var(--muted)',
                  marginTop: 8,
                  marginBottom: 0,
                }}
              >
                ⚡ Reply in 4 hrs · NDA by default
              </p>
            </div>
          </div>
        </>
      )}
    </>
  )
}
