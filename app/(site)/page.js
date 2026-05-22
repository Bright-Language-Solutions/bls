import Link from 'next/link'
import { Clock, Shield, Users, MessageSquare } from 'lucide-react'
import HeroVisual from '@/components/HeroVisual'
import ServiceCard from '@/components/ServiceCard'
import LanguageGrid from '@/components/LanguageGrid'
import TestimonialCard from '@/components/TestimonialCard'
import CaseStudyCard from '@/components/CaseStudyCard'
import QuoteForm from '@/components/QuoteForm'
import services from '@/data/services'
import industries from '@/data/industries'
import languages from '@/data/languages'

export const metadata = {
  title: 'Bright Language Solutions | ISO-Certified Translation & Localisation',
  description:
    'ISO-certified translation, localisation, voice-over, and interpretation in 120+ languages. Quote in 4 hours, kickoff in 24.',
  openGraph: {
    title: 'Bright Language Solutions | ISO-Certified Translation & Localisation',
    description: 'ISO-certified translation, localisation, voice-over, and interpretation in 120+ languages. Quote in 4 hours, kickoff in 24.',
    type: 'website',
    url: '/',
  },
}

const CLIENT_LOGOS = [
  'Lumen OS', 'Vesper Health', 'Studio Aurelia', 'Houseplant', 'Mercato',
  'Northwind', 'Atlas Mobility', 'Kestrel', 'Junglee', 'Robosoft', 'Pegasystem', 'TVS Motor',
]

const LANGUAGE_REGIONS = [
  { key: 'indian',     name: 'Indian Languages',     slug: 'indian-languages',     accent: '#F5B819' },
  { key: 'european',   name: 'European Languages',    slug: 'european-languages',   accent: '#1466DB' },
  { key: 'asian',      name: 'Asian Languages',       slug: 'asian-languages',      accent: '#0E7C66' },
  { key: 'middleEast', name: 'Middle East Languages', slug: 'middle-east-languages',accent: '#0E7C66' },
]

const WHY_CARDS = [
  { Icon: Clock,         title: 'Prompt Delivery',  desc: 'Deadline-driven workflows with milestone tracking on every project.', tint: '#FFF6DA', color: '#D89E0B' },
  { Icon: Shield,        title: 'ISO-Certified',    desc: 'ISO 17100 & 9001 processes. Every file reviewed, every time.',       tint: '#E0E5F3', color: '#06184F' },
  { Icon: Users,         title: 'Native Linguists', desc: 'Subject-matter experts who live the language, not just speak it.',   tint: '#E8EFFA', color: '#1466DB' },
  { Icon: MessageSquare, title: 'One Producer',     desc: 'A single point of contact who owns your project end-to-end.',        tint: '#DEF5EE', color: '#0E7C66' },
]

const CASE_STUDIES = [
  { tag: 'Gaming · 11 languages', title: 'Shipping a 220k-word RPG on a compressed timeline', metric: '−11 days vs. plan', client: 'Studio Aurelia', slug: null },
  { tag: 'Medical · EU MDR',      title: 'EU MDR readiness for class-IIb medical device documentation', metric: '100% submission', client: 'Vesper Health', slug: null },
  { tag: 'E-commerce · DTC',      title: 'PDP localisation for beauty brand entering MENA', metric: '+38% conv. in JP', client: 'Houseplant Beauty', slug: null },
]

const TESTIMONIALS = [
  { quote: 'Bright became an extension of our editorial team. The producer model cut our coordination overhead by half.', name: 'Mira Okafor',     role: 'Head of Localisation', company: 'Lumen OS' },
  { quote: 'We have run trials in 14 markets with Bright. Clinical accuracy plus cultural nuance — rare combination.',    name: 'Dr. Adrián Sosa', role: 'Clinical Operations',   company: 'Vesper Health' },
  { quote: 'On time, every time. The producer model means we never chase status updates.',                                name: 'Priya Raman',    role: 'Marketing Director',   company: 'Houseplant Beauty' },
]

const LOCATIONS = [
  { city: 'Mumbai',    type: 'Production hub' },
  { city: 'Bengaluru', type: 'Production hub' },
  { city: 'New Delhi', type: 'Linguist network' },
  { city: 'London',    type: 'Production hub' },
  { city: 'Berlin',    type: 'Linguist network' },
  { city: 'Dubai',     type: 'Linguist network' },
  { city: 'Singapore', type: 'Linguist network' },
  { city: 'Tokyo',     type: 'Linguist network' },
  { city: 'New York',  type: 'Linguist network' },
  { city: 'Toronto',   type: 'Linguist network' },
]

const INDUSTRY_EMOJIS = ['⚖️', '🏥', '⚙️', '🛒', '🎮', '🎓', '📺']
const INDUSTRY_BLURBS = [
  'Courts, law firms, and corporate legal teams across 30+ jurisdictions.',
  'Hospitals, pharma, CROs, and medical device makers.',
  'User manuals, specs, and engineering documentation.',
  'Product listings, checkout flows, and customer support.',
  'Game text, UI strings, trailers, and community content.',
  'E-learning, academic publications, and educational software.',
  'Subtitling, dubbing, and voice-over for streaming platforms.',
]

const STEPS = [
  { num: '01', label: 'Brief',   desc: 'Share your documents, scope, and deadline.',              accent: true  },
  { num: '02', label: 'Build',   desc: 'We assemble the right native-specialist team.',            accent: false },
  { num: '03', label: 'Review',  desc: 'Human QA, proofreading, and ISO compliance checks.',      accent: false },
  { num: '04', label: 'Deliver', desc: 'Files in your format, on time, guaranteed.',              accent: false },
]

export default function HomePage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 80% 60% at 65% 50%, var(--tint-2), transparent)' }}
        />

        <div style={{ padding: '64px 24px 72px', maxWidth: 1200, margin: '0 auto' }}>
          {/* B1 — hero-grid: 2-col desktop, 1-col mobile */}
          <div className="hero-grid">
            {/* Left */}
            <div>
              <div style={{ display: 'flex', gap: 10, marginBottom: 24, flexWrap: 'wrap' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'var(--tint-2)', color: 'var(--blue)', fontSize: 13, fontWeight: 600 }}>
                  Quote in 4 hours · Kickoff in 24
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 999, background: 'var(--tint-2)', color: 'var(--ink)', fontSize: 13, fontWeight: 600 }}>
                  ⭐ 4.9 · 240+ projects/yr
                </span>
              </div>

              <h1
                style={{
                  fontFamily: 'Bricolage Grotesque, system-ui',
                  fontSize: 'clamp(36px, 4.5vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  color: 'var(--ink)',
                  lineHeight: 1.1,
                  marginBottom: 20,
                }}
              >
                Language services{' '}
                <span style={{ position: 'relative', display: 'inline-block' }}>
                  built for
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 120 12"
                    style={{ position: 'absolute', bottom: -4, left: 0, width: '100%', height: 12 }}
                  >
                    <path d="M4 8 Q30 2 60 8 Q90 14 116 8" stroke="var(--yellow)" strokeWidth="3" fill="none" strokeLinecap="round" />
                  </svg>
                </span>{' '}
                global business.
              </h1>

              <p style={{ fontSize: 17, color: 'var(--muted-c)', lineHeight: 1.7, marginBottom: 32, maxWidth: 480 }}>
                ISO-certified translation, localisation, voice, and interpretation in 120+ languages — engineered by linguists, reviewed by humans, delivered on time.
              </p>

              {/* B1 — CTA buttons: full-width stacked on mobile */}
              <div className="hero-cta">
                <Link href="/get-quote" className="btn accent">Get a Free Quote →</Link>
                <Link href="/services" className="btn ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--ink)"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                  Browse Services
                </Link>
              </div>

              {/* A1 — Avatar circles */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
                <div style={{ display: 'flex' }}>
                  {['MK', 'AS', 'JR', 'PV', 'NL'].map((init, i) => (
                    <div
                      key={init}
                      style={{
                        width: 32, height: 32, borderRadius: '50%',
                        background: 'var(--navy)', border: '2px solid #fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        marginLeft: i > 0 ? -8 : 0,
                      }}
                    >
                      <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 10, fontWeight: 700, color: '#fff' }}>{init}</span>
                    </div>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: 'var(--muted-c)' }}>Joined by 500+ global teams this year</span>
              </div>

              {/* B1 — Trust stats: flex on desktop, 3-col grid on mobile */}
              <div className="hero-stats">
                {[['1.4B+', 'words delivered'], ['120+', 'languages'], ['500+', 'global clients']].map(([num, lbl]) => (
                  <div key={lbl}>
                    <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 28, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0 }}>{num}</p>
                    <p style={{ fontSize: 13, color: 'var(--muted-c)', margin: 0 }}>{lbl}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero visual */}
            <div
              className="hero-visual-wrap"
              style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
              {/* Orbit rings */}
              <svg
                aria-hidden="true"
                width="440" height="440" viewBox="0 0 440 440" fill="none"
                style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', opacity: 0.06 }}
              >
                <circle cx="220" cy="220" r="210" stroke="var(--navy)" strokeWidth="1.5" strokeDasharray="6 4" />
                <circle cx="220" cy="220" r="155" stroke="var(--navy)" strokeWidth="1" strokeDasharray="4 6" />
              </svg>

              <HeroVisual />

              {/* B1 — Floating chips: hidden on mobile */}
              <div className="hero-chips-wrap">
                {[
                  { text: 'नमस्ते', top: '4%',   left: '0%',   bg: 'var(--yellow)', color: 'var(--navy)', delay: '0s' },
                  { text: '你好',    top: '18%',  right: '-4%', bg: '#fff',          color: 'var(--blue)', delay: '0.8s' },
                  { text: 'مرحبا',  bottom: '28%', left: '-6%',bg: 'var(--navy)',   color: 'var(--yellow)', delay: '1.6s', dir: 'rtl' },
                  { text: 'Hola',   bottom: '10%', right: '2%',bg: 'var(--blue)',   color: '#fff',        delay: '2.4s' },
                  { text: 'Bonjour',top: '60%',  left: '-8%',  bg: '#fff',          color: 'var(--navy)', delay: '0.4s' },
                ].map(({ text, top, left, right, bottom, bg, color, delay, dir }) => (
                  <span
                    key={text}
                    style={{
                      position: 'absolute', top, left, right, bottom,
                      background: bg, color,
                      padding: '6px 14px', borderRadius: 999,
                      fontSize: 15, fontWeight: 600,
                      boxShadow: '0 4px 16px rgba(6,24,79,.12)',
                      direction: dir || 'ltr',
                      animation: `floaty 4.5s ease-in-out ${delay} infinite`,
                      border: bg === '#fff' ? '1px solid var(--rule)' : 'none',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {text}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CLIENT LOGOS ─── */}
      {/* A2 + B2 */}
      <section
        style={{
          background: 'var(--bg-2)',
          borderTop: '1px solid var(--rule)',
          borderBottom: '1px solid var(--rule)',
          padding: '48px 0',
          overflow: 'hidden',
        }}
      >
        <p style={{ textAlign: 'center', fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted-c)', marginBottom: 20 }}>
          Trusted by global teams
        </p>
        <div
          style={{
            position: 'relative', overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)',
          }}
        >
          <div style={{ display: 'flex', gap: 48, width: 'max-content', animation: 'marqueeMove 42s linear infinite' }}>
            {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((name, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'Bricolage Grotesque, system-ui',
                  fontSize: 17,
                  fontWeight: 600,
                  color: 'var(--ink-2)',
                  whiteSpace: 'nowrap',
                  letterSpacing: '-0.01em',
                }}
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHY US ─── */}
      {/* A3 + B3 */}
      <section
        style={{
          padding: '80px 24px',
          background: 'var(--tint)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            Why choose Bright
          </p>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(28px, 3.5vw, 42px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 48, maxWidth: 480 }}>
            Built for teams that{' '}
            <span style={{ color: 'var(--blue)' }}>can&rsquo;t afford mistakes.</span>
          </h2>
          {/* B3 — 2×2 on mobile, 4-col on lg */}
          <div className="why-grid">
            {WHY_CARDS.map(({ Icon, title, desc, tint, color }, idx) => (
              <div
                key={title}
                className="bls-card why-card"
                style={{
                  padding: 24,
                  position: 'relative',
                  overflow: 'hidden',
                  borderLeft: `4px solid ${color}`,
                }}
              >
                {/* A3 — Decorative number, hidden on mobile */}
                <span
                  className="why-card-number"
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: -8, right: 12,
                    fontFamily: 'Bricolage Grotesque, system-ui',
                    fontSize: 96, fontWeight: 700,
                    color: 'var(--navy)', opacity: 0.04,
                    lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                  }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>

                <div style={{ width: 48, height: 48, borderRadius: 12, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color={color} />
                </div>
                <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 18, fontWeight: 600, color: 'var(--ink)', marginBottom: 8, letterSpacing: '-0.02em', position: 'relative' }}>
                  {title}
                </h3>
                <p style={{ fontSize: 14, color: 'var(--muted-c)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SERVICES ─── */}
      {/* A4 + B4 */}
      <section style={{ background: 'var(--bg)', borderTop: '1px solid var(--rule)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 40, gap: 16, flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 10 }}>
                01 · Our Services
              </p>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', maxWidth: 380 }}>
                Every language service under one roof.
              </h2>
            </div>
            <Link href="/services" style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600, textDecoration: 'none', alignSelf: 'flex-end' }}>
              Request service catalogue →
            </Link>
          </div>

          {/* B4 — 1-col mobile, 2-col md, 4-col lg */}
          <div className="services-grid">
            {services.map((svc, i) => (
              <ServiceCard
                key={svc.slug}
                service={svc}
                featured={i === 0}
                className={i === 0 ? 'services-featured' : ''}
              />
            ))}
          </div>

          {/* A4 — Section CTA */}
          <div style={{ textAlign: 'center', marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--rule)' }}>
            <span style={{ fontSize: 15, color: 'var(--muted-c)', marginRight: 16 }}>Don&rsquo;t see your service?</span>
            <Link href="/contact" style={{ color: 'var(--blue)', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
              Request a Custom Service →
            </Link>
          </div>
        </div>
      </section>

      {/* ─── ABOUT SPLIT ─── */}
      {/* A5 + B5 */}
      <section style={{ padding: '80px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* B5 — 1-col mobile, 2-col desktop */}
          <div className="about-grid">
            {/* Left — visual card */}
            <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
              <div
                style={{
                  position: 'absolute',
                  width: '90%', height: '85%',
                  background: 'var(--tint)',
                  borderRadius: 20,
                  border: '1px solid var(--rule)',
                  transform: 'rotate(-3deg) translateY(16px)',
                  left: '5%', top: 0,
                }}
              />
              {/* A5 — Main card with stronger shadow + hover glow (CSS-driven) */}
              <div
                className="about-main-card"
                style={{
                  position: 'relative',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--card-border)',
                  borderRadius: 20,
                  padding: 28,
                  width: '90%',
                  boxShadow: '0 20px 60px -12px rgba(6,24,79,.14)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--muted-c)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>BR-7741</span>
                  <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: '#10B981', textTransform: 'uppercase', letterSpacing: '0.14em' }}>On track</span>
                </div>
                <h4 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 18, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 6 }}>
                  Beauty brand · MENA launch
                </h4>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--muted-c)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}>
                  EN → AR, FA, TR · 38,400 words
                </p>
                {/* Progress bars — B5: hide last 2 on mobile */}
                {[
                  { lang: 'Arabic',  pct: 92, color: 'var(--navy)' },
                  { lang: 'Persian', pct: 78, color: 'var(--blue)' },
                  { lang: 'Turkish', pct: 66, color: 'var(--yellow)', extra: true },
                  { lang: 'Hebrew',  pct: 41, color: '#0E7C66',      extra: true },
                ].map(({ lang, pct, color, extra }) => (
                  <div key={lang} className={extra ? 'about-progress-extra' : ''} style={{ marginBottom: 12 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: 'var(--ink)', fontWeight: 500 }}>{lang}</span>
                      <span style={{ fontSize: 13, color: 'var(--muted-c)' }}>{pct}%</span>
                    </div>
                    <div style={{ height: 6, background: 'var(--tint-2)', borderRadius: 999 }}>
                      <div style={{ height: '100%', width: `${pct}%`, background: color, borderRadius: 999 }} />
                    </div>
                  </div>
                ))}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--rule)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ display: 'flex' }}>
                      {['AS','MK','JR','NV'].map((init, i) => (
                        <div key={init} style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--navy)', border: '2px solid #fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: i > 0 ? -8 : 0 }}>
                          <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 9, fontWeight: 700, color: '#fff' }}>{init}</span>
                        </div>
                      ))}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--muted-c)' }}>4 linguists · 1 producer</span>
                  </div>
                  <div style={{ background: 'var(--yellow)', padding: '6px 12px', borderRadius: 10, textAlign: 'center' }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'var(--navy)', margin: 0 }}>QUOTE IN</p>
                    <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 18, fontWeight: 700, color: 'var(--navy)', margin: 0 }}>4 hrs</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right — text */}
            <div>
              {/* A5 — Yellow accent line above kicker */}
              <div style={{ width: 48, height: 3, background: '#F5B819', marginBottom: 16, borderRadius: 2 }} />

              <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
                About Bright
              </p>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 20 }}>
                A language partner, not just a vendor.
              </h2>
              <p style={{ fontSize: 15, color: 'var(--muted-c)', lineHeight: 1.75, marginBottom: 24 }}>
                Bright Language Solutions combines ISO-certified quality processes with a producer model that keeps your projects on track, always. One point of contact. Full accountability.
              </p>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                {[
                  'Native-speaker translators in every language pair',
                  'ISO 17100 & 9001 certified quality process',
                  '500+ professional voice artists on roster',
                  '48-country linguist network',
                  'NDA by default on every project',
                  'Dedicated producer for every account',
                ].map((item) => (
                  <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 15, color: 'var(--ink)' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                      <circle cx="12" cy="12" r="10" fill="var(--blue)" opacity="0.12" />
                      <polyline points="8 12 11 15 16 9" stroke="var(--blue)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>

              {/* A5 — Extra trust stats */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32, padding: '16px 0', borderTop: '1px solid var(--rule)' }}>
                {['₹0 upfront · Pay on delivery', 'Dedicated Slack channel for every project'].map((stat) => (
                  <div key={stat} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: 'var(--muted-c)' }}>
                    <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--yellow)', display: 'inline-block', flexShrink: 0 }} />
                    {stat}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <Link href="/about" className="btn primary">Learn about us</Link>
                <Link href="/case-studies" className="btn ghost">See case studies</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── LANGUAGES ─── */}
      {/* B6 */}
      <section style={{ background: 'var(--section-alt)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            02 · Languages
          </p>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 48 }}>
            120+ languages, organised your way.
          </h2>
          {/* B6 — 1-col mobile, 2-col md, 4-col xl */}
          <div className="lang-grid">
            {LANGUAGE_REGIONS.map((r) => (
              <LanguageGrid
                key={r.key}
                regionName={r.name}
                regionSlug={r.slug}
                languages={languages[r.key] || []}
                accent={r.accent}
                showMax={8}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─── INDUSTRIES ─── */}
      {/* A6 + B7 */}
      <section style={{ background: 'var(--bg)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            03 · Industries
          </p>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, gap: 16, flexWrap: 'wrap' }}>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', margin: 0 }}>
              Specialist expertise in every sector.
            </h2>
            {/* A6 — View all link */}
            <Link href="/industries" style={{ color: 'var(--blue)', fontSize: 14, fontWeight: 600, textDecoration: 'none', flexShrink: 0 }}>
              View all industries →
            </Link>
          </div>

          {/* B7 — single column mobile, 12-col grid desktop */}
          <div className="industries-outer">
            {industries.map((ind, i) => {
              const isLarge = i === 0
              return (
                <Link
                  key={ind.slug}
                  href={`/industries/${ind.slug}`}
                  className={isLarge ? 'industry-featured' : 'industry-regular'}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    borderRadius: 16,
                    padding: 32,
                    background: isLarge ? 'linear-gradient(135deg, #06184F 0%, #00102E 100%)' : 'var(--card-bg)',
                    border: '1px solid var(--card-border)',
                    color: isLarge ? '#fff' : 'var(--ink)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    minHeight: isLarge ? 320 : 160,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ position: 'absolute', top: isLarge ? 24 : 16, right: 16, fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: isLarge ? 'rgba(255,255,255,0.3)' : 'var(--muted-c)', letterSpacing: '0.18em' }}>
                    0{i + 1}
                  </div>

                  {/* A6 — Decorative large icon for featured card */}
                  {isLarge && (
                    <span
                      aria-hidden="true"
                      style={{
                        position: 'absolute', bottom: 16, right: 24,
                        fontSize: 120, opacity: 0.08,
                        lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                      }}
                    >
                      {INDUSTRY_EMOJIS[0]}
                    </span>
                  )}

                  <div style={{ fontSize: isLarge ? 36 : 28, marginBottom: 12 }}>{INDUSTRY_EMOJIS[i]}</div>
                  <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: isLarge ? 24 : 16, fontWeight: 600, letterSpacing: '-0.02em', color: isLarge ? '#fff' : 'var(--ink)', marginBottom: 8 }}>
                    {ind.title}
                  </h3>
                  <p style={{ fontSize: 13, color: isLarge ? 'rgba(255,255,255,0.65)' : 'var(--muted-c)', lineHeight: 1.6, margin: 0 }}>
                    {INDUSTRY_BLURBS[i]}
                  </p>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── STATS BAND ─── */}
      {/* A7 + B8 */}
      <section style={{ background: '#06184F', position: 'relative', overflow: 'hidden', padding: '72px 24px' }}>
        {/* Dot pattern overlay */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.06 }}>
          <defs>
            <pattern id="dots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        {/* A7 — Since 2018 badge */}
        <div style={{ position: 'absolute', top: 24, right: 24, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px', borderRadius: 999 }}>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.14em' }}>Since 2018</span>
        </div>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {/* B8 — 2×2 on mobile, 4-col on lg */}
          <div className="stats-grid">
            {[
              { num: '1.4B', label: 'words delivered',   sub: 'since 2014' },
              { num: '120+', label: 'languages',         sub: 'covered in-house' },
              { num: '48',   label: 'countries',         sub: 'linguist presence' },
              { num: '98.7%',label: 'on-time delivery',  sub: 'all projects' },
            ].map(({ num, label, sub }) => (
              <div key={label}>
                {/* B8 — clamp handles mobile overflow */}
                <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(36px, 10vw, 72px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', margin: 0, lineHeight: 1 }}>
                  {num}
                </p>
                {/* A7 — Yellow underline */}
                <div style={{ width: 32, height: 2, background: '#F5B819', margin: '10px auto 8px' }} />
                <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: '0 0 4px', fontWeight: 500 }}>{label}</p>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '0.14em', margin: 0 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PROCESS ─── */}
      {/* B9 */}
      <section style={{ background: 'var(--tint)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12, textAlign: 'center' }}>
          How we work
        </p>
        <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 60, textAlign: 'center' }}>
          Brief to delivery in four steps.
        </h2>
        <div style={{ position: 'relative' }}>
          {/* B9 — Horizontal connector hidden on mobile via CSS */}
          <div className="process-connector" />
          {/* B9 — Vertical stacking on mobile */}
          <div className="process-steps">
            {STEPS.map(({ num, label, desc, accent }) => (
              <div key={num} className="process-step">
                <div
                  className="process-step-circle"
                  style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: accent ? 'var(--yellow)' : 'transparent',
                    border: accent ? 'none' : '2px solid var(--navy)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: accent ? '0 8px 24px -6px rgba(245,184,25,.4)' : 'none',
                  }}
                >
                  <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 700, color: 'var(--navy)' }}>
                    {num}
                  </span>
                </div>
                <div className="process-step-text">
                  <h3 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 20, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 8 }}>
                    {label}
                  </h3>
                  <p style={{ fontSize: 14, color: 'var(--muted-c)', lineHeight: 1.65, margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      </section>

      {/* ─── CASE STUDIES ─── */}
      {/* A8 + B10 */}
      <section style={{ background: 'var(--section-alt)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            04 · Selected work
          </p>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 40 }}>
            Projects that moved markets.
          </h2>
          {/* B10 — 1-col mobile, 3-col lg */}
          <div className="case-grid">
            {CASE_STUDIES.map((cs) => (
              <CaseStudyCard key={cs.tag} {...cs} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/case-studies" className="btn ghost">View all case studies →</Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      {/* A9 + B11 */}
      <section style={{ background: 'var(--bg)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            05 · Testimonials
          </p>
          {/* A9 — Prominent rating display */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#F5B819">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 48, fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', lineHeight: 1 }}>4.9</span>
              <span style={{ fontSize: 24, color: 'var(--muted-c)', fontWeight: 500 }}>/ 5.0</span>
            </div>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: 'var(--muted-c)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: 0 }}>
              Based on 240+ verified reviews
            </p>
          </div>
        </div>

        {/* B11 — 1-col mobile, 3-col desktop; 3rd card hidden on mobile */}
        <div className="testimonials-grid">
          {TESTIMONIALS.map((t, i) => (
            <div key={t.name} className={i === 2 ? 'testimonial-hide-mobile' : ''}>
              <TestimonialCard {...t} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <Link href="/testimonials" className="btn ghost" style={{ display: 'inline-flex' }}>
            Read all reviews →
          </Link>
        </div>
      </div>
      </section>

      {/* ─── LOCATIONS ─── */}
      {/* B12 */}
      <section style={{ background: 'var(--tint)', padding: '80px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
            06 · Locations
          </p>
          <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(26px, 3vw, 38px)', fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 40 }}>
            Wherever you are, we&rsquo;re there.
          </h2>
          {/* B12 — 2-col mobile, auto-fill desktop */}
          <div className="locations-grid">
            {LOCATIONS.map(({ city, type }) => (
              <div key={city} className="bls-card" style={{ padding: '20px 18px' }}>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em',
                    color: type === 'Production hub' ? 'var(--blue)' : 'var(--yellow-2)',
                    background: type === 'Production hub' ? 'var(--tint-2)' : '#FFF6DA',
                    padding: '3px 8px', borderRadius: 999, marginBottom: 10,
                  }}
                >
                  {type}
                </span>
                <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 16, fontWeight: 600, color: 'var(--ink)', margin: 0, letterSpacing: '-0.01em' }}>
                  {city}
                </p>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <Link href="/locations" className="btn ghost">All locations →</Link>
          </div>
        </div>
      </section>

      {/* ─── CONTACT CTA ─── */}
      {/* A10 + B13 */}
      <section
        className="cta-section-pad"
        style={{
          background: 'linear-gradient(135deg, #06184F 0%, #00102E 100%)',
          position: 'relative',
          overflow: 'hidden',
          padding: '80px 24px',
          minHeight: 600,
        }}
      >
        {/* Dot pattern */}
        <svg aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}>
          <defs>
            <pattern id="dots2" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#fff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots2)" />
        </svg>

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          {/* B13 — 1-col mobile, 2-col desktop */}
          <div className="cta-grid">
            {/* Left — trust signals (hidden on mobile) */}
            <div className="cta-trust-signals">
              <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--yellow)', display: 'block', marginBottom: 16 }}>
                Get a quote
              </span>
              <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: 20 }}>
                Send us your brief. We reply in four hours.
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 36 }}>
                Every project starts with a conversation. Share your brief and our producer will be in touch before end of business.
              </p>
              {/* A10 — Trust signals with left border */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                {[
                  { label: 'Email', value: 'hello@brightlanguage.in' },
                  { label: 'Phone', value: '+91 83684 40255' },
                  { label: 'HQ',    value: 'New Delhi · India' },
                  { label: 'Hours', value: '24/7 producer cover' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ borderLeft: '2px solid rgba(255,255,255,0.2)', paddingLeft: 16 }}>
                    <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>
                      {label}
                    </p>
                    <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.8)', margin: 0, fontWeight: 500 }}>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — QuoteForm with trust badges */}
            <div>
              {/* A10 — Trust badges above form */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {['🔒 NDA', '⚡ 4hr reply', '✓ ISO certified'].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      background: 'rgba(255,255,255,0.1)',
                      color: '#fff',
                      fontSize: 12, fontWeight: 500,
                      padding: '5px 12px', borderRadius: 999,
                      border: '1px solid rgba(255,255,255,0.15)',
                    }}
                  >
                    {badge}
                  </span>
                ))}
              </div>

              {/* A10 — QuoteForm wrapper with enhanced radius and deep shadow */}
              <div style={{ borderRadius: 24, overflow: 'hidden', boxShadow: '0 32px 80px -16px rgba(0,0,0,0.4)' }}>
                <QuoteForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
