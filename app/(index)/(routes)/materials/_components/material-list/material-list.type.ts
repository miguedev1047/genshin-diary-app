import { Materials } from '@prisma/client'

export type MaterialListProps = {
  data:
    | {
        category: string
        materials: Array<Materials>
      }[]
    | null
}
