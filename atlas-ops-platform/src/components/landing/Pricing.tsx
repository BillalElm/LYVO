'use client'

const plans = [
  {
    name: 'Atlas Relance Pilote',
    subtitle: 'Pour tester sans risque',
    setup: '1 190',
    monthly: '179',
    commitment: '3 mois minimum',
    highlight: false,
    badge: null,
    features: [
      'Agent Atlas Relance déployé',
      'Jusqu\'à 100 devis/mois',
      'Séquence J+2 / J+5 / escalade J+7',
      'Connexion email ou WhatsApp Business',
      'Réunion de démarrage (1h)',
      'Rapport mensuel d\'activité',
      'Support par messagerie 24h',
    ],
    notIncluded: [
      'Agent Atlas Flow',
      'Personnalisations avancées',
    ],
    cta: 'Démarrer le Pilote',
  },
  {
    name: 'Atlas Relance Standard',
    subtitle: 'Pour une croissance active',
    setup: '1 500',
    monthly: '290',
    commitment: '3 mois minimum',
    highlight: true,
    badge: 'Le plus choisi',
    features: [
      'Tout du Pack Pilote',
      'Volume de devis illimité',
      'Jusqu\'à 3 variantes de messages',
      'Réunion mensuelle de suivi (30 min)',
      'Accès au tableau de bord en ligne',
      'Personnalisation du ton par secteur',
    ],
    notIncluded: ['Agent Atlas Flow'],
    cta: 'Démarrer le Standard',
  },
  {
    name: 'Atlas Duo',
    subtitle: 'Relance + Flow. L\'arsenal complet.',
    setup: '2 900',
    monthly: '490',
    commitment: '6 mois minimum',
    highlight: false,
    badge: null,
    features: [
      'Tout du Pack Standard',
      'Agent Atlas Flow inclus',
      'Tous les canaux entrants connectés',
      'Base de connaissance (50 Q/R)',
      'Deux suivis mensuels',
      'Alertes urgences en temps réel',
      'Tableau de bord client dédié',
    ],
    notIncluded: [],
    cta: 'Démarrer le Duo',
  },
]

export default function Pricing() {
  return (
    <section id="tarifs" className="py-24 md:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-atlas-600 tracking-widest uppercase mb-4">
            Tarifs
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 max-w-2xl mx-auto leading-tight">
            Moins cher qu'un stagiaire.{' '}
            <span className="text-atlas-600">Plus fiable.</span>
          </h2>
          <p className="mt-5 text-slate-500 max-w-xl mx-auto">
            Un premier règlement, un abonnement mensuel, et l'agent travaille pour vous —
            7j/7, sans congés, sans oublis.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl overflow-hidden transition-all duration-300 ${
                plan.highlight
                  ? 'bg-slate-950 shadow-2xl shadow-slate-900/30 ring-2 ring-atlas-500/30 scale-[1.02]'
                  : 'bg-white border border-slate-200 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-100'
              }`}
            >
              {plan.badge && (
                <div className="absolute top-4 right-4">
                  <span className="inline-block bg-atlas-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Plan name */}
                <h3 className={`text-lg font-bold mb-1 ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-6 ${plan.highlight ? 'text-slate-400' : 'text-slate-500'}`}>
                  {plan.subtitle}
                </p>

                {/* Pricing */}
                <div className={`border-t border-b py-6 mb-6 ${plan.highlight ? 'border-white/8' : 'border-slate-100'}`}>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className={`text-4xl font-black ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {plan.setup} €
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>HT</span>
                  </div>
                  <p className={`text-xs mb-4 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                    Mise en place (une seule fois)
                  </p>

                  <div className="flex items-baseline gap-1">
                    <span className={`text-2xl font-bold ${plan.highlight ? 'text-white' : 'text-slate-900'}`}>
                      {plan.monthly} €
                    </span>
                    <span className={`text-sm ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>/mois HT</span>
                  </div>
                  <p className={`text-xs mt-1 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>
                    {plan.commitment} · + hébergement ~15 €/mois
                  </p>
                </div>

                {/* Features */}
                <ul className="space-y-2.5 mb-6">
                  {plan.features.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-atlas-400' : 'text-atlas-600'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? 'text-slate-300' : 'text-slate-600'}`}>{feat}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((feat) => (
                    <li key={feat} className="flex items-start gap-2.5 opacity-40">
                      <svg className={`w-4 h-4 flex-shrink-0 mt-0.5 ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}
                        fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      <span className={`text-sm ${plan.highlight ? 'text-slate-500' : 'text-slate-400'}`}>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#diagnostic"
                  className={`block w-full py-3.5 rounded-xl text-center font-semibold text-sm transition-all duration-200 ${
                    plan.highlight
                      ? 'bg-atlas-600 hover:bg-atlas-500 text-white shadow-lg shadow-atlas-600/25'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900'
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="text-center text-sm text-slate-400 mt-8">
          Tous les prix sont exprimés hors taxes (HT) — TVA 20 % applicable.
          Résiliation possible après la durée d'engagement minimale, avec préavis de 30 jours.
          Diagnostic d'automatisation gratuit, sans engagement.
        </p>
      </div>
    </section>
  )
}
