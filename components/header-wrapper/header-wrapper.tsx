import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { HeaderWrapperProps } from '@/components/header-wrapper/header-wrapper.type'

export function HeaderWrapper(props: HeaderWrapperProps) {
  const { children, className } = props

  return <Card className={cn('p-6 space-y-4', className)}>{children}</Card>
}
