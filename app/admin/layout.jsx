'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Users, BarChart2, LogOut, Menu, X,
  Sun, Moon, ShieldCheck, ChevronRight,
  FileText, Receipt, CreditCard, Images,
} from 'lucide-react'

const NAV = [
  { href: '/admin/quotes',      label: 'Quotes',      icon: Users },
  { href: '/admin/analytics',   label: 'Analytics',   icon: BarChart2 },
  { href: '/admin/quotations',  label: 'Quotations',  icon: FileText },
  { href: '/admin/invoices',    label: 'Invoices',    icon: Receipt },
  { href: '/admin/payments',    label: 'Payments',    icon: CreditCard },
  { href: '/admin/portfolio',   label: 'Portfolio',   icon: Images },
]

function ThemeToggle() {
  const [dark, setDark] = useState(false)

  useEffect(() => {
    setDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const html   = document.documentElement
    const isDark = html.classList.contains('dark')
    html.classList.toggle('dark', !isDark)
    localStorage.setItem('theme', isDark ? 'light' : 'dark')
    setDark(!isDark)
  }

  return (
    <button
      onClick={toggle}
      title={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700"
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}

function Sidebar({ open, onClose, onLogout, pathname }) {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={[
          'fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-brand-navy',
          'transition-transform duration-300 ease-in-out',
          'lg:static lg:z-auto lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-full',
        ].join(' ')}
      >
        {/* Brand */}
        <div className="flex h-16 shrink-0 items-center gap-3 border-b border-white/10 px-5">
          <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-brand-orange">
            <ShieldCheck className="h-4 w-4 text-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold text-white">Bright Language</p>
            <p className="text-[10px] text-white/50">Admin Console</p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 rounded-md p-1 text-white/50 hover:text-white lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={onClose}
                className={[
                  'flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                  active
                    ? 'bg-brand-orange text-white shadow-sm'
                    : 'text-white/70 hover:bg-white/10 hover:text-white',
                ].join(' ')}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight className="h-3.5 w-3.5 opacity-70" />}
              </Link>
            )
          })}
        </nav>

        {/* Logout */}
        <div className="shrink-0 border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-white/60 transition-colors hover:bg-white/10 hover:text-white"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}

export default function AdminLayout({ children }) {
  const pathname = usePathname()
  const [open, setOpen]   = useState(false)

  useEffect(() => { setOpen(false) }, [pathname])

  const logout = async () => {
    try { await fetch('/api/admin/auth', { method: 'DELETE' }) } catch {}
    window.location.assign('/admin/login')
  }

  /* ── Login page: minimal chrome ── */
  if (pathname === '/admin/login') {
    return (
      <div className="flex min-h-screen flex-col bg-slate-50 dark:bg-slate-950">
        <header className="flex h-14 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 dark:border-slate-800 dark:bg-slate-900">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-brand-orange">
              <ShieldCheck className="h-3.5 w-3.5 text-white" />
            </span>
            <span className="text-sm font-bold text-brand-navy dark:text-white">
              Bright Language Admin
            </span>
          </div>
          <ThemeToggle />
        </header>
        <main className="flex-1">{children}</main>
      </div>
    )
  }

  /* ── Full admin shell ── */
  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 dark:bg-slate-950">
      <Sidebar
        open={open}
        onClose={() => setOpen(false)}
        onLogout={logout}
        pathname={pathname}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex h-16 shrink-0 items-center gap-3 border-b border-slate-200 bg-white px-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:px-6">
          <button
            onClick={() => setOpen(true)}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2 lg:hidden">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-brand-orange">
              <ShieldCheck className="h-3 w-3 text-white" />
            </span>
            <span className="text-sm font-bold text-brand-navy dark:text-white">Admin</span>
          </div>

          <div className="flex-1" />

          <ThemeToggle />
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
