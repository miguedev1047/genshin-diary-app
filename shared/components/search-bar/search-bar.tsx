'use client'

import { InputBlock } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { SearchBarProps } from '@/shared/components/search-bar/search-bar.type'
import { useDebouncedCallback } from 'use-debounce'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const WAIT_BEFORE_DEBOUNCE = 500

export function SearchBar(props: SearchBarProps) {
  const { queryParam, placeholder, className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  // @ts-ignore
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
    <InputBlock
      className={cn('max-w-[320px]', className)}
      defaultValue={searchParams.get(queryParam)?.toString()}
      onChange={(e) => handleSearch(e.target.value)}
      placeholder={placeholder}
      leftIcon={<Search />}
    />
  )
}
