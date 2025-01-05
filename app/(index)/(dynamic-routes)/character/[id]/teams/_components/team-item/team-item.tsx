import { TeamItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/team-item/team-item.type'
import { CharacterItem } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/character-item'

export function TeamItem(props: TeamItemProps) {
  const { characters } = props

  const MAPPED_CHARACTERS = characters.map((character) => (
    <li key={character.id}>
      <CharacterItem {...character} />
    </li>
  ))

  return (
    <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
      {MAPPED_CHARACTERS}
    </ul>
  )
}
