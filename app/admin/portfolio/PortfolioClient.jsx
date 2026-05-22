'use client'

import { useState } from 'react'
import { Trash2, Plus, Loader2 } from 'lucide-react'

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

const EMPTY_FORM = { title: '', tag: '', client: '', metric: '', excerpt: '', slug: '' }

const INPUT_CLS = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-brand-navy placeholder-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-600 dark:bg-slate-700 dark:text-white'

export default function PortfolioClient({ initialCaseStudies = [], loadError = null }) {
  const [caseStudies, setCaseStudies] = useState(initialCaseStudies)
  const [form, setForm]               = useState(EMPTY_FORM)
  const [saving, setSaving]           = useState(false)
  const [deleting, setDeleting]       = useState({})
  const [formError, setFormError]     = useState(null)

  const handleFormChange = (field, value) => {
    setForm((prev) => {
      const next = { ...prev, [field]: value }
      if (field === 'title') next.slug = slugify(value)
      return next
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.title.trim()) { setFormError('Title is required.'); return }
    setSaving(true)
    setFormError(null)
    try {
      const res = await fetch('/api/admin/case-studies', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Failed to create case study')
      setCaseStudies((prev) => [data.caseStudy, ...prev])
      setForm(EMPTY_FORM)
    } catch (err) {
      setFormError(err.message)
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this case study?')) return
    setDeleting((prev) => ({ ...prev, [id]: true }))
    try {
      const res = await fetch(`/api/admin/case-studies/${id}`, { method: 'DELETE' })
      if (res.ok) setCaseStudies((prev) => prev.filter((c) => c.id !== id))
    } finally {
      setDeleting((prev) => ({ ...prev, [id]: false }))
    }
  }

  return (
    <div className="space-y-6 p-4 lg:p-6">
      <div>
        <h1 className="text-2xl font-bold text-brand-navy dark:text-white">Portfolio</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Manage case studies shown on the public site</p>
      </div>

      {loadError && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-800 dark:bg-rose-900/20 dark:text-rose-400">
          {loadError}
        </div>
      )}

      {/* Add Case Study Form */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <h2 className="mb-4 text-sm font-semibold text-brand-navy dark:text-white">Add Case Study</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Title *</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleFormChange('title', e.target.value)}
              placeholder="Case study title"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Industry Tag</label>
            <input
              type="text"
              value={form.tag}
              onChange={(e) => handleFormChange('tag', e.target.value)}
              placeholder='e.g. "Gaming · 11 languages"'
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Client</label>
            <input
              type="text"
              value={form.client}
              onChange={(e) => handleFormChange('client', e.target.value)}
              placeholder="Client name"
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Result Metric</label>
            <input
              type="text"
              value={form.metric}
              onChange={(e) => handleFormChange('metric', e.target.value)}
              placeholder='e.g. "-11 days vs plan"'
              className={INPUT_CLS}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => handleFormChange('slug', e.target.value)}
              placeholder="auto-generated from title"
              className={INPUT_CLS}
            />
          </div>
          <div className="sm:col-span-2">
            <label className="mb-1 block text-xs font-medium text-slate-600 dark:text-slate-400">Excerpt</label>
            <textarea
              value={form.excerpt}
              onChange={(e) => handleFormChange('excerpt', e.target.value)}
              placeholder="Short description of the case study"
              rows={3}
              className={INPUT_CLS}
            />
          </div>
          {formError && (
            <p className="sm:col-span-2 text-sm text-rose-600 dark:text-rose-400">{formError}</p>
          )}
          <div className="sm:col-span-2 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-brand-orange px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-orange/90 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
              Add Case Study
            </button>
          </div>
        </form>
      </div>

      {/* Case Studies Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-700">
          <h2 className="text-sm font-semibold text-brand-navy dark:text-white">
            Case Studies{' '}
            <span className="ml-1 text-xs font-normal text-slate-400">({caseStudies.length})</span>
          </h2>
        </div>
        {caseStudies.length === 0 ? (
          <div className="px-5 py-10 text-center text-sm text-slate-400">
            No case studies yet. Add one above.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700">
                  {['Title', 'Industry Tag', 'Client', 'Result Metric', 'Slug', 'Actions'].map((h, i) => (
                    <th
                      key={h}
                      className={[
                        'px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500 dark:text-slate-400',
                        i === 5 ? 'text-right' : 'text-left',
                      ].join(' ')}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {caseStudies.map((cs) => (
                  <tr key={cs.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/50">
                    <td className="px-5 py-3 font-medium text-brand-navy dark:text-white">{cs.title}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{cs.tag || '—'}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{cs.client || '—'}</td>
                    <td className="px-5 py-3 text-slate-600 dark:text-slate-300">{cs.metric || '—'}</td>
                    <td className="px-5 py-3 font-mono text-xs text-slate-500 dark:text-slate-400">{cs.slug || '—'}</td>
                    <td className="px-5 py-3 text-right">
                      <button
                        onClick={() => handleDelete(cs.id)}
                        disabled={!!deleting[cs.id]}
                        className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-medium text-rose-600 transition hover:bg-rose-50 disabled:opacity-50 dark:text-rose-400 dark:hover:bg-rose-900/20"
                      >
                        {deleting[cs.id]
                          ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                          : <Trash2 className="h-3.5 w-3.5" />}
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
