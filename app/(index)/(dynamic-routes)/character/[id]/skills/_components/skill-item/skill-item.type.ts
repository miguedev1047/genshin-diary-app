import {
  ConstellationsCharacter,
  PassivesCharacter,
  TalentsCharacter,
} from '@prisma/client'

export type SkillItemProps =
  | TalentsCharacter
  | ConstellationsCharacter
  | PassivesCharacter
