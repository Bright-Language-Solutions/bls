// Provider-agnostic WhatsApp sender for Bright Language Solutions quote notifications.
// Switch provider by changing WHATSAPP_PROVIDER env var.
// Supported: "twilio" | "interakt" | "wati"
//
// Contract:
//   sendWhatsAppNotification(lead) -> Promise<boolean>
//     true  => message accepted by provider
//     false => anything else (missing creds, network error, provider 4xx/5xx)
// Never throws. Errors are console-logged only — must not block quote creation.

function buildMessage(lead) {
  return (
    `Hi ${lead.customerName}, thanks for contacting Bright Language Solutions!\n` +
    `We've received your ${lead.serviceType} request (${lead.sourceLang} → ${lead.targetLang}).\n` +
    `Our team will get back to you within 2 hours. — Bright Language Solutions`
  )
}

// Convert 10-digit Indian mobile to +91 E.164. Accepts already-E.164 input too.
function toE164(phone) {
  const digits = String(phone || '').replace(/\D+/g, '')
  if (!digits) return ''
  if (digits.length === 10) return `+91${digits}`
  if (digits.length > 10) return `+${digits.slice(-12)}`
  return `+${digits}`
}

async function sendViaTwilio(lead) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken  = process.env.TWILIO_AUTH_TOKEN
  const from       = process.env.TWILIO_WHATSAPP_FROM

  const to = process.env.WHATSAPP_TEST_TO
    ? process.env.WHATSAPP_TEST_TO
    : `whatsapp:${toE164(lead.phone)}`

  if (!accountSid || !authToken || !from) {
    console.log('[WHATSAPP] Twilio credentials missing — skipping')
    return false
  }

  const body =
    `Hi ${lead.customerName}, thanks for contacting Bright Language Solutions!\n` +
    `We've received your ${lead.serviceType} request (${lead.sourceLang} → ${lead.targetLang}).\n` +
    `Our team will get back to you within 2 hours. — Bright Language Solutions`

  try {
    const credentials = Buffer.from(`${accountSid}:${authToken}`).toString('base64')
    const response = await fetch(
      `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Basic ${credentials}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({ From: from, To: to, Body: body }),
      },
    )

    const data = await response.json()

    if (data.sid) {
      console.log(`[WHATSAPP] ✓ Sent to ${to} — SID: ${data.sid}`)
      return true
    } else {
      console.error('[WHATSAPP] ✗ Failed —', data.message || JSON.stringify(data))
      return false
    }
  } catch (err) {
    console.error('[WHATSAPP] ✗ Exception —', err.message)
    return false
  }
}

async function sendViaInterakt(lead, message) {
  const key = process.env.INTERAKT_API_KEY
  if (!key) {
    console.warn('[whatsapp:interakt] missing INTERAKT_API_KEY — skipping send')
    return false
  }
  const phoneOverride = process.env.WHATSAPP_TEST_TO?.replace(/^whatsapp:/, '') || null
  const e164 = toE164(phoneOverride || lead.phone)
  const countryCode = e164.startsWith('+91') ? '+91' : e164.slice(0, e164.length - 10)
  const phoneNumber = e164.slice(-10)

  const payload = {
    countryCode,
    phoneNumber,
    type: 'Text',
    data: { message },
  }

  try {
    const res = await fetch('https://api.interakt.ai/v1/public/message/', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${key}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      console.error('[whatsapp:interakt] http', res.status, txt.slice(0, 500))
      return false
    }
    return true
  } catch (err) {
    console.error('[whatsapp:interakt] network error', err?.message || err)
    return false
  }
}

async function sendViaWati(lead, message) {
  const key      = process.env.WATI_API_KEY
  const endpoint = process.env.WATI_API_ENDPOINT
  if (!key || !endpoint) {
    console.warn('[whatsapp:wati] missing WATI_API_KEY or WATI_API_ENDPOINT — skipping send')
    return false
  }
  const phoneOverride = process.env.WHATSAPP_TEST_TO?.replace(/^whatsapp:/, '') || null
  const phone = toE164(phoneOverride || lead.phone).replace(/^\+/, '')
  const url   = `${endpoint.replace(/\/$/, '')}/api/v1/sendSessionMessage/${phone}`

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({ messageText: message }).toString(),
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      console.error('[whatsapp:wati] http', res.status, txt.slice(0, 500))
      return false
    }
    return true
  } catch (err) {
    console.error('[whatsapp:wati] network error', err?.message || err)
    return false
  }
}

/**
 * @param {{customerName:string, phone:string, serviceType:string, sourceLang:string, targetLang:string}} lead
 * @returns {Promise<boolean>}
 */
export async function sendWhatsAppNotification(lead) {
  try {
    if (!lead || !lead.phone || !lead.customerName) {
      console.warn('[whatsapp] invalid lead payload — skipping')
      return false
    }
    const provider = (process.env.WHATSAPP_PROVIDER || 'twilio').toLowerCase()
    const message  = buildMessage(lead)

    switch (provider) {
      case 'twilio':
        return await sendViaTwilio(lead, message)
      case 'interakt':
        return await sendViaInterakt(lead, message)
      case 'wati':
        return await sendViaWati(lead, message)
      default:
        console.error(`[whatsapp] unknown WHATSAPP_PROVIDER="${provider}"`)
        return false
    }
  } catch (err) {
    // Last-resort guard — contract says never throw.
    console.error('[whatsapp] unexpected error', err?.message || err)
    return false
  }
}

// ---------------------------------------------------------------------------
// One-shot startup smoke test, gated by WHATSAPP_STARTUP_TEST=1.
// The globalThis guard ensures it fires AT MOST ONCE per Node process even if
// HMR reimports this module.
// ---------------------------------------------------------------------------
if (
  process.env.WHATSAPP_STARTUP_TEST === '1' &&
  !globalThis.__brightLanguageWaStartupFired
) {
  globalThis.__brightLanguageWaStartupFired = true
  console.log('[WHATSAPP] Startup test firing (WHATSAPP_STARTUP_TEST=1)…')
  sendViaTwilio({
    customerName: 'Test User',
    phone:        '9870250243',
    serviceType:  'TRANSLATION',
    sourceLang:   'English',
    targetLang:   'Spanish',
  })
    .then((ok) => {
      console.log('[WHATSAPP] Startup test result:', ok ? 'SENT ✓' : 'FAILED ✗')
    })
    .catch((err) => {
      console.error('[WHATSAPP] Startup test threw:', err?.message || err)
    })
}
