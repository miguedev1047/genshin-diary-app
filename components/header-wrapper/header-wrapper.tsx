import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { HeaderWrapperProps } from '@/components/header-wrapper/header-wrapper.type'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { Suspense } from 'react'

export function HeaderWrapper(props: HeaderWrapperProps) {
  const { children, className } = props

  return (
    <Card className={cn('p-6 space-y-4', className)}>
      <Suspense fallback={<SpinLoaderInput />}>{children}</Suspense>
    </Card>
  )
}
