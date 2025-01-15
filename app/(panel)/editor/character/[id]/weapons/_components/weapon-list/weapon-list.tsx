'use client'

import { useGetCharacter } from '@/features/providers/character-provider'
import { WeaponItem } from '@/app/(panel)/editor/character/[id]/weapons/_components/weapon-item'
import { updateWeapons } from '@/app/(panel)/editor/character/[id]/weapons/_services/update'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { useDrag } from '@/features/hooks/use-drag'

export function WeaponList() {
  const { data: CHARACTER } = useGetCharacter()
  const WEAPONS = CHARACTER?.weapons ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: WEAPONS,
    updateFn: updateWeapons,
  })

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <WeaponItem {...item} />
        </SortableList.Item>
      )}
    />
  )
}
