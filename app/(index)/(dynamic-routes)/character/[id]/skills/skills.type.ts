import { Prisma } from '@prisma/client'

export type SkillsProps = {
  data: Prisma.CharactersGetPayload<{
    include: {
      talents: true
      passives: true
      constellations: true
    }
  }>
}
