'use client'

import { PassivesCharacter } from '@prisma/client'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useDrag } from '@/features/hooks/use-drag'
import { updatePassiveOrder } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/update'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { PassiveItem } from '@/app/(panel)/editor/character/[id]/skills/passives/_components/passive-item'

export function PassiveList() {
  const { data: CHARACTER } = useGetCharacter()
  const PASSIVES = CHARACTER?.passives as Array<PassivesCharacter>

  const { orderedItems, handleDragEnd } = useDrag({
    items: PASSIVES,
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
