import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PANEL_PREFIX } from '@/consts/general'

export function useGetMaterials() {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['materials'],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/material`),
  })

  return { data, status, error, refetch }
}

export function useGetMaterial(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery({
    queryKey: ['material', id],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/material/id/${id}`),
  })

  return { data, status, error, refetch }
}
