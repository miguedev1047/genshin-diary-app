import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PUBLIC_PREFIX } from '@/consts/misc'

export function useGetMaterials() {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['materials'],
    queryFn: async () => await fetcher(`${API_PUBLIC_PREFIX}/material`),
  })

  return { data, status, error, refetch }
}

export function useGetMaterial(id: string) {
  const { data, status, error, refetch } = useQuery({
    queryKey: ['material', id],
    queryFn: async () =>
      await fetcher(`${API_PUBLIC_PREFIX}/material/id/${id}`),
  })

  return { data, status, error, refetch }
}
