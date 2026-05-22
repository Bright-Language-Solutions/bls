// Server component — fetches all quotes from MongoDB, sorted by createdAt DESC,
// and hands them to the client wrapper for search/filter/inline status updates.

import { getQuotesCollection } from '@/lib/mongo'
import QuotesClient from './QuotesClient'

export const dynamic    = 'force-dynamic'
export const revalidate = 0

function toISO(v) {
  if (!v) return null
  if (v instanceof Date) return v.toISOString()
  try { return new Date(v).toISOString() } catch { return null }
}

export default async function AdminQuotesPage() {
  let quotes    = []
  let loadError = null
  try {
    const col  = await getQuotesCollection()
    const rows = await col.find({}).sort({ createdAt: -1 }).limit(1000).toArray()
    quotes = rows.map((r) => ({
      id:           r.id,
      customerName: r.customerName || '',
      phone:        r.phone || '',
      email:        r.email || '',
      serviceType:  r.serviceType || 'TRANSLATION',
      sourceLang:   r.sourceLang || '',
      targetLang:   r.targetLang || '',
      wordCount:    r.wordCount ?? null,
      projectDate:  r.projectDate || '',
      status:       r.status || 'RECEIVED',
      whatsappSent: !!r.whatsappSent,
      notes:        r.notes || '',
      createdAt:    toISO(r.createdAt),
    }))
  } catch (err) {
    console.error('[admin/quotes] fetch failed', err?.message || err)
    loadError = 'Could not load quotes from the database.'
  }

  return <QuotesClient initialQuotes={quotes} loadError={loadError} />
}
