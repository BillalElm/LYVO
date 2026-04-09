export default function FinalCta() {
  return (
    <section id="diagnostic" className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[400px] bg-atlas-600/12 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-atlas-600/30 bg-atlas-600/10 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-atlas-400 animate-pulse" />
          <span className="text-atlas-300 text-xs font-medium tracking-wide uppercase">
            Diagnostic gratuit
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-none mb-6">
          30 minutes pour savoir si on peut vous aider.
        </h2>

        <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
          On vient chez vous, on pose les bonnes questions, on vous envoie un livrable sous 24h.
          Que vous signiez ou non, vous repartez avec une cartographie de vos pertes commerciales.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href="mailto:contact@atlasops.fr?subject=Demande de diagnostic gratuit"
            className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-atlas-600 hover:bg-atlas-500 text-white font-semibold text-base transition-all duration-200 shadow-2xl shadow-atlas-600/30 hover:-translate-y-0.5"
          >
            contact@atlasops.fr
            <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </a>
        </div>

        {/* Reassurance */}
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { icon: '📍', label: 'On se déplace', sub: 'En présentiel, chez vous' },
            { icon: '🎯', label: 'Livrable en 24h', sub: 'Même si vous ne signez pas' },
            { icon: '🔒', label: 'Sans engagement', sub: 'Pas de pré-signature requise' },
          ].map((r) => (
            <div key={r.label} className="flex flex-col items-center gap-2 p-5 rounded-2xl bg-white/3 border border-white/5">
              <span className="text-xl">{r.icon}</span>
              <span className="text-sm font-semibold text-white">{r.label}</span>
              <span className="text-xs text-slate-500">{r.sub}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
