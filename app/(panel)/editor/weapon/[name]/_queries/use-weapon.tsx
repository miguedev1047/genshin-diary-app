import { fetcher } from '@/features/helpers/fetcher'
import { Prisma } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'

export function useGetWeaponByName() {
  const { name } = useParams()

  const { data, status, error, refetch } = useQuery<
    Prisma.WeaponsGetPayload<{
      include: { ascensions: true; bests_characters: true }
    }>
  >({
    queryKey: [`weapon-${name}`],
    queryFn: async () => await fetcher(`/api/panel/weapon/name/${name}`),
  })

  return { data, status, error, refetch }
}

export function useGetWeapons() {
  const { data: WEAPON } = useGetWeaponByName()
  const WEAPON_TYPE = WEAPON?.type

  const { data, status, error } = useQuery<
    Array<
      Prisma.WeaponsGetPayload<{
        include: { ascensions: true; bests_characters: true }
      }>
    >
  >({
    queryKey: [`weapons`],
    queryFn: async () => await fetcher(`/api/panel/weapon`),
  })

  const FILTERED_WEAPON = data?.filter((weapon) => weapon.type === WEAPON_TYPE)
  const OPTIONS = FILTERED_WEAPON?.map((weapon) => ({
    label: weapon.name,
    value: weapon.id,
    image: weapon.image_url,
  }))

  return { data: OPTIONS, status, error }
}
