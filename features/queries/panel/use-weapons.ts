import { useQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Weapons } from '@prisma/client'

export function useGetWeapons() {
  const { data, status, error, refetch } = useQuery<Array<Weapons>>({
    queryKey: ['weapons'],
    queryFn: async () => await fetcher('/api/panel/weapon'),
  })

  return { data, status, error, refetch }
}

export function useGetWeapon(id: string) {
  const { data, status, error, refetch } = useQuery<Weapons>({
    queryKey: ['weapon', id],
    queryFn: async () => await fetcher(`/api/panel/weapon/id/${id}`),
  })

  return { data, status, error, refetch }
}
