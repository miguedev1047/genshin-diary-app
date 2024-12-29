import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PANEL_PREFIX } from '@/consts/misc'

export function useGetTalents() {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['talents'],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/talent`),
  })

  return { data, status, error, refetch }
}

export function useGetTalent(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['talent', id],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/talent/id/${id}`),
  })

  return { data, status, error, refetch }
}
