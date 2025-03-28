/* eslint-disable @typescript-eslint/no-explicit-any */

import React, { createContext, useContext, useMemo } from 'react'
import type { CSSProperties, PropsWithChildren } from 'react'
import type {
  DraggableSyntheticListeners,
  UniqueIdentifier,
} from '@dnd-kit/core'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { GripVertical } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  id: UniqueIdentifier
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

interface DrageHandlerProps {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'transparent'
    | 'link'
    | 'expandIcon'
    | 'ringHover'
    | 'shine'
    | 'gooeyRight'
    | 'gooeyLeft'
    | 'linkHover1'
    | 'linkHover2'
    | null
    | undefined
}

const SortableItemContext = createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({ children, id }: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({ id })
  const context = useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef]
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li
        ref={setNodeRef}
        style={style}
        className='list-none'
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle(props: DrageHandlerProps) {
  const { variant = 'ghost' } = props
  const { attributes, listeners, ref } = useContext(SortableItemContext)

  return (
    <Button
      size='icon'
      variant={variant}
      {...attributes}
      {...listeners}
      ref={ref}
    >
      <GripVertical />
    </Button>
  )
}
