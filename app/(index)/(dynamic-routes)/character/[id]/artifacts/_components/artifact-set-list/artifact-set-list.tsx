import { ArtifactSetItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-list/artifact-set-list.type'
import { ArtifactSetItem } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-item'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function ArtifactSetList(props: ArtifactSetItemProps) {
  const { artifact_set } = props

  const HAS_MULTIPLE_SETS = artifact_set.length > 1
  const HAS_MORE_THAN_TWO_SETS = artifact_set.length > 2
  const REQUIRED_PIECES = artifact_set.length === 1 ? '4' : '2'

  const MAPPED_SETS = artifact_set.map((artifact) => (
    <li key={artifact.id}>
      <ArtifactSetItem
        data={artifact}
        requiredPieces={REQUIRED_PIECES}
      />
    </li>
  ))

  if (HAS_MULTIPLE_SETS) {
    return (
      <Card className='p-3 md:p-5 flex flex-col space-y-2 md:space-y-4'>
        {HAS_MORE_THAN_TWO_SETS && <Badge>Elige 2</Badge>}
        <ul
          className={cn(
            'w-full grid gap-4',
            HAS_MULTIPLE_SETS && 'md:grid-cols-2',
            HAS_MORE_THAN_TWO_SETS && 'w-full grid-cols-1'
          )}
        >
          {MAPPED_SETS}
        </ul>
      </Card>
    )
  }

  return <ul>{MAPPED_SETS}</ul>
}
