import { Prisma } from '@prisma/client'

export type VideoGuideProps = {
  data: Prisma.CharactersGetPayload<{
    include: { video_guide: true }
  }>
}
