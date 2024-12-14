import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'

export function useGetMaterials() {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['materials'],
    queryFn: async () => await fetcher('/api/v0/panel/material'),
  })

  return { data, status, error, refetch }
}

export function useGetMaterial(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['material', id],
    queryFn: async () => await fetcher(`/api/v0/panel/material/id/${id}`),
  })

  return { data, status, error, refetch }
}
