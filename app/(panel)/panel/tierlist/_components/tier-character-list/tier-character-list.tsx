import { TierCharacterListProps } from '@/app/(panel)/panel/tierlist/_components/tier-character-list/tier-character-list.type'
import { TierCharacterItem } from '@/app/(panel)/panel/tierlist/_components/tier-character-item'

export function TierCharacterList(props: TierCharacterListProps) {
  const { characters } = props

  const MAPPED_CHARACTERS = characters.map((character) => (
    <li
      key={character.id}
      className='relative'
    >
       <TierCharacterItem {...character} />
    </li>
  ))

  return MAPPED_CHARACTERS
}
