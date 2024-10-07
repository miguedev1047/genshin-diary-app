/* eslint-disable @typescript-eslint/no-explicit-any */

import { DragEndEvent } from '@dnd-kit/core'
import { arrayMove } from '@dnd-kit/sortable'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

interface UseDragProps {
  items: Array<any>
  updateFn: (items: Array<any>) => Promise<{ status: number; message: string }>
}

export function useDrag(props: UseDragProps) {
  const { items, updateFn } = props

  const [orderedItems, setOrderedItems] = useState(items)
  const { refresh } = useRouter()

  useEffect(() => setOrderedItems(items), [items])

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    const oldIndex = orderedItems.findIndex((i) => i.id === active.id)
    const newIndex = orderedItems.findIndex((i) => i.id === over?.id)

    if (oldIndex === newIndex) return

    const NEW_ORDER = arrayMove(orderedItems, oldIndex, newIndex)
    setOrderedItems(NEW_ORDER)

    const { status, message } = await updateFn(NEW_ORDER)

    if (status === 201) {
      toast.success(message)
      refresh()
      return
    }

    toast.error(message)
  }

  return { handleDragEnd, orderedItems }
}
