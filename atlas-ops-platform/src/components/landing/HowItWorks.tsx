'use client'

const steps = [
  {
    number: '01',
    title: 'Diagnostic',
    subtitle: 'Gratuit · 30 min · Sur site',
    body: 'On vient chez vous comprendre votre process commercial, vos canaux, vos volumes. Pas de présentation PowerPoint — des questions, de l\'écoute, un livrable en 24h.',
    tag: 'Jour 0',
  },
  {
    number: '02',
    title: 'Proposition',
    subtitle: 'Périmètre + messages + canaux',
    body: 'On vous soumet le périmètre exact de l\'agent : quels devis, quels délais, quels messages. Vous lisez, vous ajustez, vous validez. Rien ne part sans votre accord.',
    tag: 'Jour 2–5',
  },
  {
    number: '03',
    title: 'Déploiement',
    subtitle: 'Infra dédiée · Sans installation',
    body: 'Mise en place technique en 5 à 10 jours. Infrastructure hébergée en Europe, dédiée à votre entreprise. Vous n\'avez rien à installer, rien à configurer.',
    tag: 'Jour 5–14',
  },
  {
    number: '04',
    title: 'Lancement',
    subtitle: 'Production · Moment wow J+7',
    body: 'L\'agent entre en production. Dans les 7 jours, vous recevez la confirmation de la première relance envoyée avec succès — avec contexte et retour obtenu.',
    tag: 'Jour 14',
  },
  {
    number: '05',
    title: 'Bilan mensuel',
    subtitle: 'Rapport · KPIs · Recommandations',
    body: 'Chaque mois, un rapport complet : relances envoyées, taux de réponse, heures libérées, ROI estimé. Et nos recommandations pour le mois suivant.',
    tag: 'Jour 30+',
  },
]

export default function HowItWorks() {
  return (
    <section id="process" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-semibold text-atlas-600 tracking-widest uppercase mb-4">
            Le processus
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 max-w-2xl mx-auto leading-tight">
            De zéro à l'agent en production en{' '}
            <span className="text-atlas-600">14 jours.</span>
          </h2>
        </div>

        {/* Steps — desktop horizontal timeline */}
        <div className="hidden lg:block relative">
          {/* Line */}
          <div className="absolute top-[52px] left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

          <div className="grid grid-cols-5 gap-4">
            {steps.map((step, i) => (
              <div key={step.number} className="group relative pt-0">
                {/* Node */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-[104px] h-[104px] flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full bg-slate-50 border border-slate-100 group-hover:border-atlas-200 group-hover:bg-atlas-50/50 transition-all duration-300" />
                    <span className="relative text-3xl font-black text-slate-200 group-hover:text-atlas-300 transition-colors">
                      {step.number}
                    </span>
                  </div>
                </div>

                {/* Tag */}
                <div className="text-center mb-3">
                  <span className="inline-block text-xs font-semibold text-atlas-600 bg-atlas-50 px-2.5 py-1 rounded-full">
                    {step.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="text-center">
                  <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-xs text-atlas-600 font-medium mb-3">{step.subtitle}</p>
                  <p className="text-xs text-slate-500 leading-relaxed">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Steps — mobile vertical */}
        <div className="lg:hidden space-y-0 relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
          {steps.map((step) => (
            <div key={step.number} className="flex gap-6 pb-10 relative">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white border-2 border-slate-100 flex items-center justify-center z-10">
                <span className="text-xs font-bold text-atlas-600">{step.number}</span>
              </div>
              <div className="pt-1">
                <div className="inline-block text-xs font-semibold text-atlas-600 bg-atlas-50 px-2 py-0.5 rounded-full mb-2">
                  {step.tag}
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-1">{step.title}</h3>
                <p className="text-xs font-medium text-atlas-600 mb-2">{step.subtitle}</p>
                <p className="text-sm text-slate-500 leading-relaxed">{step.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
