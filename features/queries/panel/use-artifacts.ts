import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Artifacts } from '@prisma/client'

export function useGetArtifacts() {
  const { data, status, error, refetch } = useSuspenseQuery<Array<Artifacts>>({
    queryKey: ['artifacts'],
    queryFn: async () => await fetcher('/api/v0/panel/artifact'),
  })

  return { data, status, error, refetch }
}

export function useGetArtifact(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery<Artifacts>({
    queryKey: ['artifact', id],
    queryFn: async () => await fetcher(`/api/v0/panel/artifact/id/${id}`),
  })

  return { data, status, error, refetch }
}
