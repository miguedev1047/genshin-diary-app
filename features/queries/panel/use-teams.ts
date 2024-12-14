import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'

export function useGetTeams() {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['teams'],
    queryFn: async () => await fetcher('/api/v0/panel/team'),
  })

  return { data, status, error, refetch }
}

export function useGetTeam(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['team', id],
    queryFn: async () => await fetcher(`/api/v0/panel/team/id/${id}`),
  })

  return { data, status, error, refetch }
}
