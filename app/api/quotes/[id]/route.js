// PATCH /api/quotes/[id] — admin-only. Updates status and/or notes.
// GET  /api/quotes/[id] — admin-only. Returns quote by id.
// Auth: requires the `admin_session` cookie to equal ADMIN_SECRET.
//
// PATCH body (all fields optional, at least one required):
//   { "status": "RECEIVED" | "IN_REVIEW" | "QUOTED" | "IN_PROGRESS" | "DELIVERED" | "CANCELLED",
//     "notes": string }
//
// Response: { success: true, lead: <updated-quote-without-_id> } on 200
//           { error: string } on 400 / 401 / 404 / 500

import { NextResponse } from 'next/server'
import { getQuotesCollection } from '@/lib/mongo'
import { QuoteStatus } from '@/lib/quoteSchema'

const COOKIE_NAME    = 'admin_session'
const ALLOWED_STATUS = new Set(Object.values(QuoteStatus))

function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
}

function requireAdmin(request) {
  const secret = process.env.ADMIN_SECRET
  if (!secret) return false
  const cookie = request.cookies.get(COOKIE_NAME)?.value
  return cookie === secret
}

function cleanDoc(doc) {
  if (!doc) return null
  // eslint-disable-next-line no-unused-vars
  const { _id, ...rest } = doc
  return rest
}

export async function PATCH(request, { params }) {
  if (!requireAdmin(request)) return unauthorized()

  const { id } = params || {}
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid quote id' }, { status: 400 })
  }

  let body
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const update = {}
  if (body?.status !== undefined) {
    if (!ALLOWED_STATUS.has(body.status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${[...ALLOWED_STATUS].join(', ')}` },
        { status: 400 },
      )
    }
    update.status = body.status
  }
  if (body?.notes !== undefined) {
    if (body.notes !== null && typeof body.notes !== 'string') {
      return NextResponse.json({ error: 'Notes must be a string' }, { status: 400 })
    }
    update.notes = body.notes ? String(body.notes).slice(0, 1000) : null
  }

  if (Object.keys(update).length === 0) {
    return NextResponse.json(
      { error: 'Provide at least one of: status, notes' },
      { status: 400 },
    )
  }
  update.updatedAt = new Date()

  try {
    const col    = await getQuotesCollection()
    const result = await col.findOneAndUpdate(
      { id },
      { $set: update },
      { returnDocument: 'after' },
    )
    const doc = result?.value || result // driver version-safe
    if (!doc || !doc.id) {
      return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true, lead: cleanDoc(doc) })
  } catch (err) {
    console.error('[api/quotes/[id]] update failed', err?.message || err)
    return NextResponse.json({ error: 'Could not update quote.' }, { status: 500 })
  }
}

export async function GET(request, { params }) {
  if (!requireAdmin(request)) return unauthorized()
  const { id } = params || {}
  try {
    const col = await getQuotesCollection()
    const doc = await col.findOne({ id })
    if (!doc) return NextResponse.json({ error: 'Quote not found' }, { status: 404 })
    return NextResponse.json({ success: true, lead: cleanDoc(doc) })
  } catch (err) {
    console.error('[api/quotes/[id]] get failed', err?.message || err)
    return NextResponse.json({ error: 'Could not fetch quote.' }, { status: 500 })
  }
}
