import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

export default async function ClientLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Top nav */}
      <header className="border-b border-white/5 bg-slate-950/90 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
          <div className="flex items-center gap-6">
            <Link href="/agent" className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-atlas-600 flex items-center justify-center">
                <span className="text-white font-black text-xs">AO</span>
              </div>
              <span className="text-white font-semibold text-sm">ATLAS OPS</span>
            </Link>
            <nav className="flex items-center gap-1">
              {[
                { href: '/agent', label: 'Mon agent' },
                { href: '/rapports', label: 'Rapports' },
                { href: '/parametres', label: 'Paramètres' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-600">{session.user?.email}</span>
            <Link
              href="/api/auth/signout"
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
            >
              Déconnexion
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
