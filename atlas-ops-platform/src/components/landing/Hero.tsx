'use client'

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-950">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Radial glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[800px] h-[600px] bg-atlas-600/10 rounded-full blur-[120px]" />
      </div>
      <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-atlas-700/8 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-indigo-600/8 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-atlas-600/30 bg-atlas-600/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-atlas-400 animate-pulse" />
            <span className="text-atlas-300 text-xs font-medium tracking-wide uppercase">
              Intégrateur terrain d'agents IA métier
            </span>
          </div>
        </div>

        {/* Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-6">
            <span className="text-white block">L'agent qui</span>
            <span className="text-gradient block">relance.</span>
            <span className="text-white block">Vous décidez.</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
            ATLAS OPS déploie des agents IA métier autonomes pour les PME et artisans français.
            Vos devis sont relancés, vos demandes traitées —
            <span className="text-slate-200 font-medium"> pendant que vous travaillez</span>.
          </p>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12">
          <a
            href="#diagnostic"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-atlas-600 hover:bg-atlas-500 text-white font-semibold text-base transition-all duration-200 shadow-2xl shadow-atlas-600/30 hover:shadow-atlas-500/40 hover:-translate-y-0.5"
          >
            Diagnostic gratuit — 30 min
            <svg
              className="w-4 h-4 group-hover:translate-x-0.5 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
          <a
            href="#agents"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/8 text-white font-medium text-base transition-all duration-200 backdrop-blur-sm"
          >
            Voir les agents
          </a>
        </div>

        {/* Social proof numbers */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/5 rounded-2xl overflow-hidden border border-white/5">
          {[
            { value: '< 30 jours', label: 'Pour voir les premiers résultats' },
            { value: '179 €/mois', label: "Moins cher qu'un stagiaire" },
            { value: '100 %', label: 'Des actions tracées et auditables' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/2 hover:bg-white/4 transition-colors px-8 py-6 text-center">
              <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </section>
  )
}
