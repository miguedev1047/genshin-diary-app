'use client'

import { Toggle } from '@/components/ui/toggle'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { QueryToggleProps } from '@/shared/components/query-toggle/query-toggle.type'
import { useDebouncedCallback } from 'use-debounce'
import { cn } from '@/lib/utils'

const WAIT_BEFORE_DEBOUNCE = 300

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
  // @ts-ignore
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
      className={cn('w-12 h-12 p-1.5', className)}
      variant={variant}
      pressed={isPressed}
      defaultPressed={isPressed}
      onPressedChange={handleToggle}
    >
      {children}
    </Toggle>
  )
}
