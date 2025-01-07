'use client'

import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { ArtifactItem } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-item'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { updateArtifacts } from '@/app/(panel)/editor/character/[id]/artifacts/_services/update'
import { useDrag } from '@/features/hooks/use-drag'
import { Suspense } from 'react'
import { SpinLoaderCard } from '@/components/spin-loaders'

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
          <Suspense fallback={<SpinLoaderCard />}>
            <ArtifactItem {...item} />
          </Suspense>
        </SortableList.Item>
      )}
    />
  )
}
