// Provider-agnostic WhatsApp sender for Bright Language Solutions quote notifications.
// Switch provider by changing WHATSAPP_PROVIDER env var.
// Supported: "twilio" | "interakt" | "wati"
//
// Contract:
//   sendWhatsAppNotification(lead) -> Promise<boolean|{sent:boolean,logged:boolean}>
//     true  => message accepted by provider
//     false => anything else (missing creds, network error, provider 4xx/5xx)
// Never throws. Errors are console-logged only — must not block quote creation.

function buildMessage(lead) {
  return `Hello! 👋 New quote request on Bright Language Solutions.

👤 Name: ${lead.customerName}
📞 Phone: ${lead.phone}
📧 Email: ${lead.email || 'Not provided'}
🔧 Service: ${lead.serviceType}
🌐 Languages: ${lead.sourceLang} → ${lead.targetLang}
📅 Project Date: ${lead.projectDate || 'Flexible'}
📝 Notes: ${lead.notes || 'None'}

⚡ Please respond within 4 hours.
— BLS Auto-Alert`
}

async function sendViaTwilio(lead, message) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken  = process.env.TWILIO_AUTH_TOKEN
  const from       = process.env.TWILIO_WHATSAPP_FROM

  if (!accountSid || !authToken || !from) {
    console.log('[WHATSAPP] Twilio credentials missing — skipping')
    return false
  }

  const to = 'whatsapp:+918368440255'

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
        body: new URLSearchParams({ From: from, To: to, Body: message }),
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

  const payload = {
    countryCode: '+91',
    phoneNumber: '8368440255',
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
  const phone = '918368440255'
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
 * @param {{customerName:string, phone:string, email?:string, serviceType:string, sourceLang:string, targetLang:string, projectDate?:string, notes?:string}} lead
 * @returns {Promise<boolean|{sent:boolean,logged:boolean}>}
 */
export async function sendWhatsAppNotification(lead) {
  try {
    if (!lead || !lead.phone || !lead.customerName) {
      console.warn('[whatsapp] invalid lead payload — skipping')
      return false
    }
    const provider = process.env.WHATSAPP_PROVIDER?.toLowerCase()
    const message  = buildMessage(lead)

    if (!provider) {
      console.log('\n📱 WhatsApp Alert (no provider configured)')
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('To: +91 83684 40255')
      console.log('Message:\n', message)
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')
      console.log('Set WHATSAPP_PROVIDER + credentials in .env to activate\n')
      return { sent: false, logged: true }
    }

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

export async function testWhatsApp() {
  return sendWhatsAppNotification({
    customerName: 'Test Alert',
    phone: '8368440255',
    email: 'info@brightlanguagesolutions.com',
    serviceType: 'TRANSLATION',
    sourceLang: 'English',
    targetLang: 'Hindi',
    projectDate: '2026-12-01',
    notes: 'Test message — BLS WhatsApp auto-alert system.'
  })
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
  sendViaTwilio(
    { customerName: 'Test User', phone: '9870250243', serviceType: 'TRANSLATION', sourceLang: 'English', targetLang: 'Spanish' },
    buildMessage({ customerName: 'Test User', phone: '9870250243', serviceType: 'TRANSLATION', sourceLang: 'English', targetLang: 'Spanish' }),
  )
    .then((ok) => {
      console.log('[WHATSAPP] Startup test result:', ok ? 'SENT ✓' : 'FAILED ✗')
    })
    .catch((err) => {
      console.error('[WHATSAPP] Startup test threw:', err?.message || err)
    })
}
