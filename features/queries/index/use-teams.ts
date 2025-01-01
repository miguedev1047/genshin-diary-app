import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PUBLIC_PREFIX } from '@/consts/misc'

export function useGetTeams() {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['teams'],
    queryFn: async () => await fetcher(`${API_PUBLIC_PREFIX}/team`),
  })

  return { data, status, error, refetch }
}

export function useGetTeam(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['team', id],
    queryFn: async () => await fetcher(`${API_PUBLIC_PREFIX}/team/id/${id}`),
  })

  return { data, status, error, refetch }
}
