import { cn } from '@/lib/utils'

type Variant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const variants: Record<Variant, string> = {
  default: 'bg-atlas-100 text-atlas-700 border-atlas-200',
  success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-600 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  neutral: 'bg-slate-100 text-slate-600 border-slate-200',
}

export function Badge({ children, variant = 'default', className }: {
  children: React.ReactNode
  variant?: Variant
  className?: string
}) {
  return (
    <span className={cn(
      'inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border',
      variants[variant],
      className
    )}>
      {children}
    </span>
  )
}
