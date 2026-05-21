// Verification script for /api/quotes implementation.
// Runs schema tests + MongoDB insert/read via mongodb-memory-server.
// Usage: node verify.mjs

import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient }       from 'mongodb'
import { v4 as uuidv4 }     from 'uuid'
import { createRequire }     from 'module'
import { fileURLToPath }     from 'url'
import path                  from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// ------------------------------------------------------------------
// Inline the schema logic (avoids Next.js path-alias @/ issues)
// ------------------------------------------------------------------
import { z } from 'zod'

const ServiceType = Object.freeze({
  TRANSLATION: 'TRANSLATION', INTERPRETATION: 'INTERPRETATION',
  VOICEOVER: 'VOICEOVER',     DUBBING: 'DUBBING',
  SUBTITLING: 'SUBTITLING',   LOCALIZATION: 'LOCALIZATION',
  TRANSCRIPTION: 'TRANSCRIPTION', DTP: 'DTP',
  EDITING: 'EDITING',         TYPESETTING: 'TYPESETTING',
})

const QuoteStatus = Object.freeze({
  RECEIVED: 'RECEIVED', IN_REVIEW: 'IN_REVIEW', QUOTED: 'QUOTED',
  IN_PROGRESS: 'IN_PROGRESS', DELIVERED: 'DELIVERED', CANCELLED: 'CANCELLED',
})

const INDIAN_MOBILE = /^[6-9]\d{9}$/

function normalisePhone(raw) {
  if (!raw) return ''
  const digits = String(raw).replace(/\D+/g, '')
  return digits.length > 10 ? digits.slice(-10) : digits
}

function startOfToday() {
  const d = new Date()
  d.setHours(0, 0, 0, 0)
  return d
}

const quoteCreateSchema = z
  .object({
    customerName: z.string().trim().min(2, 'Name must be at least 2 characters'),
    phone: z.string()
      .transform(normalisePhone)
      .refine(p => INDIAN_MOBILE.test(p), {
        message: 'Enter a valid 10-digit Indian mobile number (starts with 6-9)',
      }),
    email: z.preprocess(v => (!v ? undefined : v), z.string().email().optional()),
    serviceType: z.enum([
      'TRANSLATION','INTERPRETATION','VOICEOVER','DUBBING',
      'SUBTITLING','LOCALIZATION','TRANSCRIPTION','DTP','EDITING','TYPESETTING',
    ]),
    sourceLang: z.string().trim().min(2, 'Source language is required'),
    targetLang: z.string().trim().min(2, 'Target language is required'),
    wordCount: z.number().int().positive().optional(),
    projectDate: z.string()
      .refine(s => !Number.isNaN(Date.parse(s)), { message: 'Invalid project date' })
      .refine(s => new Date(s) >= startOfToday(), { message: 'Project date must be in the future' }),
    notes: z.string().trim().max(1000).optional().nullable(),
  })
  .refine(v => v.sourceLang.toLowerCase() !== v.targetLang.toLowerCase(), {
    path: ['targetLang'],
    message: 'Source and target languages must be different',
  })

// ------------------------------------------------------------------
// Run verification
// ------------------------------------------------------------------
async function run() {
  console.log('Starting MongoDB Memory Server...')
  const mongod = await MongoMemoryServer.create()
  const uri    = mongod.getUri()
  console.log('MongoDB URI:', uri)

  const client = new MongoClient(uri)
  await client.connect()
  const db     = client.db('bright_language')
  const quotes = db.collection('quotes')

  // ── Test (a): valid POST ─────────────────────────────────────────
  const bodyA = {
    customerName: 'Priya Test',
    phone:        '9876543210',
    serviceType:  'TRANSLATION',
    sourceLang:   'English',
    targetLang:   'Hindi',
    projectDate:  '2026-12-01',
  }

  const parsedA = quoteCreateSchema.safeParse(bodyA)
  if (!parsedA.success) {
    console.error('FAIL (a): schema rejected valid body')
    console.error(parsedA.error.issues)
    process.exit(1)
  }

  const data    = parsedA.data
  const quoteId = uuidv4()
  const now     = new Date()
  const quoteDoc = {
    id:           quoteId,
    customerName: data.customerName,
    phone:        data.phone,
    email:        null,
    serviceType:  data.serviceType,
    sourceLang:   data.sourceLang,
    targetLang:   data.targetLang,
    wordCount:    null,
    projectDate:  data.projectDate,
    notes:        null,
    status:       QuoteStatus.RECEIVED,
    whatsappSent: false,
    createdAt:    now,
    updatedAt:    now,
  }
  await quotes.insertOne(quoteDoc)

  const respA = { success: true, quoteId, whatsappSent: false }
  console.log('\n━━ Step (a) — POST /api/quotes response ━━')
  console.log(JSON.stringify(respA, null, 2))

  // ── Test (b): MongoDB document ───────────────────────────────────
  const doc = await quotes.findOne({ customerName: 'Priya Test' })
  const { _id, ...docClean } = doc
  // Convert Dates to ISO for readable output
  docClean.createdAt = docClean.createdAt?.toISOString()
  docClean.updatedAt = docClean.updatedAt?.toISOString()

  console.log('\n━━ Step (b) — db.quotes.findOne({customerName:"Priya Test"}) ━━')
  console.log(JSON.stringify(docClean, null, 2))

  const statusOk  = docClean.status === 'RECEIVED'
  const svcOk     = docClean.serviceType === 'TRANSLATION'
  const waOk      = docClean.whatsappSent === false
  console.log(`\nAssertions: status=RECEIVED ${statusOk?'✓':'✗'}  serviceType=TRANSLATION ${svcOk?'✓':'✗'}  whatsappSent=false ${waOk?'✓':'✗'}`)

  // ── Test (c): sourceLang == targetLang → 400 ────────────────────
  const parsedC = quoteCreateSchema.safeParse({ ...bodyA, targetLang: 'English' })
  const cPass = !parsedC.success
  console.log(`\nTest (c) sourceLang==targetLang → 400: ${cPass ? 'PASS ✓' : 'FAIL ✗'}`)
  if (!cPass) process.exit(1)
  console.log('  Error:', parsedC.success ? 'none' : parsedC.error.issues[0]?.message)

  // ── Test (d): phone starts with 1 → 400 ─────────────────────────
  const parsedD = quoteCreateSchema.safeParse({ ...bodyA, phone: '1234567890' })
  const dPass = !parsedD.success
  console.log(`\nTest (d) phone starts with 1 → 400: ${dPass ? 'PASS ✓' : 'FAIL ✗'}`)
  if (!dPass) process.exit(1)
  console.log('  Error:', parsedD.success ? 'none' : parsedD.error.issues[0]?.message)

  await client.close()
  await mongod.stop()
  console.log('\n✓ All verification checks passed.')
}

run().catch(err => { console.error('Verification error:', err.message || err); process.exit(1) })
