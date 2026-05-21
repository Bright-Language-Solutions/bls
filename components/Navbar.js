'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import nav from '@/data/nav'

const DROPDOWN_ITEMS = ['About', 'Services', 'Languages', 'Industries']

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Utility bar */}
      <div
        style={{
          background: 'var(--navy)',
          color: '#fff',
          fontSize: 13,
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
            <a href="tel:+919876543210" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
              +91 98765 43210
            </a>
            <a href="mailto:hello@brightlanguage.in" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'none' }}>
              hello@brightlanguage.in
            </a>
            <span style={{ color: 'rgba(255,255,255,0.5)' }}>ISO 17100 / 9001 certified</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span
                style={{
                  width: 7, height: 7, borderRadius: '50%', background: '#10B981',
                  display: 'inline-block',
                  animation: 'pulseDot 2s ease-in-out infinite',
                }}
              />
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Live · 24/7 producers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          background: 'color-mix(in srgb, var(--bg) 92%, transparent)',
          borderBottom: '1px solid var(--rule)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            padding: '0 24px',
            height: 64,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 24,
          }}
        >
          {/* Logo */}
          <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', flexShrink: 0 }}>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="/assets/mark-dark.svg" />
              <img src="/assets/mark.svg" alt="Bright Language Solutions mark" style={{ height: 38 }} />
            </picture>
            <picture>
              <source media="(prefers-color-scheme: dark)" srcSet="/assets/wordmark-dark.svg" />
              <img src="/assets/wordmark.svg" alt="Bright Language Solutions" style={{ height: 28 }} />
            </picture>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex" style={{ flex: 1, justifyContent: 'center' }}>
            <NavigationMenu>
              <NavigationMenuList>
                {nav.filter((item) => item.label !== 'Home' && item.label !== 'Get Quote' && item.label !== 'Contact').map((item) => {
                  if (item.children && DROPDOWN_ITEMS.includes(item.label)) {
                    return (
                      <NavigationMenuItem key={item.href}>
                        <NavigationMenuTrigger
                          style={{ background: 'transparent', color: 'var(--ink)', fontSize: 14, fontWeight: 500 }}
                        >
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul style={{ listStyle: 'none', margin: 0, padding: '12px 8px', minWidth: 220, display: 'flex', flexDirection: 'column', gap: 2 }}>
                            {item.children.map((child) => (
                              <li key={child.href}>
                                <NavigationMenuLink asChild>
                                  <Link
                                    href={child.href}
                                    style={{
                                      display: 'block',
                                      padding: '8px 14px',
                                      borderRadius: 8,
                                      fontSize: 14,
                                      color: 'var(--ink)',
                                      textDecoration: 'none',
                                      transition: 'background 0.15s',
                                    }}
                                    className="hover:bg-[var(--tint)]"
                                  >
                                    {child.label}
                                  </Link>
                                </NavigationMenuLink>
                              </li>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </NavigationMenuItem>
                    )
                  }
                  return (
                    <NavigationMenuItem key={item.href}>
                      <NavigationMenuLink asChild>
                        <Link
                          href={item.href}
                          style={{ fontSize: 14, fontWeight: 500, color: 'var(--ink)', textDecoration: 'none', padding: '6px 12px', display: 'block' }}
                        >
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  )
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </nav>

          {/* Right actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
            <span className="hidden md:block" style={{ fontSize: 13, color: 'var(--muted-c)' }}>
              +91 98765 43210
            </span>
            <ThemeToggle />
            <Link href="/get-quote" className="btn accent sm">
              Get a Quote
            </Link>
            {/* Mobile hamburger */}
            <div className="lg:hidden">
              <Sheet open={open} onOpenChange={setOpen}>
                <SheetTrigger asChild>
                  <button
                    aria-label="Open menu"
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: 'var(--ink)' }}
                  >
                    <Menu size={22} />
                  </button>
                </SheetTrigger>
                <SheetContent side="right" style={{ width: 300, background: 'var(--bg)', borderLeft: '1px solid var(--rule)', padding: '32px 24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {nav.map((item) => (
                      <div key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setOpen(false)}
                          style={{
                            display: 'block',
                            padding: '10px 0',
                            fontSize: 16,
                            fontWeight: item.label === 'Get Quote' ? 700 : 500,
                            color: item.label === 'Get Quote' ? 'var(--blue)' : 'var(--ink)',
                            textDecoration: 'none',
                            borderBottom: '1px solid var(--rule)',
                          }}
                        >
                          {item.label}
                        </Link>
                        {item.children && (
                          <div style={{ paddingLeft: 12, paddingBottom: 4 }}>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setOpen(false)}
                                style={{
                                  display: 'block',
                                  padding: '8px 0',
                                  fontSize: 14,
                                  color: 'var(--muted-c)',
                                  textDecoration: 'none',
                                }}
                              >
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
