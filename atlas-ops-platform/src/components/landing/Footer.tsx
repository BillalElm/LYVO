'use client'

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-atlas-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">AO</span>
              </div>
              <span className="text-white font-semibold">ATLAS OPS</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-xs mb-6">
              Intégrateur terrain d'agents IA métier pour TPE et PME françaises.
              Automatiser l'utile. Garder le contrôle.
            </p>
            <a
              href="mailto:contact@atlasops.fr"
              className="text-sm text-atlas-400 hover:text-atlas-300 transition-colors"
            >
              contact@atlasops.fr
            </a>
          </div>

          {/* Produits */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Agents</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Atlas Relance', href: '#agents' },
                { label: 'Atlas Flow', href: '#agents' },
                { label: 'Comment ça marche', href: '#process' },
                { label: 'Tarifs', href: '#tarifs' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h4 className="text-white text-sm font-semibold mb-4">Légal</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Conditions générales', href: '#' },
                { label: 'Politique de confidentialité', href: '#' },
                { label: 'Mentions légales', href: '#' },
                { label: 'Espace client', href: '/login' },
              ].map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-slate-500 hover:text-slate-300 transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} ATLAS OPS. Tous droits réservés.
          </p>
          <p className="text-xs text-slate-700">
            Infrastructure hébergée en Europe · Données protégées RGPD
          </p>
        </div>
      </div>
    </footer>
  )
}
