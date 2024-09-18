import { fetcher } from '@/features/helpers/fetcher'
import { Prisma } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { useGetWeaponByName } from './use-weapon'

export function useGetCharacterByName() {
  const { name } = useParams()

  const { data, status, error } = useQuery<
    Prisma.CharactersGetPayload<{
      include: { images: true }
    }>
  >({
    queryKey: [`character-${name}`],
    queryFn: async () => await fetcher(`/api/panel/character/name/${name}`),
  })

  return { data, status, error }
}

export function useGetCharacterById(props: { id: string }) {
  const { id } = props

  const { data, status, error } = useQuery<
    Prisma.CharactersGetPayload<{
      include: { images: true }
    }>
  >({
    queryKey: [`character-${id}`],
    queryFn: async () => await fetcher(`/api/panel/character/id/${id}`),
  })

  return { data, status, error }
}

export function useGetCharacters() {
  const { data: WEAPON } = useGetWeaponByName()
  const WEAPON_TYPE = WEAPON?.type

  const { data, status, error, refetch } = useQuery<
    Array<
      Prisma.CharactersGetPayload<{
        include: { images: true }
      }>
    >
  >({
    queryKey: [`characters`],
    queryFn: async () => await fetcher(`/api/panel/character`),
  })

  const FILTERED_CHARACTER = data?.filter(
    (character) => character.weapon === WEAPON_TYPE
  )
  const OPTIONS = FILTERED_CHARACTER?.map((character) => ({
    label: character.name,
    value: character.id,
    image: character.images?.splash_art_url,
  }))

  return { data: OPTIONS, status, error, refetch }
}
