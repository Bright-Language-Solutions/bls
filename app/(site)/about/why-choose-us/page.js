import Link from 'next/link'
import { Clock, Shield, Users, MessageSquare, Globe, Star } from 'lucide-react'

export const metadata = {
  title: 'Why Choose Us',
  description: '6 reasons global teams choose Bright Language Solutions — ISO certification, native linguists, prompt delivery, and single-producer accountability.',
  openGraph: {
    title: 'Why Choose Us | Bright Language Solutions',
    description: '6 reasons global teams choose Bright Language Solutions — ISO certification, native linguists, prompt delivery, and single-producer accountability.',
    type: 'website',
    url: '/about/why-choose-us',
  },
}

const DIFFERENTIATORS = [
  {
    Icon: Clock,
    title: 'Prompt Delivery',
    color: '#D89E0B',
    tint: '#FFF6DA',
    points: [
      'Quote within 4 working hours',
      'Project kickoff within 24 hours of approval',
      'Milestone tracking on every project',
      'Urgent turnaround available 24/7',
    ],
  },
  {
    Icon: Shield,
    title: 'ISO-Certified Quality',
    color: '#06184F',
    tint: '#E0E5F3',
    points: [
      'ISO 17100:2015 certified translation process',
      'ISO 9001:2015 quality management system',
      'Every project reviewed by a senior linguist',
      'Independently audited annual quality reviews',
    ],
  },
  {
    Icon: Users,
    title: 'Native Linguists',
    color: '#1466DB',
    tint: '#E8EFFA',
    points: [
      'Mother-tongue translators for every language pair',
      'Subject-matter specialists (legal, medical, technical)',
      'In-country reviewers for cultural accuracy',
      '500+ vetted linguists on our network',
    ],
  },
  {
    Icon: MessageSquare,
    title: 'Producer Model',
    color: '#0E7C66',
    tint: '#DEF5EE',
    points: [
      'One dedicated producer per account',
      'Single point of contact — no back-and-forth',
      'Proactive communication on every milestone',
      'Producer covers your timezone, always',
    ],
  },
  {
    Icon: Globe,
    title: 'Global Coverage',
    color: '#8B5CF6',
    tint: '#EDE9FE',
    points: [
      '120+ languages covered in-house',
      'Offices and hubs in 6 countries',
      '48-country linguist network',
      'RTL, CJK, and Indic script specialists',
    ],
  },
  {
    Icon: Star,
    title: 'Data Security',
    color: '#0E51B4',
    tint: '#E8EFFA',
    points: [
      'NDA signed by default on every project',
      'We never train AI on your content',
      'Encrypted file transfer and storage',
      'HIPAA-aware handling for sensitive materials',
    ],
  },
]

export default function WhyChooseUsPage() {
  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Why choose Bright
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 560 }}>
        Six reasons teams stay with us.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        We compete on quality, reliability, and relationships — not just price. Here's what makes Bright different.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, marginBottom: 64 }}>
        {DIFFERENTIATORS.map(({ Icon, title, color, tint, points }) => (
          <div key={title} className="bls-card" style={{ padding: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 12, background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
              <Icon size={24} color={color} />
            </div>
            <h2 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', letterSpacing: '-0.02em', marginBottom: 16 }}>
              {title}
            </h2>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {points.map((pt) => (
                <li key={pt} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: 'var(--muted-c)', lineHeight: 1.6 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 2 }}>
                    <polyline points="20 6 9 17 4 12" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <Link href="/get-quote" className="btn accent">Get a Free Quote →</Link>
        <Link href="/case-studies" className="btn ghost" style={{ marginLeft: 12 }}>See case studies</Link>
      </div>
    </div>
  )
}
