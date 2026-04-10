import { prisma } from '@/lib/prisma'
import { formatEur, formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

const statusConfig: Record<string, { label: string; variant: any }> = {
  DRAFT:     { label: 'Brouillon', variant: 'neutral' },
  SENT:      { label: 'Envoyée',   variant: 'warning' },
  PAID:      { label: 'Payée',     variant: 'success' },
  OVERDUE:   { label: 'En retard', variant: 'danger' },
  CANCELLED: { label: 'Annulée',   variant: 'neutral' },
}

const typeLabels: Record<string, string> = {
  SETUP:   'Mise en place',
  MONTHLY: 'Mensuelle',
  HOSTING: 'Hébergement',
  CUSTOM:  'Personnalisée',
}

export default async function FacturesPage() {
  const invoices = await prisma.invoice.findMany({
    orderBy: { issueDate: 'desc' },
    include: { client: { select: { companyName: true } } },
  })

  const totalPaid = invoices.filter((i) => i.status === 'PAID').reduce((s, i) => s + i.totalTTC, 0)
  const totalPending = invoices.filter((i) => i.status === 'SENT').reduce((s, i) => s + i.totalTTC, 0)
  const totalOverdue = invoices.filter((i) => i.status === 'OVERDUE').reduce((s, i) => s + i.totalTTC, 0)

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Factures</h1>
          <p className="text-slate-500 text-sm mt-1">{invoices.length} factures au total</p>
        </div>
        <Link
          href="/admin/factures/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-atlas-600 hover:bg-atlas-500 text-white text-sm font-semibold transition-all shadow-lg shadow-atlas-600/20"
        >
          + Émettre une facture
        </Link>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total encaissé', value: formatEur(totalPaid), note: 'TTC', color: 'text-emerald-600' },
          { label: 'En attente', value: formatEur(totalPending), note: 'TTC envoyées', color: 'text-amber-600' },
          { label: 'En retard', value: formatEur(totalOverdue), note: 'TTC à relancer', color: 'text-red-600' },
        ].map((k) => (
          <div key={k.label} className="bg-white border border-slate-200 rounded-2xl p-6">
            <div className={`text-2xl font-black ${k.color} mb-1`}>{k.value}</div>
            <div className="text-sm font-medium text-slate-700">{k.label}</div>
            <div className="text-xs text-slate-400">{k.note}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">N°</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Client</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Type</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Date</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Échéance</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Montant TTC</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {invoices.map((inv) => {
                const sc = statusConfig[inv.status]
                const isOverdueNow = inv.status === 'SENT' && new Date(inv.dueDate) < new Date()
                return (
                  <tr key={inv.id} className={`hover:bg-slate-50/50 transition-colors ${isOverdueNow ? 'bg-red-50/30' : ''}`}>
                    <td className="px-6 py-4 font-mono text-xs text-slate-600">{inv.number}</td>
                    <td className="px-6 py-4 font-medium text-slate-900">{inv.client.companyName}</td>
                    <td className="px-6 py-4 text-slate-500">{typeLabels[inv.type]}</td>
                    <td className="px-6 py-4">
                      <Badge variant={isOverdueNow ? 'danger' : sc.variant}>
                        {isOverdueNow ? 'En retard' : sc.label}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs">{formatDate(inv.issueDate)}</td>
                    <td className={`px-6 py-4 text-xs font-medium ${isOverdueNow ? 'text-red-600' : 'text-slate-500'}`}>
                      {formatDate(inv.dueDate)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-slate-900">{formatEur(inv.totalTTC)}</td>
                    <td className="px-6 py-4 text-right">
                      <a href={`/admin/factures/${inv.id}/pdf`} className="text-xs font-medium text-atlas-600 hover:text-atlas-700">
                        PDF
                      </a>
                    </td>
                  </tr>
                )
              })}
              {invoices.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-slate-400">
                    Aucune facture émise.
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
