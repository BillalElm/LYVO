import { prisma } from '@/lib/prisma'
import { formatEur } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'

async function getStats() {
  const [clients, prospects, invoices, agents] = await Promise.all([
    prisma.client.count({ where: { status: 'ACTIVE' } }),
    prisma.prospect.count({ where: { status: { notIn: ['WON', 'LOST', 'DISQUALIFIED'] } } }),
    prisma.invoice.findMany({
      where: { status: { in: ['SENT', 'OVERDUE'] } },
      select: { totalTTC: true, status: true, client: { select: { companyName: true } }, dueDate: true, number: true },
      orderBy: { dueDate: 'asc' },
      take: 5,
    }),
    prisma.agent.count({ where: { status: 'LIVE' } }),
  ])

  const mrr = await prisma.client.aggregate({
    _sum: { monthlyAmount: true },
    where: { status: 'ACTIVE' },
  })

  const overdueCount = await prisma.invoice.count({ where: { status: 'OVERDUE' } })

  return { clients, prospects, agents, invoices, mrr: mrr._sum.monthlyAmount ?? 0, overdueCount }
}

export default async function DashboardPage() {
  const stats = await getStats()

  const kpis = [
    { label: 'Clients actifs', value: stats.clients, sub: 'en production', color: 'text-atlas-600', bg: 'bg-atlas-50', icon: '🏢' },
    { label: 'Agents en ligne', value: stats.agents, sub: 'opérationnels', color: 'text-emerald-600', bg: 'bg-emerald-50', icon: '⚡' },
    { label: 'MRR', value: formatEur(stats.mrr), sub: 'revenus mensuels HT', color: 'text-slate-900', bg: 'bg-slate-100', icon: '💶' },
    { label: 'Prospects actifs', value: stats.prospects, sub: 'en pipeline', color: 'text-amber-600', bg: 'bg-amber-50', icon: '🎯' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-slate-900">Tableau de bord</h1>
        <p className="text-slate-500 text-sm mt-1">Vue d'ensemble de l'activité ATLAS OPS</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {kpis.map((kpi) => (
          <div key={kpi.label} className="bg-white border border-slate-200 rounded-2xl p-6 hover:border-slate-300 hover:shadow-md transition-all">
            <div className={`w-10 h-10 ${kpi.bg} rounded-xl flex items-center justify-center text-xl mb-4`}>
              {kpi.icon}
            </div>
            <div className={`text-2xl font-black ${kpi.color} mb-1`}>{kpi.value}</div>
            <div className="text-sm font-medium text-slate-700">{kpi.label}</div>
            <div className="text-xs text-slate-400 mt-0.5">{kpi.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Factures en attente */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="font-bold text-slate-900">Factures en attente</h2>
            {stats.overdueCount > 0 && (
              <Badge variant="danger">{stats.overdueCount} en retard</Badge>
            )}
          </div>
          {stats.invoices.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-6">Aucune facture en attente</p>
          ) : (
            <div className="space-y-3">
              {stats.invoices.map((inv) => (
                <div key={inv.number} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
                  <div>
                    <div className="text-sm font-medium text-slate-900">{inv.client.companyName}</div>
                    <div className="text-xs text-slate-400">{inv.number}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold text-slate-900">{formatEur(inv.totalTTC)}</div>
                    <Badge variant={inv.status === 'OVERDUE' ? 'danger' : 'warning'} className="text-xs">
                      {inv.status === 'OVERDUE' ? 'En retard' : 'Envoyée'}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions rapides */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6">
          <h2 className="font-bold text-slate-900 mb-5">Actions rapides</h2>
          <div className="grid grid-cols-2 gap-3">
            {[
              { href: '/admin/prospects/new', label: 'Nouveau prospect', icon: '➕', desc: 'Ajouter au pipeline' },
              { href: '/admin/clients/new', label: 'Nouveau client', icon: '🏢', desc: 'Créer un compte client' },
              { href: '/admin/devis/new', label: 'Créer un devis', icon: '📄', desc: 'Générer un devis PDF' },
              { href: '/admin/factures/new', label: 'Émettre une facture', icon: '🧾', desc: 'Facture mensuelle' },
            ].map((action) => (
              <a
                key={action.href}
                href={action.href}
                className="flex flex-col gap-2 p-4 rounded-xl border border-slate-100 hover:border-atlas-200 hover:bg-atlas-50/30 transition-all group"
              >
                <span className="text-2xl">{action.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-slate-900 group-hover:text-atlas-700">{action.label}</div>
                  <div className="text-xs text-slate-400">{action.desc}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
