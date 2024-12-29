'use client'

import { PassivesCharacter } from '@prisma/client'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { useDrag } from '@/features/hooks/use-drag'
import { updateConstellationOrder } from '@/app/(panel)/editor/character/[id]/skills/constellations/_services/update'
import { ConstellationItem } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-item'
import { SortableList } from '@/app/(panel)/_components/sortable-list'

export function ConstellationList() {
  const { data: CHARACTER } = useGetCharacter()
  const CONSTELLATIONS = CHARACTER?.constellations as Array<PassivesCharacter>

  const { orderedItems, handleDragEnd } = useDrag({
    items: CONSTELLATIONS,
    updateFn: updateConstellationOrder,
  })

  return (
    <div>
      <SortableList
        items={orderedItems}
        onDragEnd={handleDragEnd}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <ConstellationItem {...item} />
          </SortableList.Item>
        )}
      />
    </div>
  )
}
