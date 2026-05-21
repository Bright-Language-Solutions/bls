import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDb } from '@/lib/mongo'

export const dynamic = 'force-dynamic'

async function getStudy(slug) {
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    const db = await Promise.race([getDb(), timeout])
    const doc = await db.collection('case_studies').findOne({ slug })
    if (!doc) return null
    return { ...doc, _id: doc._id.toString() }
  } catch {
    return null
  }
}

export async function generateMetadata({ params }) {
  const study = await getStudy(params.slug)
  if (!study) return {}
  const BASE = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.brightlanguage.in'
  const desc = (study.summary || study.title).slice(0, 160)
  return {
    title: study.title,
    description: desc,
    openGraph: {
      title: `${study.title} | Bright Language Solutions`,
      description: desc,
      type: 'website',
      url: `${BASE}/case-studies/${params.slug}`,
    },
  }
}

export default async function CaseStudyDetailPage({ params }) {
  const study = await getStudy(params.slug)
  if (!study) notFound()

  return (
    <>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #06184F 0%, #00102E 100%)', padding: '72px 24px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Link
            href="/case-studies"
            style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'rgba(255,255,255,0.5)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 32 }}
          >
            ← All case studies
          </Link>
          {study.tag && (
            <span
              style={{ display: 'inline-block', padding: '4px 14px', borderRadius: 999, background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.7)', fontSize: 12, fontFamily: 'JetBrains Mono, monospace', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 20 }}
            >
              {study.tag}
            </span>
          )}
          <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 700, color: '#fff', letterSpacing: '-0.03em', marginBottom: 20, maxWidth: 700 }}>
            {study.title}
          </h1>
          <div style={{ display: 'flex', gap: 32 }}>
            {study.client && (
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>Client</p>
                <p style={{ fontSize: 15, color: '#fff', margin: 0, fontWeight: 500 }}>{study.client}</p>
              </div>
            )}
            {(study.metric || study.result) && (
              <div>
                <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.14em', color: 'rgba(255,255,255,0.4)', margin: '0 0 4px' }}>Result</p>
                <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 24, fontWeight: 700, color: 'var(--yellow)', letterSpacing: '-0.02em', margin: 0 }}>
                  {study.metric || study.result}
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Body */}
      <section style={{ maxWidth: 800, margin: '0 auto', padding: '64px 24px' }}>
        {study.summary && (
          <p style={{ fontSize: 18, color: 'var(--ink)', lineHeight: 1.8, marginBottom: 32, fontWeight: 500 }}>
            {study.summary}
          </p>
        )}
        {study.body && (
          <div
            style={{ fontSize: 16, color: 'var(--muted-c)', lineHeight: 1.8 }}
            dangerouslySetInnerHTML={{ __html: study.body }}
          />
        )}
        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--rule)', display: 'flex', gap: 12 }}>
          <Link href="/get-quote" className="btn accent">Start a Similar Project →</Link>
          <Link href="/case-studies" className="btn ghost">← All case studies</Link>
        </div>
      </section>
    </>
  )
}
