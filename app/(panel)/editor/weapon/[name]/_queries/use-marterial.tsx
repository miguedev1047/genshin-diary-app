import { fetcher } from '@/features/helpers/fetcher'
import { Materials } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export function useGetMaterials() {
  const {
    data: MATERIALS,
    status,
    error,
    refetch,
  } = useQuery<Array<Materials>>({
    queryKey: ['materials'],
    queryFn: async () => await fetcher('/api/panel/material'),
  })

  const OPTIONS = MATERIALS?.map((material) => ({
    label: material.name,
    value: material.id,
    image: material.image_url,
  }))

  return { data: OPTIONS, status, error, refetch }
}

export function useGetMaterialById({ material_id }: { material_id: string }) {
  const {
    data: MATERIALS,
    status,
    error,
    refetch,
  } = useQuery<Materials>({
    queryKey: [`material-${material_id}`],
    queryFn: async () => await fetcher(`/api/panel/material/id/${material_id}`),
  })

  return { data: MATERIALS, status, error, refetch }
}
