'use client'

import { useState } from 'react'
import services from '@/data/services'
import { mapServiceType } from '@/lib/quoteSchema'

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239BA8BB' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`

export default function QuoteForm() {
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    service: services[0]?.title || '',
    languages: '',
    notes: '',
  })
  const [status, setStatus] = useState('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [focused, setFocused] = useState('')

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
          targetLang: fields.languages || undefined,
          notes: fields.notes,
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
          background: '#F0FDF4',
          border: '1px solid #BBF7D0',
          borderRadius: 16,
          padding: 32,
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 48, lineHeight: 1, marginBottom: 16 }}>✅</div>
        <h3
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: '#06184F',
            margin: '0 0 8px',
          }}
        >
          Brief received!
        </h3>
        <p style={{ fontSize: 14, color: '#5A6577', margin: 0 }}>
          A producer will be in touch within 4 hours.
        </p>
      </div>
    )
  }

  const getInputStyle = (name) => ({
    width: '100%',
    padding: '14px 16px',
    borderRadius: 10,
    border: `1.5px solid ${focused === name ? '#1466DB' : '#E2E6EE'}`,
    fontSize: 15,
    color: '#06184F',
    background: focused === name ? '#ffffff' : '#F8F9FF',
    outline: 'none',
    fontFamily: 'Manrope, system-ui',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s, background 0.15s, box-shadow 0.15s',
    boxShadow: focused === name ? '0 0 0 3px rgba(20,102,219,0.1)' : 'none',
  })

  const labelStyle = {
    display: 'block',
    fontSize: 12,
    fontWeight: 600,
    color: '#06184F',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    marginBottom: 6,
  }

  const fp = (name) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(''),
  })

  return (
    <form
      onSubmit={submit}
      className="bls-quote-form"
      style={{
        background: '#ffffff',
        borderRadius: 24,
        padding: '36px 32px',
        boxShadow: '0 32px 80px -16px rgba(0,0,0,0.35)',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
      }}
    >
      <style>{`
        .bls-quote-form input::placeholder,
        .bls-quote-form textarea::placeholder { color: #9BA8BB; }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 8 }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: '#06184F', margin: '0 0 6px' }}>
          Get a Free Quote
        </h2>
        <p style={{ fontSize: 14, color: '#5A6577', margin: 0 }}>
          We reply within 4 hours. No obligation.
        </p>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div
          style={{
            background: '#FEF2F2',
            border: '1px solid #FECACA',
            borderRadius: 10,
            color: '#DC2626',
            padding: '12px 16px',
            fontSize: 14,
            marginBottom: 0,
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Name */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Your Name</label>
        <input
          type="text"
          placeholder="Priya Sharma"
          required
          value={fields.name}
          onChange={set('name')}
          style={getInputStyle('name')}
          {...fp('name')}
        />
      </div>

      {/* Email */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Work Email</label>
        <input
          type="email"
          placeholder="priya@company.com"
          required
          value={fields.email}
          onChange={set('email')}
          style={getInputStyle('email')}
          {...fp('email')}
        />
      </div>

      {/* Phone */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Phone Number</label>
        <input
          type="tel"
          placeholder="e.g. 98765 43210"
          required
          value={fields.phone}
          onChange={set('phone')}
          style={getInputStyle('phone')}
          {...fp('phone')}
        />
      </div>

      {/* Service Type */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Service Type</label>
        <select
          value={fields.service}
          onChange={set('service')}
          style={{
            ...getInputStyle('service'),
            appearance: 'none',
            WebkitAppearance: 'none',
            backgroundImage: chevronSvg,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 14px center',
            paddingRight: 40,
            cursor: 'pointer',
          }}
          {...fp('service')}
        >
          {services.map((s) => (
            <option key={s.slug} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </div>

      {/* Language Pair (optional) */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Language Pair (optional)</label>
        <input
          type="text"
          placeholder="e.g. English → Hindi, Tamil"
          value={fields.languages}
          onChange={set('languages')}
          style={getInputStyle('languages')}
          {...fp('languages')}
        />
      </div>

      {/* Notes */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <label style={labelStyle}>Project Brief</label>
        <textarea
          placeholder="What needs translating? Paste a brief or describe your project…"
          rows={3}
          value={fields.notes}
          onChange={set('notes')}
          style={{ ...getInputStyle('notes'), resize: 'vertical' }}
          {...fp('notes')}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: '#F5B819',
          color: '#06184F',
          fontSize: 17,
          fontWeight: 700,
          padding: '16px 24px',
          borderRadius: 999,
          width: '100%',
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          marginTop: 8,
          transition: 'transform 0.15s, box-shadow 0.15s',
          opacity: status === 'loading' ? 0.7 : 1,
          fontFamily: 'Manrope, system-ui',
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,184,25,0.4)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = 'none'
        }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Brief → We reply in 4 hrs'}
      </button>

      {/* Footer note */}
      <p style={{ fontSize: 12, color: '#9BA8BB', textAlign: 'center', margin: 0 }}>
        🔒 NDA by default · We never train on your content.
      </p>
    </form>
  )
}
