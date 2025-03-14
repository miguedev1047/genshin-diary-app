import { GRID_LIST } from '@/consts/classes'
import { CharacterRoutesProps } from '@/app/(index)/(routes)/(home)/_components/character-routes/character-routes.type'
import { CharacterItem } from '@/app/(index)/(routes)/(home)/_components/character-item'
import { EMPTY_LIST } from '@/consts/misc'
import { EmptyList } from '@/components/empty-list'

export function CharacterRoutes(props: CharacterRoutesProps) {
  const { data: CHARACTERS } = props

  if (!CHARACTERS || CHARACTERS.length === EMPTY_LIST) {
    return <EmptyList text='No hay personajes para mostrar' />
  }

  const MAPPED_CHARACTERS = CHARACTERS?.map((item) => (
    <li key={item.id}>
      <CharacterItem {...item} />
    </li>
  ))

  return <ul className={GRID_LIST}>{MAPPED_CHARACTERS}</ul>
}
