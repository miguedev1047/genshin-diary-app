import { Prisma } from '@prisma/client'

export type ArtifactSetItemProps = Prisma.ArtifactCharacterGetPayload<{
  include: { artifact_set: true }
}>
