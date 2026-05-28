'use client'

import { useState } from 'react'
import { User, Mail, Phone, Layers, Globe, FileText } from 'lucide-react'
import services from '@/data/services'
import { mapServiceType } from '@/lib/quoteSchema'

const chevronSvg = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2395A0BD' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`

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
          background: '#0D2A1A',
          border: '1px solid #166534',
          borderRadius: 16,
          padding: '40px 32px',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 52, lineHeight: 1, marginBottom: 16 }}>✅</div>
        <h3 style={{ fontSize: 24, fontWeight: 700, color: '#4ADE80', margin: '0 0 8px' }}>
          Brief received!
        </h3>
        <p style={{ fontSize: 15, color: '#95A0BD', margin: 0 }}>
          A producer will be in touch within 4 hours.
        </p>
      </div>
    )
  }

  const inputStyle = (name) => ({
    width: '100%',
    padding: '10px 14px',
    borderRadius: 10,
    border: `1.5px solid ${focused === name ? '#1466DB' : '#1F2D55'}`,
    fontSize: 14,
    color: '#F4F7FE',
    background: '#0B1A3D',
    outline: 'none',
    fontFamily: 'Manrope, system-ui',
    boxSizing: 'border-box',
    transition: 'border-color 0.15s, box-shadow 0.15s',
    boxShadow: focused === name ? '0 0 0 3px rgba(20,102,219,0.2)' : 'none',
  })

  const fp = (name) => ({
    onFocus: () => setFocused(name),
    onBlur: () => setFocused(''),
  })

  const labelStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 11,
    fontWeight: 600,
    color: '#95A0BD',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    marginBottom: 6,
  }

  const fieldWrap = { display: 'flex', flexDirection: 'column', marginBottom: 10 }

  return (
    <form
      onSubmit={submit}
      className="bls-form-dark"
      style={{
        background: '#0D1F4A',
        border: '1px solid #1F2D55',
        borderRadius: 24,
        padding: '24px 28px',
        boxShadow: '0 32px 80px -16px rgba(0,0,0,0.5)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 16 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', margin: '0 0 6px' }}>
          Get a Free Quote
        </h2>
        <p style={{ fontSize: 14, color: '#95A0BD', margin: 0 }}>
          We reply within 4 hours. No obligation.
        </p>
      </div>

      {/* Error banner */}
      {status === 'error' && (
        <div
          style={{
            background: 'rgba(220,38,38,0.1)',
            border: '1px solid rgba(220,38,38,0.3)',
            borderRadius: 10,
            color: '#FCA5A5',
            padding: '12px 16px',
            fontSize: 14,
            marginBottom: 16,
          }}
        >
          {errorMsg}
        </div>
      )}

      {/* Row 1 */}
      <div className="field-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={fieldWrap}>
          <label style={labelStyle}>
            <User size={16} color="#1466DB" />
            Your Name
          </label>
          <input
            type="text"
            placeholder="Priya Sharma"
            required
            value={fields.name}
            onChange={set('name')}
            style={inputStyle('name')}
            {...fp('name')}
          />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>
            <Phone size={16} color="#1466DB" />
            Phone Number
          </label>
          <input
            type="tel"
            placeholder="e.g. 98765 43210"
            required
            value={fields.phone}
            onChange={set('phone')}
            style={inputStyle('phone')}
            {...fp('phone')}
          />
        </div>
      </div>

      {/* Row 2 */}
      <div className="field-row-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <div style={fieldWrap}>
          <label style={labelStyle}>
            <Mail size={16} color="#1466DB" />
            Work Email
          </label>
          <input
            type="email"
            placeholder="priya@company.com"
            value={fields.email}
            onChange={set('email')}
            style={inputStyle('email')}
            {...fp('email')}
          />
        </div>
        <div style={fieldWrap}>
          <label style={labelStyle}>
            <Layers size={16} color="#1466DB" />
            Service Type
          </label>
          <select
            value={fields.service}
            onChange={set('service')}
            style={{
              ...inputStyle('service'),
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
              <option key={s.slug} value={s.title} style={{ background: '#0D1F4A' }}>
                {s.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Row 3 - full width */}
      <div style={fieldWrap}>
        <label style={labelStyle}>
          <Globe size={16} color="#1466DB" />
          Language Pair
        </label>
        <input
          type="text"
          placeholder="e.g. English → Hindi, Tamil"
          value={fields.languages}
          onChange={set('languages')}
          style={inputStyle('languages')}
          {...fp('languages')}
        />
      </div>

      {/* Row 4 - full width */}
      <div style={fieldWrap}>
        <label style={labelStyle}>
          <FileText size={16} color="#1466DB" />
          Project Brief
        </label>
        <textarea
          placeholder="What needs translating? Paste a brief or describe your project…"
          rows={3}
          value={fields.notes}
          onChange={set('notes')}
          style={{ ...inputStyle('notes'), resize: 'vertical' }}
          {...fp('notes')}
        />
      </div>

      {/* Trust badges */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: 6 }}>
        {['🔒 NDA', '⚡ 4hr reply'].map((badge) => (
          <span
            key={badge}
            style={{
              fontSize: 11,
              color: '#95A0BD',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 999,
              padding: '4px 10px',
            }}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          background: 'linear-gradient(135deg, #F5B819, #D89E0B)',
          color: '#06184F',
          fontSize: 15,
          fontWeight: 800,
          padding: '13px 24px',
          borderRadius: 999,
          width: '100%',
          border: 'none',
          cursor: status === 'loading' ? 'not-allowed' : 'pointer',
          marginTop: 8,
          letterSpacing: '-0.01em',
          boxShadow: '0 8px 24px rgba(245,184,25,0.3)',
          transition: 'transform 0.15s, box-shadow 0.15s',
          opacity: status === 'loading' ? 0.7 : 1,
          fontFamily: 'Manrope, system-ui',
        }}
        onMouseEnter={(e) => {
          if (status !== 'loading') {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(245,184,25,0.45)'
          }
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)'
          e.currentTarget.style.boxShadow = '0 8px 24px rgba(245,184,25,0.3)'
        }}
      >
        {status === 'loading' ? 'Sending…' : 'Send Brief → We reply in 4 hrs'}
      </button>

      {/* Footer note */}
      <p style={{ fontSize: 12, color: '#3D4F6E', textAlign: 'center', margin: '8px 0 0' }}>
        We never train on your content.
      </p>
    </form>
  )
}
