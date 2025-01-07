import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PANEL_PREFIX } from '@/consts/misc'

export function useGetAccounts() {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['accounts'],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/account`),
  })

  return { data, status, error, refetch }
}

export function useGetAccount(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['account', id],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/account/id/${id}`),
  })

  return { data, status, error, refetch }
}
