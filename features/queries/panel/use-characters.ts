import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Prisma } from '@prisma/client'

export function useGetCharacters() {
  const { data, status, error, refetch } = useQuery<
    Array<Prisma.CharactersGetPayload<{ include: { images: true } }>>
  >({
    queryKey: ['characters'],
    queryFn: async () => await fetcher('/api/panel/character'),
  })

  return { data, status, error, refetch }
}

export function useGetCharacter(id: string) {
  const { data, status, error, refetch } = useQuery<
    Prisma.CharactersGetPayload<{ include: { images: true } }>
  >({
    queryKey: ['character', id],
    queryFn: async () => await fetcher(`/api/panel/character/id/${id}`),
  })

  return { data, status, error, refetch }
}
