'use client'

export default function Problem() {
  const pains = [
    {
      icon: '📬',
      title: 'Des devis qui partent dans le vide',
      body: 'Vous envoyez un devis le jeudi. Vendredi, pas de réponse. Lundi, vous êtes sur le chantier. Mardi, vous y repensez — trop tard, le prospect a signé ailleurs.',
    },
    {
      icon: '📱',
      title: 'Des demandes qui tombent à côté',
      body: "Un prospect contacte votre WhatsApp un samedi à 17h. Vous rappellez lundi matin. Il a déjà choisi un concurrent qui a répondu dans l'heure.",
    },
    {
      icon: '⏳',
      title: 'Du temps perdu sur des tâches sans valeur',
      body: 'Trier les emails, relancer manuellement, qualifier les demandes — tout ça prend des heures chaque semaine. Des heures qui ne produisent pas de marge.',
    },
  ]

  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Label */}
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold text-atlas-600 tracking-widest uppercase mb-4">
            Le problème
          </span>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 max-w-3xl mx-auto leading-tight">
            Vous perdez des marchés sans le savoir.
          </h2>
          <p className="mt-5 text-lg text-slate-500 max-w-2xl mx-auto">
            Pas par manque de compétence. Par manque de système.
            Un devis non relancé, une demande traitée trop tard —
            c'est invisible, mais ça s'accumule.
          </p>
        </div>

        {/* Pain cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {pains.map((pain) => (
            <div
              key={pain.title}
              className="group relative bg-slate-50 hover:bg-white border border-slate-100 hover:border-slate-200 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:shadow-slate-100 hover:-translate-y-1"
            >
              <div className="text-3xl mb-5">{pain.icon}</div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">{pain.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{pain.body}</p>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div className="mt-16 bg-slate-950 rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative">
            <p className="text-2xl md:text-3xl font-bold text-white leading-snug max-w-3xl mx-auto">
              "Un artisan BTP envoie en moyenne{' '}
              <span className="text-gradient">15 devis par mois</span>.
              Sans relance systématique, il en perd{' '}
              <span className="text-gradient">5 à 8</span>."
            </p>
            <p className="mt-4 text-slate-500 text-sm">
              Estimation basée sur nos diagnostics terrain — secteur BTP, 1 à 10 salariés.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
