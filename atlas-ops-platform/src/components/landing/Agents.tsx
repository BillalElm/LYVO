export default function Agents() {
  return (
    <section id="agents" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-atlas-600/8 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="inline-block text-xs font-semibold text-atlas-400 tracking-widest uppercase mb-4">
            Les agents
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white max-w-3xl mx-auto leading-tight">
            Deux agents. Une seule règle :{' '}
            <span className="text-gradient">agir, pas attendre.</span>
          </h2>
          <p className="mt-5 text-slate-400 max-w-xl mx-auto">
            Contrairement à un outil passif, nos agents détectent, décident et exécutent —
            dans le périmètre exact que vous avez validé.
          </p>
        </div>

        {/* Agent cards */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Atlas Relance */}
          <div className="group relative bg-white/3 hover:bg-white/5 border border-white/8 hover:border-atlas-500/30 rounded-3xl p-8 md:p-10 transition-all duration-300 overflow-hidden">
            {/* Glow on hover */}
            <div className="absolute inset-0 bg-atlas-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

            <div className="relative">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-atlas-600/20 border border-atlas-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-atlas-400 animate-pulse" />
                <span className="text-atlas-300 text-xs font-semibold tracking-wide">Agent 01</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Atlas Relance</h3>
              <p className="text-atlas-400 font-medium mb-6">Zéro devis sans réponse.</p>

              <p className="text-slate-400 leading-relaxed mb-8">
                Votre agent surveille chaque devis envoyé. Dès 48h sans réponse,
                il prend l'initiative — message personnalisé, ton adapté, suivi automatique.
                À J+7, c'est vous qui décidez de la suite.
              </p>

              {/* Timeline */}
              <div className="space-y-3">
                {[
                  { day: 'J+2', label: 'Première relance personnalisée', active: true },
                  { day: 'J+5', label: 'Deuxième prise de contact', active: false },
                  { day: 'J+7', label: 'Alerte dirigeant — vous prenez la main', active: false },
                ].map((step) => (
                  <div key={step.day} className="flex items-center gap-4">
                    <div className={`w-12 text-center text-xs font-bold px-2 py-1 rounded-lg ${
                      step.active
                        ? 'bg-atlas-600/30 text-atlas-300 border border-atlas-500/30'
                        : 'bg-white/5 text-slate-500 border border-white/5'
                    }`}>
                      {step.day}
                    </div>
                    <span className="text-sm text-slate-400">{step.label}</span>
                  </div>
                ))}
              </div>

              {/* Example */}
              <div className="mt-8 bg-slate-900 rounded-2xl p-5 border border-white/5">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-atlas-600/20 border border-atlas-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-atlas-400 text-xs font-bold">AO</span>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Agent Atlas Relance · J+5</p>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      "Votre devis n°2047 pour Martin SARL (rénovation façade, 14 500 €)
                      est sans réponse depuis 5 jours. 2 relances envoyées.
                      <span className="text-atlas-400"> Souhaitez-vous intervenir en direct ?</span>"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atlas Flow */}
          <div className="group relative bg-white/3 hover:bg-white/5 border border-white/8 hover:border-indigo-500/30 rounded-3xl p-8 md:p-10 transition-all duration-300 overflow-hidden">
            <div className="absolute inset-0 bg-indigo-600/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

            <div className="relative">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-600/20 border border-indigo-500/20 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                <span className="text-indigo-300 text-xs font-semibold tracking-wide">Agent 02 — Pack Duo</span>
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Atlas Flow</h3>
              <p className="text-indigo-400 font-medium mb-6">Chaque demande traitée. Aucune perdue.</p>

              <p className="text-slate-400 leading-relaxed mb-8">
                Toutes vos demandes entrantes — email, WhatsApp, formulaire — arrivent
                au même endroit. L'agent trie, qualifie, répond aux questions simples
                et vous alerte uniquement sur ce qui nécessite votre expertise.
              </p>

              {/* Features */}
              <div className="space-y-3">
                {[
                  'Centralisation de tous les canaux entrants',
                  'Tri automatique : urgence, devis, SAV, info',
                  'Réponses instantanées depuis votre base de connaissance',
                  'Notification temps réel sur les urgences',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-2.5 h-2.5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-slate-400">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Stat */}
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[
                  { value: '< 2 min', label: 'Délai de traitement moyen' },
                  { value: '24h/24', label: 'Disponibilité de l'agent' },
                ].map((s) => (
                  <div key={s.label} className="bg-slate-900 rounded-2xl p-4 border border-white/5 text-center">
                    <div className="text-xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-500 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Differentiator */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              title: 'Agit, n'attend pas',
              body: 'L'agent détecte les situations qui nécessitent une action et les traite, sans que vous ayez à y penser.',
            },
            {
              title: 'Périmètre validé par vous',
              body: 'Chaque message type, chaque règle, chaque condition est approuvée par vous avant le lancement.',
            },
            {
              title: 'Résultats à J+30',
              body: 'Un rapport mensuel chiffré : relances envoyées, taux de réponse, heures libérées, ROI estimé.',
            },
          ].map((d) => (
            <div key={d.title} className="bg-white/3 border border-white/8 rounded-2xl p-6">
              <h4 className="text-white font-bold mb-2">{d.title}</h4>
              <p className="text-slate-500 text-sm leading-relaxed">{d.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
