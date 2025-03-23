'use client'

import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { updateArtifactsOrder } from '@/app/(panel)/editor/character/[id]/artifacts/_services/update'
import { useDrag } from '@/features/hooks/use-drag'
import { ArtifactSetListProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-set-list/artifact-set-list.type'
import { ArtifactSetItem } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-set-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArtifactAction } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-action'

export function ArtifactSetList(props: ArtifactSetListProps) {
  const { artifact_set, id } = props
  const ARTIFACTS = artifact_set ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ARTIFACTS,
    updateFn: updateArtifactsOrder,
  })  

  const SETS_NUMBER = orderedItems.length

  return (
    <Card>
      <CardHeader className='pb-3 flex flex-row items-center justify-between'>
        <div className='flex items-center gap-1'>
          <SortableList.DragHandle />
          <CardTitle className='text-sm'>Sets: {SETS_NUMBER}</CardTitle>
        </div>
        <ArtifactAction id={id} />
      </CardHeader>
      <CardContent>
        <SortableList
          items={orderedItems}
          onDragEnd={handleDragEnd}
          className='flex items-center gap-3'
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              <ArtifactSetItem {...item} />
            </SortableList.Item>
          )}
        />
      </CardContent>
    </Card>
  )
}
