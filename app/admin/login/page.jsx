'use client'

import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Lock, ShieldCheck, LogIn } from 'lucide-react'

function LoginForm() {
  const searchParams = useSearchParams()
  const next = searchParams.get('next') || '/admin/quotes'

  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const onSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const json = await res.json().catch(() => ({}))
      if (!res.ok || !json?.success) {
        setError(json?.error || 'Incorrect password')
        setLoading(false)
        return
      }
      window.location.assign(next)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-3.5rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-700 dark:bg-slate-800">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-navy text-white dark:bg-brand-orange">
              <ShieldCheck className="h-5 w-5" />
            </span>
            <div>
              <h1 className="text-xl font-bold text-brand-navy dark:text-white">Admin Login</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Bright Language Solutions quotes console</p>
            </div>
          </div>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block">
              <span className="mb-1.5 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                <Lock className="h-3.5 w-3.5" /> Admin password
              </span>
              <input
                autoFocus
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-brand-navy placeholder-slate-400 focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/30 dark:border-slate-600 dark:bg-slate-700 dark:text-white dark:placeholder-slate-500 dark:focus:border-brand-orange"
                placeholder="••••••••"
              />
            </label>

            {error && (
              <div
                role="alert"
                className="rounded-xl border border-rose-300 bg-rose-50 px-3 py-2.5 text-sm text-rose-700 dark:border-rose-700 dark:bg-rose-900/30 dark:text-rose-300"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !password}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-brand-orange px-5 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-brand-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn className="h-4 w-4" />
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500">
            Protected area. Unauthorised access is logged.
          </p>
        </div>
      </div>
    </div>
  )
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <LoginForm />
    </Suspense>
  )
}
