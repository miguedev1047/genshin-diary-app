import {
  ConstellationsCharacter,
  PassivesCharacter,
  TalentsCharacter,
} from '@prisma/client'

export type SkillListProps = {
  data:
    | Array<TalentsCharacter>
    | Array<ConstellationsCharacter>
    | Array<PassivesCharacter>
}
