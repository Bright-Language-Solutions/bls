// POST /api/quotes — create a new language-services quote request.
//
// Flow:
//  1. Zod-validate the body via quoteCreateSchema.
//  2. Insert into Mongo `quotes` collection (UUID id, timestamps).
//  3. Fire WhatsApp notification (never blocks — best-effort).
//  4. Patch `whatsappSent` on the stored document with the send result.
//  5. Return { success:true, quoteId, whatsappSent } 201 or { error } on failure.

import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import { getQuotesCollection } from '@/lib/mongo'
import { quoteCreateSchema, QuoteStatus } from '@/lib/quoteSchema'
import { sendWhatsAppNotification } from '@/lib/whatsapp'

function json(payload, status = 200) {
  const res = NextResponse.json(payload, { status })
  res.headers.set('Access-Control-Allow-Origin', process.env.CORS_ORIGINS || '*')
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  return res
}

export async function OPTIONS() {
  return json({}, 200)
}

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return json({ error: 'Invalid JSON body' }, 400)
  }

  const parsed = quoteCreateSchema.safeParse(body)
  if (!parsed.success) {
    const first = parsed.error.issues?.[0]
    const message = first?.message || 'Invalid request'
    const field   = first?.path?.join('.') || null
    return json({ error: message, field }, 400)
  }

  const data = parsed.data

  let quote
  try {
    const quotes = await getQuotesCollection()
    const now = new Date()
    quote = {
      id:           uuidv4(),
      customerName: data.customerName,
      phone:        data.phone,
      email:        data.email || null,
      serviceType:  data.serviceType,
      sourceLang:   data.sourceLang,
      targetLang:   data.targetLang,
      wordCount:    data.wordCount ?? null,
      projectDate:  data.projectDate,
      notes:        data.notes || null,
      status:       QuoteStatus.RECEIVED,
      whatsappSent: false,
      createdAt:    now,
      updatedAt:    now,
    }
    await quotes.insertOne(quote)
  } catch (err) {
    console.error('[api/quotes] db insert failed', err?.message || err)
    return json({ error: 'Could not save your request. Please try again.' }, 500)
  }

  // Fire WhatsApp — best-effort. Never blocks quote creation.
  let sent = false
  try {
    sent = await sendWhatsAppNotification({
      customerName: quote.customerName,
      phone:        quote.phone,
      serviceType:  quote.serviceType,
      sourceLang:   quote.sourceLang,
      targetLang:   quote.targetLang,
    })
  } catch (err) {
    console.error('[api/quotes] whatsapp unexpected throw', err?.message || err)
    sent = false
  }

  try {
    const quotes = await getQuotesCollection()
    await quotes.updateOne(
      { id: quote.id },
      { $set: { whatsappSent: sent, updatedAt: new Date() } },
    )
  } catch (err) {
    console.error('[api/quotes] failed to patch whatsappSent', err?.message || err)
    // Non-fatal — the quote exists; flag just didn't persist.
  }

  return json({ success: true, quoteId: quote.id, whatsappSent: sent }, 201)
}
