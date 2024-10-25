'use client'

import { PassivesCharacter } from '@prisma/client'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useDrag } from '@/features/hooks/use-drag'
import { updatePassiveOrder } from '@/editor/character/[name]/skills/passives/_services/update'
import { SortableList } from '@/shared/components/sortable-list'
import { PassiveItem } from '@/editor/character/[name]/skills/passives/_components/passive-item'

export function PassiveList() {
  const { data: CHARACTER } = useGetCharacter()
  const TALENTS = CHARACTER?.passives as Array<PassivesCharacter>

  const { orderedItems, handleDragEnd } = useDrag({
    items: TALENTS,
    updateFn: updatePassiveOrder,
  })

  return (
    <div>
      <SortableList
        items={orderedItems}
        onDragEnd={handleDragEnd}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <PassiveItem {...item} />
          </SortableList.Item>
        )}
      />
    </div>
  )
}
