'use client'

import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { useGetCharacter } from '@/features/providers/character-provider'
import { updateArtifactsOrder } from '@/app/(panel)/editor/character/[id]/artifacts/_services/update'
import { useDrag } from '@/features/hooks/use-drag'
import { ArtifactSetList } from '../artifact-set-list/artifact-set-list'

export function ArtifactList() {
  const { data: CHARACTER } = useGetCharacter()
  const ARTIFACTS = CHARACTER?.artifacts ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ARTIFACTS,
    updateFn: updateArtifactsOrder,
  })

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <ArtifactSetList {...item}/>
        </SortableList.Item>
      )}
    />
  )
}
