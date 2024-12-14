import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Weapons } from '@prisma/client'

export function useGetWeapons() {
  const { data, status, error, refetch } = useSuspenseQuery<Array<Weapons>>({
    queryKey: ['weapons'],
    queryFn: async () => await fetcher('/api/v0/panel/weapon'),
  })

  return { data, status, error, refetch }
}

export function useGetWeapon(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery<Weapons>({
    queryKey: ['weapon', id],
    queryFn: async () => await fetcher(`/api/v0/panel/weapon/id/${id}`),
  })

  return { data, status, error, refetch }
}
