import { useQuery } from '@tanstack/react-query'
import { PlayerDataProps } from '@/types/player-data.type'
import { fetcher } from '@/features/helpers/fetcher'

export function useGetPlayerData(uid: string) {
  const { data, status, error, refetch } = useQuery<PlayerDataProps | null>({
    queryKey: ['character', uid],
    queryFn: async () =>
      await fetcher(`/api/v0/genshin-diary/player/uid/${uid}`),
  })

  return { data, status, error, refetch }
}
