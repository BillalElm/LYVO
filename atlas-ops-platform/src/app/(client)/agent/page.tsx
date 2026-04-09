import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate, formatDateTime } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { redirect } from 'next/navigation'

const actionLabels: Record<string, { label: string; icon: string; variant: any }> = {
  RELANCE_J2:      { label: 'Relance J+2',    icon: '📬', variant: 'default' },
  RELANCE_J5:      { label: 'Relance J+5',    icon: '📨', variant: 'warning' },
  ESCALADE_J7:     { label: 'Escalade J+7',   icon: '🔔', variant: 'danger' },
  FLOW_RECEIVED:   { label: 'Demande reçue',  icon: '📥', variant: 'neutral' },
  FLOW_QUALIFIED:  { label: 'Qualifiée',      icon: '✅', variant: 'success' },
  FLOW_RESPONDED:  { label: 'Répondue',       icon: '💬', variant: 'success' },
  FLOW_ESCALATED:  { label: 'Escaladée',      icon: '⚡', variant: 'warning' },
  ALERT:           { label: 'Alerte',         icon: '⚠️', variant: 'danger' },
}

export default async function AgentPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: {
      client: {
        include: {
          agents: {
            include: {
              actions: {
                orderBy: { createdAt: 'desc' },
                take: 20,
              },
              metrics: {
                orderBy: { month: 'desc' },
                take: 1,
              },
            },
          },
        },
      },
    },
  })

  const client = user?.client
  if (!client) {
    return (
      <div className="text-center py-24">
        <div className="text-5xl mb-6">⚡</div>
        <h1 className="text-2xl font-black text-white mb-3">Votre espace est en cours de préparation</h1>
        <p className="text-slate-400 max-w-md mx-auto">
          Votre accès client sera activé lors de votre réunion de démarrage.
          En attendant, contactez-nous à{' '}
          <a href="mailto:contact@atlasops.fr" className="text-atlas-400 hover:underline">
            contact@atlasops.fr
          </a>
        </p>
      </div>
    )
  }

  const liveAgents = client.agents.filter((a) => a.status === 'LIVE')
  const allActions = client.agents.flatMap((a) => a.actions).sort(
    (x, y) => new Date(y.createdAt).getTime() - new Date(x.createdAt).getTime()
  )

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-black text-white">Bonjour, {client.contactName.split(' ')[0]}</h1>
        <p className="text-slate-400 text-sm mt-1">
          {client.companyName} · Pack {client.pack === 'PILOTE' ? 'Pilote' : client.pack === 'STANDARD' ? 'Standard' : 'Duo'}
        </p>
      </div>

      {/* Agent status cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {client.agents.map((agent) => {
          const metric = agent.metrics[0]
          const isLive = agent.status === 'LIVE'
          return (
            <div
              key={agent.id}
              className={`rounded-2xl border p-6 ${
                isLive
                  ? 'bg-white/3 border-white/8'
                  : 'bg-white/2 border-white/5 opacity-70'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                    <span className="text-xs font-medium text-slate-400">
                      {isLive ? 'En ligne' : agent.status === 'TESTING' ? 'En test' : 'Configuration'}
                    </span>
                  </div>
                  <h2 className="text-base font-bold text-white">
                    {agent.type === 'RELANCE' ? 'Atlas Relance' : 'Atlas Flow'}
                  </h2>
                </div>
                <span className="text-2xl">
                  {agent.type === 'RELANCE' ? '📬' : '⚡'}
                </span>
              </div>

              {metric && (
                <div className="grid grid-cols-3 gap-3">
                  {agent.type === 'RELANCE' ? [
                    { v: metric.relancesSent, l: 'Relances' },
                    { v: `${metric.relancesSent > 0 ? Math.round((metric.responsesReceived / metric.relancesSent) * 100) : 0}%`, l: 'Taux réponse' },
                    { v: metric.escalations, l: 'Escalades' },
                  ] : [
                    { v: metric.requestsReceived, l: 'Demandes' },
                    { v: `${metric.requestsReceived > 0 ? Math.round((metric.requestsAutoResolved / metric.requestsReceived) * 100) : 0}%`, l: 'Auto-traitées' },
                    { v: metric.requestsEscalated, l: 'Escalades' },
                  ].map((s) => (
                    <div key={s.l} className="bg-white/5 rounded-xl p-3 text-center">
                      <div className="text-lg font-black text-white">{s.v}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{s.l}</div>
                    </div>
                  ))}
                </div>
              )}

              {!metric && (
                <p className="text-slate-500 text-sm">
                  {isLive ? 'En attente des premières données.' : 'Pas encore en production.'}
                </p>
              )}
            </div>
          )
        })}
      </div>

      {/* Activity feed */}
      <div className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="font-bold text-white text-sm">Journal d'activité</h2>
          <p className="text-slate-500 text-xs mt-0.5">Les 20 dernières actions de vos agents</p>
        </div>
        <div className="divide-y divide-white/5">
          {allActions.length === 0 && (
            <div className="px-6 py-10 text-center text-slate-500 text-sm">
              Aucune action enregistrée pour l'instant.
            </div>
          )}
          {allActions.map((action) => {
            const cfg = actionLabels[action.type] ?? { label: action.type, icon: '·', variant: 'neutral' }
            return (
              <div key={action.id} className="px-6 py-4 flex items-start gap-4 hover:bg-white/2 transition-colors">
                <span className="text-xl flex-shrink-0 mt-0.5">{cfg.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={cfg.variant}>{cfg.label}</Badge>
                    {action.contactName && (
                      <span className="text-sm text-slate-300">{action.contactName}</span>
                    )}
                    {action.contactRef && (
                      <span className="text-xs text-slate-500 font-mono">#{action.contactRef}</span>
                    )}
                  </div>
                  {action.details && (
                    <p className="text-xs text-slate-500 mt-1">{action.details}</p>
                  )}
                </div>
                <span className="text-xs text-slate-600 flex-shrink-0 mt-0.5">
                  {formatDateTime(action.createdAt)}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
