import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

const agentStatusConfig: Record<string, { label: string; variant: any; dot: string }> = {
  CONFIGURING: { label: 'Configuration', variant: 'neutral', dot: 'bg-slate-300' },
  TESTING:     { label: 'En test',       variant: 'info',    dot: 'bg-blue-400' },
  LIVE:        { label: 'En ligne',      variant: 'success', dot: 'bg-emerald-400 animate-pulse' },
  PAUSED:      { label: 'Suspendu',      variant: 'warning', dot: 'bg-amber-400' },
  STOPPED:     { label: 'Arrêté',        variant: 'neutral', dot: 'bg-slate-300' },
}

export default async function AgentsPage() {
  const agents = await prisma.agent.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      client: { select: { companyName: true, pack: true } },
      _count: { select: { actions: true } },
      metrics: {
        orderBy: { month: 'desc' },
        take: 1,
      },
    },
  })

  const liveCount = agents.filter((a) => a.status === 'LIVE').length

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Agents déployés</h1>
          <p className="text-slate-500 text-sm mt-1">
            {liveCount} en ligne sur {agents.length} déployés
          </p>
        </div>
      </div>

      {/* Live status bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-sm font-semibold text-slate-900">Statut en temps réel</span>
          </div>
          <span className="text-xs text-slate-400">Mis à jour toutes les heures</span>
        </div>
        <div className="grid grid-cols-5 gap-3">
          {Object.entries(agentStatusConfig).map(([status, config]) => {
            const count = agents.filter((a) => a.status === status).length
            return (
              <div key={status} className="text-center">
                <div className="text-xl font-black text-slate-900">{count}</div>
                <Badge variant={config.variant} className="mt-1">{config.label}</Badge>
              </div>
            )
          })}
        </div>
      </div>

      {/* Agent list */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Agent</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Canal</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Actions ce mois</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Mise en prod.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {agents.map((agent) => {
                const sc = agentStatusConfig[agent.status]
                const lastMetric = agent.metrics[0]
                const actions = lastMetric
                  ? lastMetric.relancesSent + lastMetric.requestsReceived
                  : agent._count.actions
                return (
                  <tr key={agent.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 text-xs max-w-[200px] truncate">{agent.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/admin/clients`} className="text-slate-700 hover:text-atlas-600 transition-colors">
                        {agent.client.companyName}
                      </Link>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={agent.type === 'RELANCE' ? 'default' : 'info'}>
                        {agent.type === 'RELANCE' ? 'Atlas Relance' : 'Atlas Flow'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        <span className="text-sm text-slate-700">{sc.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs capitalize">
                      {agent.channel === 'EMAIL' ? '📧 Email' : agent.channel === 'WHATSAPP' ? '💬 WhatsApp' : '📧💬 Les deux'}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-slate-900">{actions}</td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {agent.goLiveDate ? formatDate(agent.goLiveDate) : '—'}
                    </td>
                  </tr>
                )
              })}
              {agents.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Aucun agent déployé pour l'instant.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
