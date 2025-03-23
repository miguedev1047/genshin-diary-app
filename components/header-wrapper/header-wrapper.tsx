import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { HeaderWrapperProps } from '@/components/header-wrapper/header-wrapper.type'

export function HeaderWrapper(props: HeaderWrapperProps) {
  const { children, className } = props

  return (
    <Card className={cn('max-md:border-0 max-md:border-none max-md:p-0 p-6 space-y-4 max-md:mb-6', className)}>
      {children}
    </Card>
  )
}
