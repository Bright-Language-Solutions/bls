import CaseStudyCard from '@/components/CaseStudyCard'
import { getDb } from '@/lib/mongo'
import Link from 'next/link'

export const metadata = {
  title: 'Case Studies',
  description: 'Real projects, real results — translation and localisation case studies from Bright Language Solutions across gaming, medical, and e-commerce sectors.',
  openGraph: {
    title: 'Case Studies | Bright Language Solutions',
    description: 'Real projects, real results — translation and localisation case studies from Bright Language Solutions across gaming, medical, and e-commerce sectors.',
    type: 'website',
    url: '/case-studies',
  },
}

export const dynamic = 'force-dynamic'

async function getCaseStudies() {
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    const db = await Promise.race([getDb(), timeout])
    const docs = await db.collection('case_studies').find({}).sort({ _id: -1 }).limit(50).toArray()
    return docs.map((d) => ({ ...d, _id: d._id.toString() }))
  } catch {
    return []
  }
}

export default async function CaseStudiesPage() {
  const studies = await getCaseStudies()

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
        Case studies
      </p>
      <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 16, maxWidth: 520 }}>
        Projects that moved markets.
      </h1>
      <p style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.7, maxWidth: 520, marginBottom: 56 }}>
        A selection of client projects across gaming, medical, e-commerce, and media.
      </p>

      {studies.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--tint)',
            borderRadius: 20,
            color: 'var(--muted-c)',
          }}
        >
          <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>
            No case studies yet.
          </p>
          <p style={{ fontSize: 15, marginBottom: 24 }}>
            We&rsquo;re adding them soon. In the meantime, get in touch to hear about our work.
          </p>
          <Link href="/contact" className="btn ghost">Contact us →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {studies.map((study) => (
            <CaseStudyCard
              key={study._id}
              tag={study.tag || study.industry || ''}
              title={study.title}
              client={study.client}
              metric={study.metric || study.result}
              slug={study.slug}
            />
          ))}
        </div>
      )}
    </div>
  )
}
