'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/90 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-atlas-600 flex items-center justify-center shadow-lg shadow-atlas-600/30 group-hover:shadow-atlas-600/50 transition-shadow">
              <span className="text-white font-bold text-sm tracking-tight">AO</span>
            </div>
            <span className="text-white font-semibold text-base tracking-tight">ATLAS OPS</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Agents', href: '#agents' },
              { label: 'Comment ça marche', href: '#process' },
              { label: 'Tarifs', href: '#tarifs' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3.5 py-2 text-sm text-slate-300 hover:text-white transition-colors rounded-lg hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* CTA + login */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              Connexion
            </Link>
            <a
              href="#diagnostic"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-atlas-600 hover:bg-atlas-500 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-atlas-600/25 hover:shadow-atlas-500/40 hover:-translate-y-px"
            >
              Diagnostic gratuit
            </a>
          </div>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 text-slate-300 hover:text-white"
            aria-label="Menu"
          >
            <div className="w-5 space-y-1.5">
              <span className={`block h-px bg-current transition-all duration-200 ${open ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block h-px bg-current transition-opacity duration-200 ${open ? 'opacity-0' : ''}`} />
              <span className={`block h-px bg-current transition-all duration-200 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/5 bg-slate-950/95 backdrop-blur-xl">
          <div className="px-6 py-4 space-y-1">
            {[
              { label: 'Agents', href: '#agents' },
              { label: 'Comment ça marche', href: '#process' },
              { label: 'Tarifs', href: '#tarifs' },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 pb-1 space-y-2">
              <Link href="/login" className="block px-3 py-2.5 text-sm text-slate-400 hover:text-white">
                Connexion
              </Link>
              <a
                href="#diagnostic"
                onClick={() => setOpen(false)}
                className="block px-4 py-2.5 rounded-xl bg-atlas-600 text-white text-sm font-medium text-center"
              >
                Diagnostic gratuit
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
