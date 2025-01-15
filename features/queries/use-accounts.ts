import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PREFIX } from '@/consts/misc'

export function useGetAccounts() {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['accounts'],
    queryFn: async () => await fetcher(`${API_PREFIX}/account`),
  })

  return { data, status, error, refetch }
}

export function useGetAccount(id: string) {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['account', id],
    queryFn: async () => await fetcher(`${API_PREFIX}/account/id/${id}`),
  })

  return { data, status, error, refetch }
}
