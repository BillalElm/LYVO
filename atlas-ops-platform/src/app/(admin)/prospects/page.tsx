import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import Link from 'next/link'

const statusLabels: Record<string, { label: string; variant: any }> = {
  IDENTIFIED:         { label: 'Identifié',     variant: 'neutral' },
  CONTACTED:          { label: 'Contacté',       variant: 'info' },
  DIAGNOSTIC_PLANNED: { label: 'Diag. planifié', variant: 'info' },
  DIAGNOSTIC_DONE:    { label: 'Diag. réalisé',  variant: 'default' },
  PROPOSAL_SENT:      { label: 'Devis envoyé',   variant: 'warning' },
  NEGOTIATION:        { label: 'Négociation',    variant: 'warning' },
  WON:                { label: 'Gagné',           variant: 'success' },
  LOST:               { label: 'Perdu',           variant: 'danger' },
  DISQUALIFIED:       { label: 'Hors cible',      variant: 'neutral' },
}

const sectorLabels: Record<string, string> = {
  BTP: 'BTP',
  CABINET_COMPTABLE: 'Cabinet comptable',
  CABINET_IMMOBILIER: 'Cabinet immobilier',
  CABINET_CONSEIL: 'Conseil',
  AGENCE: 'Agence',
  PME_SERVICES: 'PME services',
  AUTRE: 'Autre',
}

export default async function ProspectsPage() {
  const prospects = await prisma.prospect.findMany({
    orderBy: { createdAt: 'desc' },
    include: { _count: { select: { activities: true } } },
  })

  const pipeline = ['IDENTIFIED', 'CONTACTED', 'DIAGNOSTIC_PLANNED', 'DIAGNOSTIC_DONE', 'PROPOSAL_SENT', 'NEGOTIATION']
  const active = prospects.filter((p) => pipeline.includes(p.status))
  const won = prospects.filter((p) => p.status === 'WON')
  const lost = prospects.filter((p) => ['LOST', 'DISQUALIFIED'].includes(p.status))

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Prospects</h1>
          <p className="text-slate-500 text-sm mt-1">
            {active.length} en pipeline · {won.length} gagnés · {lost.length} perdus
          </p>
        </div>
        <Link
          href="/admin/prospects/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-atlas-600 hover:bg-atlas-500 text-white text-sm font-semibold transition-all shadow-lg shadow-atlas-600/20"
        >
          + Nouveau prospect
        </Link>
      </div>

      {/* Pipeline kanban-style summary */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-8">
        {pipeline.map((status) => {
          const count = prospects.filter((p) => p.status === status).length
          const s = statusLabels[status]
          return (
            <div key={status} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
              <div className="text-2xl font-black text-slate-900">{count}</div>
              <div className="text-xs text-slate-400 mt-1">{s.label}</div>
            </div>
          )
        })}
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100">
          <h2 className="font-bold text-slate-900 text-sm">Tous les prospects ({prospects.length})</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-100">
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Entreprise</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Contact</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Secteur</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Statut</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Pack visé</th>
                <th className="text-left px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Ajouté le</th>
                <th className="text-right px-6 py-3 text-xs font-semibold text-slate-400 uppercase tracking-wide">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {prospects.map((p) => {
                const s = statusLabels[p.status]
                return (
                  <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">{p.companyName}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">{p.contactName}</div>
                      {p.contactEmail && <div className="text-xs text-slate-400">{p.contactEmail}</div>}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{sectorLabels[p.sector]}</td>
                    <td className="px-6 py-4">
                      <Badge variant={s.variant}>{s.label}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      {p.recommendedPack ? (
                        <span className="text-xs font-medium text-atlas-600">
                          {p.recommendedPack === 'PILOTE' ? 'Pilote' : p.recommendedPack === 'STANDARD' ? 'Standard' : 'Duo'}
                        </span>
                      ) : (
                        <span className="text-slate-300 text-xs">—</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-400 text-xs">{formatDate(p.createdAt)}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        href={`/admin/prospects/${p.id}`}
                        className="text-xs font-medium text-atlas-600 hover:text-atlas-700 transition-colors"
                      >
                        Voir →
                      </Link>
                    </td>
                  </tr>
                )
              })}
              {prospects.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    Aucun prospect pour l'instant.{' '}
                    <Link href="/admin/prospects/new" className="text-atlas-600 hover:underline">
                      Ajouter le premier
                    </Link>
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
