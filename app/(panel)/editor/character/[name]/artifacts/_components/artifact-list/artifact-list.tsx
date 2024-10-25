'use client'

import { SortableList } from '@/shared/components/sortable-list'
import { ArtifactItem } from '@/editor/character/[name]/artifacts/_components/artifact-item'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { updateArtifacts } from '@/editor/character/[name]/artifacts/_services/update'
import { useDrag } from '@/features/hooks/use-drag'

export function ArtifactList() {
  const { data: CHARACTER } = useGetCharacter()
  const ARTIFACTS = CHARACTER?.artifacts ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ARTIFACTS,
    updateFn: updateArtifacts,
  })

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <ArtifactItem {...item} />
        </SortableList.Item>
      )}
    />
  )
}
