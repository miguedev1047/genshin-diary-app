import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'

export function useGetMaterials() {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => await fetcher('/api/panel/material'),
  })

  return { data, status, error, refetch }
}
