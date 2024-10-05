import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'

export function useGetMaterials() {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => await fetcher('/api/panel/material'),
  })

  return { data, status, error, refetch }
}

export function useGetMaterial(id: string) {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['material', id],
    queryFn: async () => await fetcher(`/api/panel/material/id/${id}`),
  })

  return { data, status, error, refetch }
}
