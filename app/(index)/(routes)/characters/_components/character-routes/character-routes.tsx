import { EmptyList } from '@/components/empty-list'
import { CharacterRoutesProps } from '@/app/(index)/(routes)/characters/_components/character-routes/character-routes.type'
import { CharacterItem } from '@/app/(index)/(routes)/characters/_components/character-item'
import { CHARACTER_GRID_LIST } from '@/consts/classes'

export function CharacterRoutes(props: CharacterRoutesProps) {
  const { data: CHARACTERS } = props

  if (!CHARACTERS || !CHARACTERS.length) {
    return <EmptyList text='No hay personajes disponibles' />
  }

  const MAPPED_CHARACTERS = CHARACTERS.map((character) => (
    <li key={character.id}>
      <CharacterItem {...character} />
    </li>
  ))

  return <ul className={CHARACTER_GRID_LIST}>{MAPPED_CHARACTERS}</ul>
}
