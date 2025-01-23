import { ArtifactSetItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-list/artifact-set-list.type'
import { ArtifactSetItem } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-item'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export function ArtifactSetList(props: ArtifactSetItemProps) {
  const { artifact_set } = props
  const IS_DOUBLE_SET = artifact_set.length > 1

  const MAPPED_SETS = artifact_set.map((artifact) => (
    <li key={artifact.id}>
      <ArtifactSetItem {...artifact} />
    </li>
  ))

  if (IS_DOUBLE_SET) {
    return (
      <Card className='p-5 flex items-center space-x-4'>
        <Badge>Elige 2</Badge>
        <ul
          className={cn(
            IS_DOUBLE_SET && 'w-[calc(100%_-_80px)] grid grid-cols-1 gap-4'
          )}
        >
          {MAPPED_SETS}
        </ul>
      </Card>
    )
  }

  return <ul>{MAPPED_SETS}</ul>
}
