import { Prisma } from '@prisma/client'

export type ArtifactSetListProps = Prisma.ArtifactCharacterGetPayload<{
  include: { artifact_set: true }
}>
