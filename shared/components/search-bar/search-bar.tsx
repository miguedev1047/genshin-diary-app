'use client'

import { InputBlock } from '@/components/ui/input'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'
import { SearchBarProps } from './search-bar.type'

export function SearchBar(props: SearchBarProps) {
  const { queryParam, placeholder, className } = props

  const { replace } = useRouter()
  const pathname = usePathname()
  const params = useSearchParams()
  const searchParams = new URLSearchParams(params)

  const handleSearch = (value: string) => {
    if (value) {
      searchParams.set(queryParam, value)
    } else {
      searchParams.delete(queryParam)
    }
    replace(`${pathname}?${searchParams.toString()}`, { scroll: false })
  }
  
  return (
    <Suspense>
      <InputBlock
        className={cn('max-w-[320px]', className)}
        defaultValue={searchParams.get(queryParam)?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder={placeholder}
        leftIcon={<Search />}
      />
    </Suspense>
  )
}
