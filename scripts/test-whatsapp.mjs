import { testWhatsApp } from '../lib/whatsapp.js'

console.log('Testing WhatsApp notification...')
const result = await testWhatsApp()
console.log('Result:', JSON.stringify(result, null, 2))
