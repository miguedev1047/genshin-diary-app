import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Artifacts } from '@prisma/client'

export function useGetArtifacts() {
  const { data, status, error, refetch } = useQuery<Array<Artifacts>>({
    queryKey: ['artifacts'],
    queryFn: async () => await fetcher('/api/panel/artifact'),
  })

  return { data, status, error, refetch }
}

export function useGetArtifact(id: string) {
  const { data, status, error, refetch } = useQuery<Artifacts>({
    queryKey: ['artifact', id],
    queryFn: async () => await fetcher(`/api/panel/artifact/id/${id}`),
  })

  return { data, status, error, refetch }
}
