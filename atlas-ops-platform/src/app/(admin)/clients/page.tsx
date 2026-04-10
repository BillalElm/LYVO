import { prisma } from '@/lib/prisma'
import { formatEur, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

const statusConfig: Record<string, { label: string; variant: any; dot: string }> = {
  ONBOARDING: { label: 'Démarrage',   variant: 'info',    dot: 'bg-blue-400' },
  ACTIVE:     { label: 'Actif',       variant: 'success', dot: 'bg-emerald-400 animate-pulse' },
  PAUSED:     { label: 'Suspendu',    variant: 'warning', dot: 'bg-amber-400' },
  CHURNED:    { label: 'Résilié',     variant: 'neutral', dot: 'bg-slate-300' },
}

const packConfig: Record<string, { label: string; color: string }> = {
  PILOTE:   { label: 'Pilote',   color: 'text-slate-600' },
  STANDARD: { label: 'Standard', color: 'text-atlas-600' },
  DUO:      { label: 'Duo',      color: 'text-indigo-600' },
}

export default async function ClientsPage() {
  const clients = await prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      agents: { select: { id: true, status: true } },
      _count: { select: { invoices: true } },
    },
  })

  const mrr = clients
    .filter((c) => c.status === 'ACTIVE')
    .reduce((sum, c) => sum + c.monthlyAmount, 0)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Clients</h1>
          <p className="text-slate-500 text-sm mt-1">
            {clients.filter((c) => c.status === 'ACTIVE').length} actifs ·{' '}
            MRR : <span className="font-semibold text-slate-900">{formatEur(mrr)}</span> HT
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-atlas-600 hover:bg-atlas-500 text-white text-sm font-semibold transition-all shadow-lg shadow-atlas-600/20"
        >
          + Nouveau client
        </Link>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Actifs', count: clients.filter((c) => c.status === 'ACTIVE').length, color: 'text-emerald-600' },
          { label: 'En démarrage', count: clients.filter((c) => c.status === 'ONBOARDING').length, color: 'text-blue-600' },
          { label: 'Suspendus', count: clients.filter((c) => c.status === 'PAUSED').length, color: 'text-amber-600' },
          { label: 'Résiliés', count: clients.filter((c) => c.status === 'CHURNED').length, color: 'text-slate-400' },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-4 text-center">
            <div className={`text-2xl font-black ${s.color}`}>{s.count}</div>
            <div className="text-xs text-slate-400 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Pack</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Mensuel</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Agents</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Depuis</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {clients.map((client) => {
                const sc = statusConfig[client.status]
                const pc = packConfig[client.pack]
                const liveAgents = client.agents.filter((a) => a.status === 'LIVE').length
                return (
                  <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-slate-900">{client.companyName}</div>
                      <div className="text-xs text-slate-400">{client.contactName} · {client.contactEmail}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-semibold ${pc.color}`}>{pc.label}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${sc.dot}`} />
                        <Badge variant={sc.variant}>{sc.label}</Badge>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-slate-900">{formatEur(client.monthlyAmount)}</td>
                    <td className="px-6 py-4">
                      <span className={`text-sm font-medium ${liveAgents > 0 ? 'text-emerald-600' : 'text-slate-400'}`}>
                        {liveAgents}/{client.agents.length}
                      </span>
                      <span className="text-xs text-slate-400 ml-1">en ligne</span>
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">
                      {client.contractStartDate ? formatDate(client.contractStartDate) : '—'}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/clients/${client.id}`}
                        className="text-xs font-medium text-atlas-600 hover:text-atlas-700 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        Gérer →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Aucun client. Commencez par convertir un prospect.
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
