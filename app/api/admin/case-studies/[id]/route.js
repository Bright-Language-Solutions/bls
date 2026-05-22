export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { ObjectId } from 'mongodb'
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

export async function DELETE(request, { params }) {
  if (!requireAdmin(request)) return unauthorized()

  const { id } = params || {}
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'Invalid id' }, { status: 400 })
  }

  let objectId
  try {
    objectId = new ObjectId(id)
  } catch {
    return NextResponse.json({ error: 'Invalid id format' }, { status: 400 })
  }

  try {
    const db = await getDb()
    const result = await db.collection('case_studies').deleteOne({ _id: objectId })
    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Case study not found' }, { status: 404 })
    }
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[api/admin/case-studies/[id]] DELETE failed', err?.message || err)
    return NextResponse.json({ error: 'Could not delete case study.' }, { status: 500 })
  }
}
