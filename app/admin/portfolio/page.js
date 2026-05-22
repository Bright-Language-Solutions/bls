export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getDb } from '@/lib/mongo'
import PortfolioClient from './PortfolioClient'

export default async function PortfolioPage() {
  let caseStudies = []
  let loadError = null

  try {
    const db = await getDb()
    const rows = await db.collection('case_studies').find({}).sort({ createdAt: -1 }).toArray()
    caseStudies = rows.map((r) => ({
      id: r._id.toString(),
      title: r.title || '',
      tag: r.tag || '',
      client: r.client || '',
      metric: r.metric || '',
      excerpt: r.excerpt || '',
      slug: r.slug || '',
    }))
  } catch (err) {
    console.error('[admin/portfolio] fetch failed', err?.message || err)
    loadError = 'Could not load case studies from the database.'
  }

  return <PortfolioClient initialCaseStudies={caseStudies} loadError={loadError} />
}
