'use client'

import { useState } from 'react'
import services from '@/data/services'
import { mapServiceType } from '@/lib/quoteSchema'

export default function QuoteForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0]?.title || '',
    languages: '',
    notes: '',
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = (key) => (e) => setFields((f) => ({ ...f, [key]: e.target.value }))

  const submit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/quotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: fields.name,
          email: fields.email,
          phone: fields.phone,
          serviceType: mapServiceType(fields.service),
          notes: [fields.languages && `Languages: ${fields.languages}`, fields.notes].filter(Boolean).join('\n'),
        }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || `Request failed (${res.status})`)
      }
      setStatus('success')
    } catch (err) {
      setErrorMsg(err.message || 'Something went wrong. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div
        style={{
          background: '#ffffff',
          borderRadius: 24,
          padding: 30,
          textAlign: 'center',
          color: '#06184F',
        }}
      >
        <span
          style={{
            display: 'inline-block',
            padding: '4px 14px',
            borderRadius: 999,
            background: '#DEF5EE',
            color: '#0E7C66',
            fontSize: 12,
            fontFamily: 'JetBrains Mono, monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.14em',
            marginBottom: 20,
          }}
        >
          Brief received
        </span>
        <h3
          style={{
            fontFamily: 'Bricolage Grotesque, system-ui',
            fontSize: 24,
            fontWeight: 600,
            color: '#06184F',
            letterSpacing: '-0.02em',
            marginBottom: 12,
          }}
        >
          Thanks. A producer is on it.
        </h3>
        <p style={{ fontSize: 15, color: '#5A6577', lineHeight: 1.65 }}>
          You&rsquo;ll hear back within four working hours.
        </p>
      </div>
    )
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    borderRadius: 10,
    border: '1.5px solid #E2E6EE',
    fontSize: 15,
    color: '#06184F',
    background: '#ffffff',
    outline: 'none',
    fontFamily: 'Manrope, system-ui',
    boxSizing: 'border-box',
    transition: 'border-color 0.2s',
  }

  return (
    <form
      onSubmit={submit}
      className="bls-form"
      style={{ background: '#ffffff', borderRadius: 24, padding: 30, display: 'flex', flexDirection: 'column', gap: 16 }}
    >
      <input
        type="text"
        placeholder="Priya Sharma"
        required
        value={fields.name}
        onChange={set('name')}
        style={inputStyle}
        aria-label="Your name"
      />
      <input
        type="email"
        placeholder="priya@company.com"
        required
        value={fields.email}
        onChange={set('email')}
        style={inputStyle}
        aria-label="Work email"
      />
      <input
        type="tel"
        placeholder="Your phone number (e.g. 98765 43210)"
        value={fields.phone}
        onChange={set('phone')}
        required
        style={inputStyle}
        aria-label="Phone number"
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <select
          value={fields.service}
          onChange={set('service')}
          style={{ ...inputStyle }}
          aria-label="Service"
        >
          {services.map((s) => (
            <option key={s.slug} value={s.title}>{s.title}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="e.g. EN → HI, TA"
          value={fields.languages}
          onChange={set('languages')}
          style={inputStyle}
          aria-label="Target languages"
        />
      </div>

      <textarea
        placeholder="What needs translating? Paste a brief or describe your project…"
        rows={3}
        value={fields.notes}
        onChange={set('notes')}
        style={{ ...inputStyle, resize: 'vertical' }}
        aria-label="What needs translating?"
      />

      {status === 'error' && (
        <div
          style={{
            background: '#FEE2E2',
            color: '#991B1B',
            fontSize: 13,
            padding: '10px 14px',
            borderRadius: 8,
          }}
        >
          {errorMsg}
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="btn accent"
        style={{ width: '100%', justifyContent: 'center', opacity: status === 'loading' ? 0.7 : 1, background: '#F5B819', color: '#06184F' }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Brief →'}
      </button>

      <p
        style={{
          fontSize: 11,
          fontFamily: 'JetBrains Mono, monospace',
          color: '#9BA8BB',
          textAlign: 'center',
          margin: 0,
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
        }}
      >
        NDA by default · We never train on your content.
      </p>
    </form>
  )
}
