import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatDate } from '@/lib/utils'
import { Badge } from '@/components/ui/Badge'
import { redirect } from 'next/navigation'

export default async function RapportsPage() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')

  const user = await prisma.user.findUnique({
    where: { email: session.user?.email! },
    include: {
      client: {
        include: {
          reports: {
            orderBy: { month: 'desc' },
            include: {
              client: {
                include: {
                  agents: {
                    include: {
                      metrics: { orderBy: { month: 'desc' }, take: 1 },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  })

  const reports = user?.client?.reports ?? []

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-white">Rapports mensuels</h1>
        <p className="text-slate-400 text-sm mt-1">{reports.length} rapport{reports.length > 1 ? 's' : ''} disponible{reports.length > 1 ? 's' : ''}</p>
      </div>

      {reports.length === 0 && (
        <div className="bg-white/3 border border-white/8 rounded-2xl p-12 text-center">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-white font-bold mb-2">Votre premier rapport arrive bientôt</h2>
          <p className="text-slate-500 text-sm">
            Le rapport du premier mois vous sera envoyé à J+30 après la mise en production.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {reports.map((report) => {
          const monthLabel = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' }).format(new Date(report.month))
          const agents = report.client.agents
          const relanceMetric = agents.find((a) => a.type === 'RELANCE')?.metrics[0]
          const flowMetric = agents.find((a) => a.type === 'FLOW')?.metrics[0]

          return (
            <div key={report.id} className="bg-white/3 border border-white/8 rounded-2xl overflow-hidden hover:border-white/12 transition-colors">
              <div className="px-6 py-5 flex items-center justify-between border-b border-white/5">
                <div>
                  <div className="text-base font-bold text-white capitalize">{monthLabel}</div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    {report.sentAt ? `Envoyé le ${formatDate(report.sentAt)}` : 'En cours de rédaction'}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={report.sentAt ? 'success' : 'warning'}>
                    {report.sentAt ? 'Disponible' : 'Bientôt'}
                  </Badge>
                </div>
              </div>

              {(relanceMetric || flowMetric) && (
                <div className="px-6 py-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {relanceMetric && [
                      { v: relanceMetric.relancesSent, l: 'Relances envoyées' },
                      { v: `${relanceMetric.relancesSent > 0 ? Math.round((relanceMetric.responsesReceived / relanceMetric.relancesSent) * 100) : 0}%`, l: 'Taux de réponse' },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="text-xl font-black text-white">{s.v}</div>
                        <div className="text-xs text-slate-500">{s.l}</div>
                      </div>
                    ))}
                    {flowMetric && [
                      { v: flowMetric.requestsReceived, l: 'Demandes reçues' },
                      { v: `${flowMetric.requestsReceived > 0 ? Math.round((flowMetric.requestsAutoResolved / flowMetric.requestsReceived) * 100) : 0}%`, l: 'Auto-traitées' },
                    ].map((s) => (
                      <div key={s.l}>
                        <div className="text-xl font-black text-white">{s.v}</div>
                        <div className="text-xs text-slate-500">{s.l}</div>
                      </div>
                    ))}
                    {report.hoursEstimated && (
                      <div>
                        <div className="text-xl font-black text-white">~{report.hoursEstimated}h</div>
                        <div className="text-xs text-slate-500">Heures libérées</div>
                      </div>
                    )}
                    {report.roiEstimated && (
                      <div>
                        <div className="text-xl font-black text-atlas-400">x{report.roiEstimated}</div>
                        <div className="text-xs text-slate-500">ROI estimé</div>
                      </div>
                    )}
                  </div>

                  {report.summary && (
                    <div className="mt-4 pt-4 border-t border-white/5">
                      <p className="text-sm text-slate-400 leading-relaxed">{report.summary}</p>
                    </div>
                  )}

                  {report.recommendations && (
                    <div className="mt-3">
                      <p className="text-xs font-semibold text-atlas-400 mb-1">Recommandation du mois</p>
                      <p className="text-sm text-slate-500">{report.recommendations}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
