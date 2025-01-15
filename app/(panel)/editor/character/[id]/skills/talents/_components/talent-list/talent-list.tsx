'use client'    
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { useDrag } from '@/features/hooks/use-drag'
import { TalentItem } from '@/app/(panel)/editor/character/[id]/skills/talents/_components/talent-item'
import { updateTalentOrder } from '@/app/(panel)/editor/character/[id]/skills/talents/_services/update'
import { useGetCharacter } from '@/features/providers/character-provider'
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
