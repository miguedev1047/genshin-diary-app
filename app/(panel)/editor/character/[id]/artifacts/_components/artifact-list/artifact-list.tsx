'use client'

import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { ArtifactItem } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-item'
import { useGetCharacter } from '@/features/providers/character-provider'
import { updateArtifacts } from '@/app/(panel)/editor/character/[id]/artifacts/_services/update'
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
