import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Weapons } from '@prisma/client'
import { API_PREFIX, STALE_MS } from '@/consts/misc'

export function useGetWeapons() {
  const { data, status, error, refetch } = useQuery<Array<Weapons>>({
    queryKey: ['weapons'],
    queryFn: async () => await fetcher(`${API_PREFIX}/weapon`),
    staleTime: STALE_MS,
  })

  return { data, status, error, refetch }
}

export function useGetWeapon(id: string) {
  const { data, status, error, refetch } = useQuery<Weapons>({
    queryKey: ['weapon', id],
    queryFn: async () => await fetcher(`${API_PREFIX}/weapon/id/${id}`),
    staleTime: STALE_MS,
  })

  return { data, status, error, refetch }
}
