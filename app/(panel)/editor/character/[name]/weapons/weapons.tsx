'use client'

import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { WeaponForm } from '@/editor/character/[name]/weapons/_components/weapon-form'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { WeaponItem } from '@/editor/character/[name]/weapons/_components/weapon-item'
import { updateWeapons } from '@/editor/character/[name]/weapons/_services/update'
import { SortableList } from '@/shared/components/sortable-list'
import { useDrag } from '@/features/hooks/use-drag'

export function Weapons() {
  const { data: CHARACTER } = useGetCharacter()
  const WEAPONS = CHARACTER?.weapons ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: WEAPONS,
    updateFn: updateWeapons,
  })

  return (
    <EditorCard
      title='Mejores armas '
      renderForm={<WeaponForm />}
    >
      <SortableList
        items={orderedItems}
        onDragEnd={handleDragEnd}
        renderItem={(item) => (
          <SortableList.Item id={item.id}>
            <WeaponItem {...item} />
          </SortableList.Item>
        )}
      />
    </EditorCard>
  )
}
