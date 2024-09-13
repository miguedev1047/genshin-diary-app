'use client'

import { Toggle } from '@/components/ui/toggle'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { QueryToggleProps } from './query-toggle.type'
import { Suspense } from 'react'
import { cn } from '@/lib/utils'

export function QueryToggle(props: QueryToggleProps) {
  const {
    queryKey,
    children,
    className,
    queryValue,
    variant = 'outline',
  } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params)

  const isPressed = searchParams.get(queryKey) === queryValue.toLowerCase()

  const handleToggle = (value: boolean) => {
    if (value) {
      searchParams.set(queryKey, queryValue.toLowerCase())
    } else {
      searchParams.delete(queryKey)
    }

    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }

  return (
    <Suspense>
      <Toggle
        className={cn('w-12 h-12 p-1.5', className)}
        variant={variant}
        pressed={isPressed}
        defaultPressed={isPressed}
        onPressedChange={handleToggle}
      >
        {children}
      </Toggle>
    </Suspense>
  )
}
