'use client'

import { Toggle } from '@/components/ui/toggle'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { QueryToggleProps } from '@/components/query-toggle/query-toggle.type'
import { useDebouncedCallback } from 'use-debounce'
import { Suspense } from 'react'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { cn } from '@/lib/utils'

const WAIT_BEFORE_DEBOUNCE = 300

export function QueryToggle(props: QueryToggleProps) {
  return (
    <Suspense fallback={<SpinLoaderInput />}>
      <QueryComponent {...props} />
    </Suspense>
  )
}

function QueryComponent(props: QueryToggleProps) {
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

  const handleToggle = useDebouncedCallback((value: boolean) => {
    if (value) {
      searchParams.set(queryKey, queryValue.toLowerCase())
    } else {
      searchParams.delete(queryKey)
    }

    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, WAIT_BEFORE_DEBOUNCE)

  return (
    <Toggle
      className={cn(
        'w-12 h-12 p-1.5 relative',
        'bg-card-foreground data-[state=on]:bg-muted-foreground hover:bg-muted-foreground',
        'dark:bg-card data-[state=on]:dark:bg-accent dark:hover:bg-accent',
        'text-secondary dark:text-secondary-foreground',
        className
      )}
      variant={variant}
      pressed={isPressed}
      defaultPressed={isPressed}
      onPressedChange={handleToggle}
    >
      {children}
    </Toggle>
  )
}
