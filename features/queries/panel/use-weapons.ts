import { useSuspenseQuery } from '@tanstack/react-query'
import { fetcher } from '@/features/helpers/fetcher'
import { Weapons } from '@prisma/client'
import { API_PANEL_PREFIX } from '@/consts/general'

export function useGetWeapons() {
  const { data, status, error, refetch } = useSuspenseQuery<Array<Weapons>>({
    queryKey: ['weapons'],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/weapon`),
  })

  return { data, status, error, refetch }
}

export function useGetWeapon(id: string) {
  const { data, status, error, refetch } = useSuspenseQuery<Weapons>({
    queryKey: ['weapon', id],
    queryFn: async () => await fetcher(`${API_PANEL_PREFIX}/weapon/id/${id}`),
  })

  return { data, status, error, refetch }
}
