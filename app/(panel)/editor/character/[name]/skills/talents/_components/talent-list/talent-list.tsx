'use client'    
import { SortableList } from '@/shared/components/sortable-list'
import { useDrag } from '@/features/hooks/use-drag'
import { TalentItem } from '@/editor/character/[name]/skills/talents/_components/talent-item'
import { updateTalentOrder } from '@/editor/character/[name]/skills/talents/_services/update'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { TalentsCharacter } from '@prisma/client'

export function TalentList() {
  const { data: CHARACTER } = useGetCharacter()
  const TALENTS = CHARACTER?.talents as Array<TalentsCharacter>

  const { orderedItems, handleDragEnd } = useDrag({
    items: TALENTS,
    updateFn: updateTalentOrder,
  })

  return (
    <div>
      <SortableList
        items={orderedItems}
        onDragEnd={handleDragEnd}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <TalentItem {...item} />
          </SortableList.Item>
        )}
      />
    </div>
  )
}
