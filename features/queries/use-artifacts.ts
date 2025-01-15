import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Artifacts } from '@prisma/client'
import { API_PREFIX } from '@/consts/misc'

export function useGetArtifacts() {
  const { data, status, error, refetch } = useQuery<Array<Artifacts>>({
    queryKey: ['artifacts'],
    queryFn: async () => await fetcher(`${API_PREFIX}/artifact`),
  })

  return { data, status, error, refetch }
}

export function useGetArtifact(id: string) {
  const { data, status, error, refetch } = useQuery<Artifacts>({
    queryKey: ['artifact', id],
    queryFn: async () =>
      await fetcher(`${API_PREFIX}/artifact/id/${id}`),
  })

  return { data, status, error, refetch }
}
