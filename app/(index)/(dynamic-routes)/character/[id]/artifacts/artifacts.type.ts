import { Prisma } from '@prisma/client'

export type ArtifactsProps = {
  data: Prisma.CharactersGetPayload<{
    include: { artifacts: true }
  }>
}
