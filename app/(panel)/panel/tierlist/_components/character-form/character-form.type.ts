import { TierCharacter } from '@prisma/client'

export type CharacterFormProps = {
  data: Array<TierCharacter>
  tierId: string
}
