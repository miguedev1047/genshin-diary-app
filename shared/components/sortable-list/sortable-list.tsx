import React, { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import type { Active, DragEndEvent, UniqueIdentifier } from '@dnd-kit/core'
import { SortableContext, sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { SortableOverlay } from '@/shared/components/sortable-list/components/sortable-overlay'
import { SortableItem } from '@/shared/components/sortable-list/components/sortable-item'
import { DragHandle } from '@/shared/components/sortable-list/components/sortable-item/sortable-item'

interface BaseItem {
  id: UniqueIdentifier
}

interface Props<T extends BaseItem> {
  items: T[]
  onDragEnd(event: DragEndEvent): Promise<void>
  renderItem(item: T): ReactNode
}

const NO_ITEMS = 0

export function SortableList<T extends BaseItem>(props: Props<T>) {
  const { items, onDragEnd, renderItem } = props

  const [active, setActive] = useState<Active | null>(null)
  const activeItem = useMemo(
    () => items.find((item) => item.id === active?.id),
    [active, items]
  )
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={({ active }) => {
        setActive(active)
      }}
      onDragEnd={onDragEnd}
      onDragCancel={() => {
        setActive(null)
      }}
    >
      <SortableContext items={items}>
        <ul
          className='flex flex-col gap-5'
          role='application'
        >
          {items.map((item) => (
            <React.Fragment key={item.id}>{renderItem(item)}</React.Fragment>
          ))}

          {items.length === NO_ITEMS && (
            <h2 className='text-center font-bold uppercase opacity-70'>
              No hay elementos para mostrar
            </h2>
          )}
        </ul>
      </SortableContext>
      <SortableOverlay>
        {activeItem ? renderItem(activeItem) : null}
      </SortableOverlay>
    </DndContext>
  )
}

SortableList.Item = SortableItem
SortableList.DragHandle = DragHandle
