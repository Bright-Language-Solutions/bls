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
function DropdownPanel({ item }) {
  const isServices = item.label === 'Services'
  return (
    <div
      style={{
        width: isServices ? 580 : 300,
        padding: '10px 8px 12px',
        background: 'var(--bg)',
        border: '1px solid var(--rule)',
        borderRadius: 12,
        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '4px 10px 10px',
          marginBottom: 6,
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--muted-c)',
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
              <div className="bls-dd-item">
                <span className="bls-dd-icon">
                  {Icon && <Icon size={15} />}
                </span>
                <span>
                  <span
                    style={{
                      display: 'block',
                      fontSize: 14,
                      fontWeight: 500,
                      color: 'var(--ink)',
                      lineHeight: 1.3,
                    }}
                  >
                    {child.label}
                  </span>
                  {desc && (
                    <span
                      style={{
                        display: 'block',
                        fontSize: 12,
                        color: 'var(--muted-c)',
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
function NavItem({ item }) {
  const [open, setOpen] = useState(false)
  const timer = useRef(null)
  const Icon = NAV_ICONS[item.label]

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
          color: 'var(--ink)',
          textDecoration: 'none',
          padding: '7px 12px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
        }}
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
          color: 'var(--ink)',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '7px 12px',
          borderRadius: 8,
          whiteSpace: 'nowrap',
        }}
      >
        {Icon && <Icon size={15} style={{ opacity: 0.65, flexShrink: 0 }} />}
        {item.label}
        <ChevronDown
          size={14}
          style={{
            opacity: 0.5,
            flexShrink: 0,
            transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'none',
          }}
        />
      </button>

      {open && (
        <div style={{ position: 'absolute', top: 'calc(100% + 4px)', left: 0, zIndex: 100 }}>
          <DropdownPanel item={item} />
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
              href="tel:+919876543210"
              style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Phone size={12} />
              +91 98765 43210
            </a>
            <a
              href="mailto:hello@brightlanguage.in"
              style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <Mail size={12} />
              hello@brightlanguage.in
            </a>
            <span
              style={{
                fontSize: 12,
                color: 'rgba(255,255,255,0.45)',
                display: 'flex',
                alignItems: 'center',
                gap: 5,
              }}
            >
              <span
                style={{
                  width: 5,
                  height: 5,
                  borderRadius: '50%',
                  background: '#F5B819',
                  display: 'inline-block',
                  flexShrink: 0,
                }}
              />
              ISO 17100 · ISO 9001 Certified
            </span>
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
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          background: 'color-mix(in srgb, var(--bg) 94%, transparent)',
          borderBottom: '1px solid var(--rule)',
          boxShadow: '0 1px 2px rgba(0,0,0,0.06), 0 4px 24px rgba(0,0,0,0.04)',
        }}
      >
        <div
          className="h-14 md:h-[68px]"
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '0 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              flexShrink: 0,
            }}
          >
            <img src="/assets/mark.svg"      alt="" className="logo-light" style={{ height: 36 }} />
            <img src="/assets/mark-dark.svg" alt="" className="logo-dark"  style={{ height: 36 }} />

            {/* Mobile: text label */}
            <span
              className="md:hidden"
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: 'var(--ink)',
                lineHeight: 1.25,
                letterSpacing: '-0.01em',
              }}
            >
              Bright<br />Language
            </span>

            {/* Desktop: wordmark SVG */}
            <span className="hidden md:flex items-center" style={{ gap: 0 }}>
              <img src="/assets/wordmark.svg"      alt="Bright Language Solutions" className="logo-light" style={{ height: 21 }} />
              <img src="/assets/wordmark-dark.svg" alt="Bright Language Solutions" className="logo-dark"  style={{ height: 21 }} />
            </span>
          </Link>

          {/* Desktop nav */}
          <div
            className="hidden lg:flex items-center flex-1 justify-center"
            style={{ gap: 2 }}
          >
            {dropdownItems.map((item) => (
              <NavItem key={item.label} item={item} />
            ))}
          </div>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            {contactItem && (
              <Link
                href="/contact"
                className="hidden lg:flex"
                style={{
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 15,
                  fontWeight: 500,
                  color: 'var(--ink)',
                  textDecoration: 'none',
                  padding: '7px 12px',
                  borderRadius: 8,
                  transition: 'background 0.15s',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--tint)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <Mail size={15} style={{ opacity: 0.65, flexShrink: 0 }} />
                Contact Us
              </Link>
            )}

            <div
              className="hidden lg:block"
              style={{ width: 1, height: 20, background: 'var(--rule)', margin: '0 2px' }}
            />

            <ThemeToggle />

            {/* "Get a Quote" — hidden on mobile */}
            <Link
              href="/get-quote"
              className="btn accent sm hidden md:inline-flex"
              style={{ gap: 6 }}
            >
              Get a Quote
              <ArrowRight size={14} />
            </Link>

            {/* Mobile hamburger */}
            <button
              aria-label="Open navigation"
              onClick={() => setMobileOpen(true)}
              className="lg:hidden"
              style={{
                background: 'transparent',
                border: '1px solid var(--rule)',
                borderRadius: 8,
                padding: 8,
                cursor: 'pointer',
                color: 'var(--ink)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Menu size={22} />
            </button>
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
