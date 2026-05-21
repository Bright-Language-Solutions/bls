import TestimonialCard from '@/components/TestimonialCard'
import { getDb } from '@/lib/mongo'
import Link from 'next/link'

export const metadata = {
  title: 'Testimonials',
  description: 'See what global teams say about Bright Language Solutions — 4.9/5 rated, 240+ reviews from legal, medical, media, and e-commerce clients worldwide.',
  openGraph: {
    title: 'Testimonials | Bright Language Solutions',
    description: 'See what global teams say about Bright Language Solutions — 4.9/5 rated, 240+ reviews from legal, medical, media, and e-commerce clients worldwide.',
    type: 'website',
    url: '/testimonials',
  },
}

export const dynamic = 'force-dynamic'

async function getTestimonials() {
  try {
    const timeout = new Promise((_, reject) => setTimeout(() => reject(new Error('timeout')), 5000))
    const db = await Promise.race([getDb(), timeout])
    const docs = await db.collection('testimonials').find({}).sort({ _id: -1 }).limit(50).toArray()
    return docs.map((d) => ({ ...d, _id: d._id.toString() }))
  } catch {
    return []
  }
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 24px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        <p style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--blue)', marginBottom: 12 }}>
          Testimonials
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 12 }}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} width="22" height="22" viewBox="0 0 24 24" fill="#F5B819">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          ))}
          <span style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 24, fontWeight: 700, color: 'var(--ink)', marginLeft: 8 }}>
            4.9 / 5
          </span>
        </div>
        <h1 style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: 'var(--ink)', letterSpacing: '-0.03em', marginBottom: 12 }}>
          Trusted by global teams.
        </h1>
        <p style={{ fontSize: 16, color: 'var(--muted-c)', maxWidth: 480, margin: '0 auto' }}>
          Read what our clients say about working with Bright Language Solutions.
        </p>
      </div>

      {testimonials.length === 0 ? (
        <div
          style={{
            textAlign: 'center',
            padding: '80px 24px',
            background: 'var(--tint)',
            borderRadius: 20,
          }}
        >
          <p style={{ fontFamily: 'Bricolage Grotesque, system-ui', fontSize: 22, fontWeight: 600, color: 'var(--ink)', marginBottom: 12 }}>
            No testimonials yet.
          </p>
          <p style={{ fontSize: 15, color: 'var(--muted-c)', marginBottom: 24 }}>
            We&rsquo;re collecting client stories. In the meantime, get in touch.
          </p>
          <Link href="/contact" className="btn ghost">Contact us →</Link>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 20 }}>
          {testimonials.map((t) => (
            <TestimonialCard
              key={t._id}
              quote={t.quote}
              name={t.name}
              role={t.role}
              company={t.company}
            />
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{ marginTop: 64, textAlign: 'center' }}>
        <Link href="/get-quote" className="btn accent">Experience it yourself →</Link>
      </div>
    </div>
  )
}
