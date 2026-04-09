import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'ATLAS OPS — Agents IA métier pour TPE et PME',
    template: '%s | ATLAS OPS',
  },
  description:
    'ATLAS OPS déploie des agents IA métier autonomes pour les TPE et PME françaises. Automatisez vos relances commerciales et la gestion de vos demandes entrantes.',
  keywords: ['agents IA', 'relance commerciale', 'automatisation', 'PME', 'TPE', 'devis'],
  authors: [{ name: 'ATLAS OPS', url: 'https://atlasops.fr' }],
  openGraph: {
    title: 'ATLAS OPS — Agents IA métier pour TPE et PME',
    description: 'Automatiser l\'utile. Garder le contrôle.',
    url: 'https://atlasops.fr',
    siteName: 'ATLAS OPS',
    locale: 'fr_FR',
    type: 'website',
  },
  robots: { index: true, follow: true },
  themeColor: '#0f172a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-white text-slate-900 antialiased">
        {children}
      </body>
    </html>
  )
}
