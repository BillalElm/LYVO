import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import Sidebar from '@/components/dashboard/Sidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/login')
  if ((session.user as any)?.role !== 'ADMIN') redirect('/agent')

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}
