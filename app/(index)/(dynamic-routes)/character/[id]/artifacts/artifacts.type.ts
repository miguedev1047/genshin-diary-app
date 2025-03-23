import { Prisma } from '@prisma/client'

export type ArtifactsProps = {
  data: Prisma.CharactersGetPayload<{
    include: { artifacts: { include: { artifact_set: true } } }
  }>
}
