'use client'

import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { ArtifactForm } from '@/editor/character/[name]/artifacts/_components/artifact-form'
import { SortableList } from '@/shared/components/sortable-list'
import { ArtifactItem } from '@/editor/character/[name]/artifacts/_components/artifact-item'
import { updateArtifacts } from '@/editor/character/[name]/artifacts/_services/update'
import { useDrag } from '@/features/hooks/use-drag'

export function Artifacts() {
  const { data: CHARACTER } = useGetCharacter()
  const ARTIFACTS = CHARACTER?.artifacts ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ARTIFACTS,
    updateFn: updateArtifacts,
  })

  return (
    <EditorCard
      title='Mejores artefactos'
      renderForm={<ArtifactForm />}
    >
      <SortableList
        items={orderedItems}
        onDragEnd={handleDragEnd}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <ArtifactItem {...item} />
          </SortableList.Item>
        )}
      />
    </EditorCard>
  )
}
