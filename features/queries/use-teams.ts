import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PREFIX, GC_MS, STALE_MS } from '@/consts/misc'

export function useGetTeams() {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['teams'],
    queryFn: async () => await fetcher(`${API_PREFIX}/team`),
    staleTime: STALE_MS,
    gcTime: GC_MS
  })

  return { data, status, error, refetch }
}

export function useGetTeam(id: string) {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['team', id],
    queryFn: async () => await fetcher(`${API_PREFIX}/team/id/${id}`),
    staleTime: STALE_MS,
    gcTime: GC_MS
  })

  return { data, status, error, refetch }
}
