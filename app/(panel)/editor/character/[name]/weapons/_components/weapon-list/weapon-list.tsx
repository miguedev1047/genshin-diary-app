'use client'

import { useGetCharacter } from '@/editor/character/[name]/provider'
import { WeaponItem } from '@/editor/character/[name]/weapons/_components/weapon-item'
import { updateWeapons } from '@/editor/character/[name]/weapons/_services/update'
import { SortableList } from '@/shared/components/sortable-list'
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
