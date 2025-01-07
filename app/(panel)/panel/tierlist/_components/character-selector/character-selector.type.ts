import { TierCharacter } from '@prisma/client'

export type CharacterSelectorProps = {
  value: string[]
  onChange: () => void
  data: Array<TierCharacter>
}
