'use client'

import { PassivesCharacter } from '@prisma/client'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useDrag } from '@/features/hooks/use-drag'
import { updateConstellationOrder } from '@/editor/character/[name]/skills/constellations/_services/update'
import { ConstellationItem } from '@/editor/character/[name]/skills/constellations/_components/constellation-item'
import { SortableList } from '@/shared/components/sortable-list'

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
