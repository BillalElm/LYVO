'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { signOut } from 'next-auth/react'

const adminNav = [
  {
    group: 'Vue d\'ensemble',
    items: [
      { href: '/admin/dashboard', label: 'Tableau de bord', icon: '⬡' },
    ],
  },
  {
    group: 'CRM',
    items: [
      { href: '/admin/prospects', label: 'Prospects', icon: '🎯' },
      { href: '/admin/clients', label: 'Clients', icon: '🏢' },
      { href: '/admin/agents', label: 'Agents déployés', icon: '⚡' },
    ],
  },
  {
    group: 'Facturation',
    items: [
      { href: '/admin/devis', label: 'Devis', icon: '📄' },
      { href: '/admin/factures', label: 'Factures', icon: '🧾' },
    ],
  },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 w-64 bg-slate-950 border-r border-white/5 flex flex-col z-40">
      {/* Logo */}
      <div className="px-5 py-5 border-b border-white/5">
        <Link href="/admin/dashboard" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-atlas-600 flex items-center justify-center">
            <span className="text-white font-black text-xs">AO</span>
          </div>
          <div>
            <div className="text-white font-bold text-sm leading-none">ATLAS OPS</div>
            <div className="text-slate-600 text-xs mt-0.5">Back-office</div>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-6">
        {adminNav.map((group) => (
          <div key={group.group}>
            <div className="px-2 mb-2">
              <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                {group.group}
              </span>
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = pathname.startsWith(item.href)
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-150',
                      active
                        ? 'bg-atlas-600/20 text-white font-medium border border-atlas-500/20'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    <span className="text-base leading-none">{item.icon}</span>
                    {item.label}
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-white/5">
        <Link href="/" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all mb-1">
          <span>🌐</span> Voir le site
        </Link>
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-slate-500 hover:text-slate-300 hover:bg-white/5 transition-all text-left"
        >
          <span>→</span> Déconnexion
        </button>
      </div>
    </aside>
  )
}
