const cases = [
  {
    sector: 'BTP — Entreprise de rénovation',
    employees: '3 salariés',
    before: '8 devis par mois sans réponse. Relances épisodiques, dépendantes de la disponibilité du dirigeant.',
    after: '100 % des devis relancés automatiquement. Taux de réponse passé de 18 % à 44 % après relance.',
    metric: '+144 %',
    metricLabel: 'de taux de réponse',
    icon: '🏗️',
  },
  {
    sector: 'Cabinet comptable',
    employees: '4 collaborateurs',
    before: 'Propositions de mission sans suivi systématique. 3 à 4h/semaine de gestion manuelle des relances.',
    after: 'Agent déployé en 12 jours. 3h/semaine libérées. 2 missions supplémentaires signées le premier mois.',
    metric: '3h',
    metricLabel: 'libérées chaque semaine',
    icon: '📊',
  },
  {
    sector: 'Agence de conseil',
    employees: '2 associés',
    before: 'Flux entrants désorganisés sur 3 canaux. Temps de réponse moyen : 4 heures. Prospects perdus le week-end.',
    after: 'Atlas Flow centralise tout. Temps de réponse moyen : 8 minutes. Zéro demande non traitée.',
    metric: '97 %',
    metricLabel: 'de réduction du délai',
    icon: '⚡',
  },
]

const targets = [
  { label: 'Artisans BTP structurés', icon: '🔨' },
  { label: 'Cabinets comptables', icon: '📋' },
  { label: 'Cabinets immobiliers', icon: '🏠' },
  { label: 'Agences de conseil', icon: '💼' },
  { label: 'Studios et agences', icon: '🎨' },
  { label: 'PME de services B2B', icon: '⚙️' },
]

export default function Proof() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-atlas-600 tracking-widest uppercase mb-4">
            Résultats
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Des chiffres réels.{' '}
            <span className="text-atlas-600">Pas des promesses.</span>
          </h2>
          <p className="mt-5 text-slate-500 max-w-xl mx-auto">
            Cas d'usage anonymisés issus de nos déploiements terrain.
            Tous mesurés à J+30 après mise en production.
          </p>
        </div>

        {/* Case studies */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {cases.map((c) => (
            <div key={c.sector} className="group bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1">
              <div className="text-2xl mb-4">{c.icon}</div>
              <div className="mb-4">
                <div className="text-sm font-bold text-slate-900">{c.sector}</div>
                <div className="text-xs text-slate-400">{c.employees}</div>
              </div>

              {/* Before / After */}
              <div className="space-y-3 mb-5">
                <div className="flex gap-2">
                  <span className="flex-shrink-0 text-xs font-semibold text-red-500 bg-red-50 px-2 py-0.5 rounded">Avant</span>
                  <p className="text-xs text-slate-500 leading-relaxed">{c.before}</p>
                </div>
                <div className="flex gap-2">
                  <span className="flex-shrink-0 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">Après</span>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.after}</p>
                </div>
              </div>

              {/* Key metric */}
              <div className="border-t border-slate-100 pt-4 flex items-baseline gap-2">
                <span className="text-2xl font-black text-atlas-600">{c.metric}</span>
                <span className="text-xs text-slate-400">{c.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Who we work with */}
        <div className="bg-slate-950 rounded-3xl p-8 md:p-12">
          <h3 className="text-center text-2xl font-bold text-white mb-8">
            On travaille avec les entreprises qui ont{' '}
            <span className="text-gradient">un process répétable.</span>
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {targets.map((t) => (
              <div key={t.label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/3 border border-white/5 text-center hover:bg-white/5 transition-colors">
                <span className="text-2xl">{t.icon}</span>
                <span className="text-xs text-slate-400 font-medium leading-tight">{t.label}</span>
              </div>
            ))}
          </div>
          <p className="text-center text-slate-600 text-xs mt-8">
            Boulangers, coiffeurs, restaurateurs : notre solution n'est pas adaptée à votre marché.
            On préfère vous le dire directement.
          </p>
        </div>
      </div>
    </section>
  )
}
