export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { getDb } from '@/lib/mongo'

const COOKIE_NAME = 'admin_session'

function requireAdmin(request) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  return request.cookies.get(COOKIE_NAME)?.value === secret
}

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

export async function GET(request) {
  if (!requireAdmin(request)) return unauthorized()
  try {
    const db = await getDb()
    const rows = await db.collection('case_studies').find({}).sort({ createdAt: -1 }).toArray()
    const caseStudies = rows.map((r) => ({
      id:      r._id.toString(),
      title:   r.title   || '',
      tag:     r.tag     || '',
      client:  r.client  || '',
      metric:  r.metric  || '',
      excerpt: r.excerpt || '',
      slug:    r.slug    || '',
    }))
    return NextResponse.json({ success: true, caseStudies })
  } catch (err) {
    console.error('[api/admin/case-studies] GET failed', err?.message || err)
    return NextResponse.json({ error: 'Could not fetch case studies.' }, { status: 500 })
  }
}

export async function POST(request) {
  if (!requireAdmin(request)) return unauthorized()
  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { title, tag, client, metric, excerpt, slug } = body || {}
  if (!title || typeof title !== 'string' || !title.trim()) {
    return NextResponse.json({ error: 'Title is required.' }, { status: 400 })
  }

  const doc = {
    title:     String(title).trim().slice(0, 200),
    tag:       String(tag     || '').trim().slice(0, 100),
    client:    String(client  || '').trim().slice(0, 100),
    metric:    String(metric  || '').trim().slice(0, 100),
    excerpt:   String(excerpt || '').trim().slice(0, 500),
    slug:      String(slug    || '').trim().slice(0, 100),
    createdAt: new Date(),
  }

  try {
    const db = await getDb()
    const result = await db.collection('case_studies').insertOne(doc)
    return NextResponse.json(
      { success: true, caseStudy: { id: result.insertedId.toString(), ...doc } },
      { status: 201 },
    )
  } catch (err) {
    console.error('[api/admin/case-studies] POST failed', err?.message || err)
    return NextResponse.json({ error: 'Could not create case study.' }, { status: 500 })
  }
}
