// Singleton MongoDB client for Bright Language Solutions leads persistence.
//
// Uses native `mongodb` driver (see prisma/schema.prisma header for context).
// All code should import `getDb()` or `getLeadsCollection()` from here —
// never new up a MongoClient elsewhere.

import { MongoClient } from 'mongodb'

const uri = process.env.MONGO_URL
const dbName = process.env.DB_NAME && process.env.DB_NAME !== 'your_database_name'
  ? process.env.DB_NAME
  : 'bright_language'

if (!uri) {
  // eslint-disable-next-line no-console
  console.warn('[mongo] MONGO_URL is not set')
}

// Cache across hot reloads in dev to avoid exhausting connections.
let cached = global.__brightLanguageMongo
if (!cached) {
  cached = global.__brightLanguageMongo = { client: null, db: null, promise: null }
}

export async function getDb() {
  if (cached.db) return cached.db
  if (!cached.promise) {
    cached.client = new MongoClient(uri, { maxPoolSize: 1 })
    cached.promise = cached.client.connect().then((c) => {
      cached.db = c.db(dbName)
      return cached.db
    })
  }
  return cached.promise
}

export async function getLeadsCollection() {
  const db = await getDb()
  return db.collection('leads')
}

export async function getQuotesCollection() {
  const db = await getDb()
  return db.collection('quotes')
}

export async function getQuotationsCollection() {
  const db = await getDb()
  return db.collection('quotations')
}

export async function getInvoicesCollection() {
  const db = await getDb()
  return db.collection('invoices')
}

export async function getPaymentsCollection() {
  const db = await getDb()
  return db.collection('payments')
}

export async function getSiteVisitsCollection() {
  const db = await getDb()
  return db.collection('site_visits')
}

export async function getConsultationsCollection() {
  const db = await getDb()
  return db.collection('consultations')
}

export async function getPortfolioCollection() {
  const db = await getDb()
  return db.collection('portfolio')
}
