'use client'

import { Input } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { QuerySearchProps } from '@/components/query-search/query-search.type'
import { useDebouncedCallback } from 'use-debounce'
import { Search } from 'lucide-react'
import { Suspense, useId } from 'react'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { cn } from '@/lib/utils'

const WAIT_BEFORE_DEBOUNCE = 500

export function QuerySearch(props: QuerySearchProps) {
  return (
    <Suspense fallback={<SpinLoaderInput />}>
      <QueryComponent {...props} />
    </Suspense>
  )
}

function QueryComponent(props: QuerySearchProps) {
  const { queryParam, placeholder, className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const id = useId()

  const searchParams = new URLSearchParams(params)

  const handleSearch = useDebouncedCallback((value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }, WAIT_BEFORE_DEBOUNCE)

  return (
    <div className='relative w-full lg:w-80'>
      <Input
        id={`INPUT-${id}`}
        className={cn('pe-9 ps-9 peer !w-full', className)}
        defaultValue={searchParams.get(queryParam)?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
      />
      <div className='pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50'>
        <Search
          size={16}
          strokeWidth={2}
        />
      </div>
    </div>
  )
}
