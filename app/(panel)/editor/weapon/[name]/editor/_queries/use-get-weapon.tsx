import { fetcher } from '@/features/helpers/fetcher'
import { Prisma } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useGetWeapon() {
  const { name } = useParams()

  const { data, status, error } = useQuery<
    Prisma.WeaponsGetPayload<{
      include: { ascensions: true; bests_characters: true }
    }>
  >({
    queryKey: [`weapon-${name}`],
    queryFn: async () => await fetcher(`/api/panel/weapon/${name}`),
  })

  return { data, status, error }
}
