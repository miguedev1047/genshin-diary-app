import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { API_PREFIX, GC_MS, STALE_MS } from '@/consts/misc'
import { Materials } from '@prisma/client'

export function useGetMaterials() {
  const { data, status, error, refetch } = useQuery<Array<Materials>>({
    queryKey: ['materials'],
    queryFn: async () => await fetcher(`${API_PREFIX}/material`),
    staleTime: STALE_MS,
    gcTime: GC_MS,
  })

  return { data, status, error, refetch }
}

export function useGetMaterial(id: string) {
  const { data, status, error, refetch } = useQuery<Materials>({
    queryKey: ['material', id],
    queryFn: async () => await fetcher(`${API_PREFIX}/material/id/${id}`),
    staleTime: STALE_MS,
    gcTime: GC_MS,
  })

  return { data, status, error, refetch }
}
