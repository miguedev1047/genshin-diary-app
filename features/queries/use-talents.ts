import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PREFIX, GC_MS, STALE_MS } from '@/consts/misc'
import { Materials } from '@prisma/client'

export function useGetTalents() {
  const { data, status, error, refetch } = useQuery<Array<Materials>>({
    queryKey: ['talents'],
    queryFn: async () => await fetcher(`${API_PREFIX}/talent`),
    staleTime: STALE_MS,
    gcTime: GC_MS
  })

  return { data, status, error, refetch }
}

export function useGetTalent(id: string) {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['talent', id],
    queryFn: async () => await fetcher(`${API_PREFIX}/talent/id/${id}`),
    staleTime: STALE_MS,
    gcTime: GC_MS
  })

  return { data, status, error, refetch }
}
