'use client'

import { useMemo, useState, useTransition } from 'react'
import { Search, Check, X, RefreshCw, Download, Phone, Globe, Calendar, Loader2 } from 'lucide-react'

const STATUS_VALUES = ['RECEIVED', 'IN_REVIEW', 'QUOTED', 'IN_PROGRESS', 'DELIVERED', 'CANCELLED']

const STATUS_PILL = {
  RECEIVED:    'bg-blue-100   text-blue-800   ring-blue-200   dark:bg-blue-900/40   dark:text-blue-300   dark:ring-blue-700',
  IN_REVIEW:   'bg-amber-100  text-amber-800  ring-amber-200  dark:bg-amber-900/40  dark:text-amber-300  dark:ring-amber-700',
  QUOTED:      'bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-900/40 dark:text-purple-300 dark:ring-purple-700',
  IN_PROGRESS: 'bg-indigo-100 text-indigo-800 ring-indigo-200 dark:bg-indigo-900/40 dark:text-indigo-300 dark:ring-indigo-700',
  DELIVERED:   'bg-green-100  text-green-800  ring-green-200  dark:bg-green-900/40  dark:text-green-300  dark:ring-green-700',
  CANCELLED:   'bg-rose-100   text-rose-800   ring-rose-200   dark:bg-rose-900/40   dark:text-rose-300   dark:ring-rose-700',
}

function isOverdue(quote) {
  if (quote.status !== 'RECEIVED' || !quote.createdAt) return false
  const created = new Date(quote.createdAt)
  return !Number.isNaN(created.getTime()) && Date.now() - created.getTime() > 48 * 60 * 60 * 1000
}

function formatDate(dateInput) {
  if (!dateInput) return '—'
  const d = new Date(dateInput)
  if (Number.isNaN(d.getTime())) return String(dateInput).slice(0, 10) || '—'
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${d.getUTCDate().toString().padStart(2,'0')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}`
}

function formatDateTime(dateInput) {
  if (!dateInput) return '—'
  const d = new Date(dateInput)
  if (Number.isNaN(d.getTime())) return '—'
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  return `${d.getUTCDate().toString().padStart(2,'0')} ${months[d.getUTCMonth()]} ${d.getUTCFullYear()}, ${d.getUTCHours().toString().padStart(2,'0')}:${d.getUTCMinutes().toString().padStart(2,'0')} UTC`
}

function shortId(id) {
  return id ? String(id).slice(0, 8) : '—'
}

function langDisplay(sourceLang, targetLang) {
  const src = (sourceLang || '').trim()
  const tgt = (targetLang || '').trim()
  if (!src && !tgt) return 'Not specified'
  if (!src) return `→ ${tgt}`
  if (!tgt) return src
  return `${src} → ${tgt}`
}

/* ── Small label+value pair used in detail panel ── */
function Field({ label, children }) {
  return (
    <div>
      <p className="text-xs font-medium text-slate-400 dark:text-slate-500">{label}</p>
      <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-200">{children}</p>
    </div>
  )
}

/* ── Expanded detail panel shown below the table ── */
function DetailPanel({ quote, onClose, onSaved }) {
  const [editStatus, setEditStatus] = useState(quote.status)
  const [editNotes,  setEditNotes]  = useState(quote.notes || '')
  const [saving, setSaving]         = useState(false)
  const [saveError, setSaveError]   = useState(null)
  const [savedOk, setSavedOk]       = useState(false)

  const handleSave = async () => {
    setSaving(true)
    setSaveError(null)
    try {
      const res  = await fetch(`/api/quotes/${encodeURIComponent(quote.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: editStatus, notes: editNotes || null }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json?.success) throw new Error(json?.error || `HTTP ${res.status}`)
      onSaved(json.lead || { ...quote, status: editStatus, notes: editNotes })
      setSavedOk(true)
      setTimeout(() => setSavedOk(false), 2500)
    } catch (err) {
      setSaveError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="mt-4 overflow-hidden rounded-2xl border border-brand-orange/40 bg-white shadow-lg dark:border-brand-orange/20 dark:bg-slate-800">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-5 py-4 dark:border-slate-700 dark:bg-slate-900/50">
        <div>
          <h2 className="font-semibold text-brand-navy dark:text-white">{quote.customerName}</h2>
          <p className="mt-0.5 font-mono text-xs text-slate-400">#{shortId(quote.id)}</p>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Quote fields read-only */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-4 p-5 sm:grid-cols-3 lg:grid-cols-4">
        <Field label="Phone">
          <a href={`tel:+91${quote.phone}`} className="text-brand-orange hover:underline">{quote.phone}</a>
        </Field>
        <Field label="Email">{quote.email || '—'}</Field>
        <Field label="Service">{quote.serviceType}</Field>
        <Field label="Languages">{langDisplay(quote.sourceLang, quote.targetLang)}</Field>
        <Field label="Word Count">{quote.wordCount != null ? quote.wordCount.toLocaleString() : '—'}</Field>
        <Field label="Project Date">{quote.projectDate ? formatDate(quote.projectDate) : 'Not specified'}</Field>
        <Field label="WhatsApp">{quote.whatsappSent ? '✓ Sent' : '✗ Not sent'}</Field>
        <Field label="Submitted">{formatDateTime(quote.createdAt)}</Field>
      </div>

      {/* Editable section */}
      <div className="space-y-4 border-t border-slate-200 px-5 py-5 dark:border-slate-700">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Status
            </label>
            <select
              value={editStatus}
              onChange={(e) => setEditStatus(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-navy focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
            >
              {STATUS_VALUES.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Internal Notes
          </label>
          <textarea
            value={editNotes}
            onChange={(e) => setEditNotes(e.target.value)}
            rows={3}
            maxLength={1000}
            placeholder="Add internal notes visible only to admins…"
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-navy placeholder-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500"
          />
        </div>

        {saveError && (
          <p className="text-sm text-rose-600 dark:text-rose-400">{saveError}</p>
        )}

        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-700"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-orange/90 disabled:opacity-60"
          >
            {saving
              ? <><Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving…</>
              : savedOk
              ? <><Check className="h-3.5 w-3.5" /> Saved</>
              : 'Save changes'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ── Status select shared by card and table row ── */
function StatusSelect({ quote, rowSaving, updateStatus }) {
  return (
    <select
      value={quote.status}
      disabled={!!rowSaving[quote.id]}
      onChange={(e) => updateStatus(quote, e.target.value)}
      onClick={(e) => e.stopPropagation()}
      className="rounded-lg border border-slate-300 bg-white px-2 py-1.5 text-xs font-medium text-brand-navy focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 disabled:opacity-60 dark:border-slate-600 dark:bg-slate-700 dark:text-white"
    >
      {STATUS_VALUES.map((s) => <option key={s} value={s}>{s}</option>)}
    </select>
  )
}

export default function QuotesClient({ initialQuotes = [], loadError = null }) {
  const [quotes, setQuotes]               = useState(initialQuotes)
  const [query, setQuery]                 = useState('')
  const [statusFilter, setStatusFilter]   = useState('ALL')
  const [rowSaving, setRowSaving]         = useState({})
  const [selectedQuote, setSelectedQuote] = useState(null)
  const [isPending, startTransition]      = useTransition()

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return quotes.filter((qt) => {
      if (statusFilter !== 'ALL' && qt.status !== statusFilter) return false
      if (!q) return true
      return (
        (qt.customerName || '').toLowerCase().includes(q) ||
        (qt.phone || '').toLowerCase().includes(q) ||
        (qt.serviceType || '').toLowerCase().includes(q)
      )
    })
  }, [quotes, query, statusFilter])

  const updateStatus = async (quote, newStatus) => {
    const previous = quote.status
    if (previous === newStatus) return
    setQuotes((all) => all.map((qt) => (qt.id === quote.id ? { ...qt, status: newStatus } : qt)))
    setRowSaving((s) => ({ ...s, [quote.id]: true }))
    try {
      const res  = await fetch(`/api/quotes/${encodeURIComponent(quote.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json?.success) throw new Error(json?.error || `HTTP ${res.status}`)
      if (json.lead) setQuotes((all) => all.map((qt) => (qt.id === quote.id ? { ...qt, ...json.lead } : qt)))
    } catch (err) {
      console.error('[admin/quotes] status update failed, reverting:', err?.message || err)
      setQuotes((all) => all.map((qt) => (qt.id === quote.id ? { ...qt, status: previous } : qt)))
    } finally {
      setRowSaving((s) => { const c = { ...s }; delete c[quote.id]; return c })
    }
  }

  const selectQuote = (quote) => {
    setSelectedQuote((prev) => (prev?.id === quote.id ? null : quote))
  }

  const handleDetailSaved = (updated) => {
    setQuotes((all) => all.map((qt) => (qt.id === updated.id ? { ...qt, ...updated } : qt)))
    setSelectedQuote((prev) => (prev ? { ...prev, ...updated } : prev))
  }

  const refresh = () => { startTransition(() => { window.location.reload() }) }

  const exportCsv = () => {
    const cols = ['Quote ID','Customer','Phone','Email','Service','Source Lang','Target Lang','Word Count','Project Date','Status','WA Sent','Created']
    const rows = filtered.map((qt) => [
      qt.id, qt.customerName, qt.phone, qt.email || '',
      qt.serviceType, qt.sourceLang, qt.targetLang,
      qt.wordCount ?? '', qt.projectDate || '',
      qt.status, qt.whatsappSent ? 'Yes' : 'No', formatDateTime(qt.createdAt),
    ])
    const csv = [cols, ...rows]
      .map((r) => r.map((v) => `"${String(v ?? '').replace(/"/g, '""')}"`).join(','))
      .join('\r\n')
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
    const url  = URL.createObjectURL(blob)
    const a    = document.createElement('a')
    a.href     = url
    a.download = `quotes-${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const counts = useMemo(() => {
    const c = { ALL: quotes.length, RECEIVED: 0, IN_REVIEW: 0, QUOTED: 0, IN_PROGRESS: 0, DELIVERED: 0, CANCELLED: 0 }
    for (const qt of quotes) if (c[qt.status] !== undefined) c[qt.status] += 1
    return c
  }, [quotes])

  return (
    <div className="min-h-full bg-slate-100 px-4 py-6 dark:bg-slate-950 lg:px-8 lg:py-8">
      <div className="mx-auto max-w-7xl">

        {/* ── Page header ── */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Quotes</h1>
            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
              {counts.ALL} total · {counts.RECEIVED} received · {counts.DELIVERED} delivered
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={exportCsv}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <Download className="h-3.5 w-3.5" />
              Export CSV
            </button>
            <button
              onClick={refresh}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
            >
              <RefreshCw className={'h-3.5 w-3.5 ' + (isPending ? 'animate-spin' : '')} />
              Refresh
            </button>
          </div>
        </div>

        {loadError && (
          <div role="alert" className="mt-4 rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm text-rose-800 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300">
            {loadError}
          </div>
        )}

        {/* ── Status filter chips ── */}
        <div className="mt-5 flex flex-wrap gap-2">
          {['ALL', ...STATUS_VALUES].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={[
                'rounded-full px-3 py-1.5 text-xs font-semibold transition',
                statusFilter === s
                  ? 'bg-brand-navy text-white dark:bg-brand-orange'
                  : 'bg-white text-slate-600 border border-slate-300 hover:border-slate-400 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700 dark:hover:border-slate-500',
              ].join(' ')}
            >
              {s === 'ALL' ? 'All' : s} ({s === 'ALL' ? counts.ALL : counts[s] || 0})
            </button>
          ))}
        </div>

        {/* ── Search bar ── */}
        <div className="mt-3">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by name, phone, or service…"
              className="w-full rounded-xl border border-slate-300 bg-white py-2.5 pl-9 pr-4 text-sm text-brand-navy shadow-sm focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:placeholder-slate-500"
            />
          </label>
        </div>

        {/* ── Mobile card list (hidden md+) ── */}
        <div className="mt-4 space-y-3 md:hidden">
          {filtered.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              {quotes.length === 0
                ? 'No quotes yet. Submit the quote form to see one appear here.'
                : 'No quotes match your search / filter.'}
            </div>
          ) : filtered.map((quote) => (
            <div
              key={quote.id}
              onClick={() => selectQuote(quote)}
              className={[
                'cursor-pointer rounded-2xl border bg-white p-4 shadow-sm transition dark:bg-slate-800',
                selectedQuote?.id === quote.id
                  ? 'border-brand-orange dark:border-brand-orange/60'
                  : 'border-slate-200 dark:border-slate-700',
              ].join(' ')}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-brand-navy dark:text-white">{quote.customerName}</p>
                  <a
                    href={`tel:+91${quote.phone}`}
                    onClick={(e) => e.stopPropagation()}
                    className="flex items-center gap-1 text-sm text-slate-500 hover:text-brand-orange dark:text-slate-400"
                  >
                    <Phone className="h-3 w-3" />
                    {quote.phone}
                  </a>
                </div>
                <div className="flex shrink-0 flex-col items-end gap-1">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${STATUS_PILL[quote.status] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}>
                    {quote.status}
                  </span>
                  {isOverdue(quote) && (
                    <span className="inline-flex items-center rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white">Overdue</span>
                  )}
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
                <div>
                  <p className="flex items-center gap-1 text-slate-400 dark:text-slate-500"><Globe className="h-3 w-3" /> Service</p>
                  <p className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">{quote.serviceType}</p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-slate-400 dark:text-slate-500"><Globe className="h-3 w-3" /> Languages</p>
                  <p className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                    {langDisplay(quote.sourceLang, quote.targetLang)}
                  </p>
                </div>
                <div>
                  <p className="flex items-center gap-1 text-slate-400 dark:text-slate-500"><Calendar className="h-3 w-3" /> Project Date</p>
                  <p className="mt-0.5 font-medium text-slate-700 dark:text-slate-200">
                    {quote.projectDate ? formatDate(quote.projectDate) : 'Not specified'}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400 dark:text-slate-500">WA Sent</p>
                  <p className="mt-0.5 font-semibold">
                    {quote.whatsappSent
                      ? <span className="text-green-600 dark:text-green-400">✓ Sent</span>
                      : <span className="text-rose-500 dark:text-rose-400">✗ Not sent</span>}
                  </p>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-700">
                <p className="text-[11px] text-slate-400 dark:text-slate-500">{formatDateTime(quote.createdAt)}</p>
                <StatusSelect quote={quote} rowSaving={rowSaving} updateStatus={updateStatus} />
              </div>
            </div>
          ))}
        </div>

        {/* ── Desktop table (hidden below md) ── */}
        <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800 md:block">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-brand-navy text-white dark:bg-slate-900">
                  <th className="px-4 py-3 font-semibold">Quote ID</th>
                  <th className="px-4 py-3 font-semibold">Customer</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Service</th>
                  <th className="px-4 py-3 font-semibold">Languages</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="px-4 py-3 font-semibold">Date</th>
                  <th className="px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-12 text-center text-sm text-slate-500 dark:text-slate-400">
                      {quotes.length === 0
                        ? 'No quotes yet. Submit the quote form on the home page to see one appear here.'
                        : 'No quotes match your search / filter.'}
                    </td>
                  </tr>
                ) : filtered.map((quote, i) => (
                  <tr
                    key={quote.id}
                    onClick={() => selectQuote(quote)}
                    className={[
                      'cursor-pointer border-b border-slate-100 align-top transition-colors dark:border-slate-700/60',
                      selectedQuote?.id === quote.id
                        ? 'bg-brand-orange/5 dark:bg-brand-orange/10'
                        : i % 2 === 0
                        ? 'bg-white hover:bg-slate-50 dark:bg-slate-800 dark:hover:bg-slate-700/40'
                        : 'bg-slate-50/60 hover:bg-slate-100/80 dark:bg-slate-800/40 dark:hover:bg-slate-700/40',
                    ].join(' ')}
                  >
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">
                      {shortId(quote.id)}
                    </td>
                    <td className="px-4 py-3 font-semibold text-brand-navy dark:text-white">{quote.customerName}</td>
                    <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                      <a
                        href={`tel:+91${quote.phone}`}
                        onClick={(e) => e.stopPropagation()}
                        className="hover:text-brand-orange"
                      >
                        {quote.phone}
                      </a>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-300">
                      {quote.serviceType}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-300">
                      {langDisplay(quote.sourceLang, quote.targetLang)}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold ring-1 ring-inset ${STATUS_PILL[quote.status] || 'bg-slate-100 text-slate-700 ring-slate-200'}`}>
                          {quote.status}
                        </span>
                        {isOverdue(quote) && (
                          <span className="inline-flex items-center rounded-full bg-rose-600 px-2 py-0.5 text-[11px] font-bold text-white">Overdue</span>
                        )}
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-700 dark:text-slate-300">
                      {quote.projectDate ? formatDate(quote.projectDate) : '—'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <StatusSelect quote={quote} rowSaving={rowSaving} updateStatus={updateStatus} />
                        {quote.whatsappSent ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400" title="WhatsApp sent">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        ) : (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-400" title="Not sent">
                            <X className="h-3.5 w-3.5" />
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Detail panel (shown when a row is selected) ── */}
        {selectedQuote && (
          <DetailPanel
            key={selectedQuote.id}
            quote={selectedQuote}
            onClose={() => setSelectedQuote(null)}
            onSaved={handleDetailSaved}
          />
        )}

        <p className="mt-3 text-xs text-slate-400 dark:text-slate-500">
          Showing {filtered.length} of {quotes.length} quotes.{selectedQuote ? ' Click a row to toggle detail panel.' : ' Click any row to expand details.'}
        </p>
      </div>
    </div>
  )
}
