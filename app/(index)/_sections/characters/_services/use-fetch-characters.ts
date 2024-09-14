import { fetcher } from '@/features/helpers/fetcher'
import { CharacterFetchProps } from '@/types'
import { Prisma } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const fetchFn = async (props: CharacterFetchProps) => {
  const { element = null, name = null, stars = null, weapon = null } = props

  const SEARCH = `name=${name}&stars=${stars}&weapon=${weapon}&element=${element}`
  const API_URL = `/api/public/characters?${SEARCH}`

  return await fetcher(API_URL)
}

export function useFetchCharacters() {
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const PARAMS = {
    name: searchParams.get('name')!,
    star: searchParams.get('star')!,
    element: searchParams.get('element')!,
    weapon: searchParams.get('weapon')!,
  }

  const { data, status, error, refetch } = useQuery<
    Array<Prisma.CharactersGetPayload<{ include: { images: true } }>>
  >({
    queryKey: ['characters'],
    queryFn: async () => await fetchFn(PARAMS),
  })

  const NAVIGATOR_URL = `${pathname}?${searchParams.toString()}`

  useEffect(() => {
    refetch()
  }, [refetch, NAVIGATOR_URL])

  return { data, status, error }
}
