'use client'

import { GRID_LIST } from '@/consts/classes'
import { useFetchCharacters } from '@/app/(index)/_sections/characters/_services/use-fetch-characters'
import { CharacterItem } from '@/app/(index)/_sections/characters/_components/character-item'
import { SkeletonCard } from '@/shared/ui/skeletons/skeleton-card'
import { ErrorCard } from '@/shared/ui/errors/error-card'

export function CharacterRoutes() {
  const { data, status } = useFetchCharacters()

  if (status === 'pending') return <SkeletonCard />
  if (status === 'error') return <ErrorCard />

  const ITEMS = data?.map(item => <CharacterItem key={item.id} {...item}/>)

  return (
    <ul className={GRID_LIST}>
      {ITEMS}
    </ul>
  )
}
