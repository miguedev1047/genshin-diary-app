import { TierCharacterItem } from '@/app/(index)/(routes)/tierlist/_components/tier-character-item'
import { TierCharacterListProps } from '@/app/(index)/(routes)/tierlist/_components/tier-character-list/tier-character-list.type'

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
