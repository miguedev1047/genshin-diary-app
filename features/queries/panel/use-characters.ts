import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Prisma } from '@prisma/client'
import { API_PANEL_PREFIX } from '@/consts/misc'

export function useGetCharacters() {
  const { data, status, error, refetch } = useSuspenseQuery<
    Array<Prisma.CharactersGetPayload<{ include: { images: true } }>>
  >({
    queryKey: ['characters'],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/character`),
  })

  return { data, status, error, refetch }
}

export function useGetCharacter(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery<
    Prisma.CharactersGetPayload<{ include: { images: true } }>
  >({
    queryKey: ['character', id],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/character/id/${id}`),
  })

  return { data, status, error, refetch }
}
