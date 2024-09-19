import { GRID_LIST } from '@/consts/classes'
import { getCharacters } from '@/app/(panel)/panel/characters/_services/fetch'
import { CharacterItem } from '@/app/(panel)/panel/characters/_components/character-item'
import { CharacterRoutesProps } from '@/app/(panel)/panel/characters/_components/character-routes/character-routes.type'

export async function CharacterRoutes(props: CharacterRoutesProps) {
  const { params: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS)
  
  const MAPPED_CHARACTERS = CHARACTERS?.map((item) => (
    <li key={item.id}>
      <CharacterItem {...item} />
    </li>
  ))

  return <ul className={GRID_LIST}>{MAPPED_CHARACTERS}</ul>
}
