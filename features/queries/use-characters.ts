import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Prisma } from '@prisma/client'
import { API_PREFIX, STALE_MS } from '@/consts/misc'

export function useGetCharacters() {
  const { data, status, error, refetch } = useQuery<
    Array<Prisma.CharactersGetPayload<{ include: { images: true } }>>
  >({
    queryKey: ['characters'],
    queryFn: async () => await fetcher(`${API_PREFIX}/character`),
    staleTime: STALE_MS,
  })

  return { data, status, error, refetch }
}

export function useGetCharacter(id: string) {
  const { data, status, error, refetch } = useQuery<
    Prisma.CharactersGetPayload<{ include: { images: true } }>
  >({
    queryKey: ['character', id],
    queryFn: async () => await fetcher(`${API_PREFIX}/character/id/${id}`),
    staleTime: STALE_MS,
  })

  return { data, status, error, refetch }
}
