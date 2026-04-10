'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setLoading(true)
    setError('')
    try {
      const res = await signIn('email', { email, redirect: false })
      if (res?.error) {
        setError('Une erreur est survenue. Vérifiez l\'adresse email.')
      } else {
        setSent(true)
      }
    } catch {
      setError('Une erreur est survenue. Réessayez.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-atlas-600/8 rounded-full blur-[100px]" />
      </div>

      {/* Card */}
      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-atlas-600 flex items-center justify-center shadow-lg shadow-atlas-600/30">
              <span className="text-white font-black text-sm">AO</span>
            </div>
            <span className="text-white font-bold text-lg">ATLAS OPS</span>
          </Link>
        </div>

        <div className="bg-white/4 backdrop-blur-xl border border-white/8 rounded-3xl p-8 md:p-10">
          {!sent ? (
            <>
              <div className="mb-8">
                <h1 className="text-2xl font-black text-white mb-2">Connexion</h1>
                <p className="text-slate-400 text-sm">
                  Entrez votre adresse email pour recevoir un lien de connexion sécurisé.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                    Adresse email
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="vous@entreprise.fr"
                    required
                    className="w-full bg-white/5 border border-white/10 focus:border-atlas-500/50 focus:ring-2 focus:ring-atlas-500/20 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm outline-none transition-all"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-3.5 rounded-xl bg-atlas-600 hover:bg-atlas-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold text-sm transition-all duration-200 shadow-lg shadow-atlas-600/25"
                >
                  {loading ? 'Envoi en cours…' : 'Recevoir le lien de connexion'}
                </button>
              </form>

              <p className="mt-6 text-center text-xs text-slate-600">
                Pas encore client ?{' '}
                <a href="/#diagnostic" className="text-atlas-400 hover:text-atlas-300 transition-colors">
                  Demandez un diagnostic gratuit
                </a>
              </p>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 rounded-2xl bg-atlas-600/20 border border-atlas-500/20 flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-atlas-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-white mb-3">Email envoyé !</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Un lien de connexion a été envoyé à{' '}
                <span className="text-white font-medium">{email}</span>.
                Vérifiez votre boîte de réception (et vos spams).
              </p>
              <button
                onClick={() => { setSent(false); setEmail('') }}
                className="text-sm text-atlas-400 hover:text-atlas-300 transition-colors"
              >
                ← Utiliser une autre adresse
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
