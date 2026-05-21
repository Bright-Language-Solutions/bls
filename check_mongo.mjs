import { MongoClient } from 'mongodb'
const client = new MongoClient('mongodb://localhost:27017')
await client.connect()
const doc = await client.db('bright_language').collection('quotes').findOne({ customerName: 'Priya Test' })
const { _id, createdAt, updatedAt, ...clean } = doc
clean.createdAt = createdAt?.toISOString()
clean.updatedAt = updatedAt?.toISOString()
console.log(JSON.stringify(clean, null, 2))
await client.close()
