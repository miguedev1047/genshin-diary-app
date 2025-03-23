'use client'

import { UseDeleteProps } from '@/app/(panel)/_components/delete-button/delete-button.type'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function useDelete(props: UseDeleteProps) {
  const { itemId, onDelete } = props

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  function onDeleteItem() {
    startTransition(async () => {
      const { message, status } = await onDelete(itemId)

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return { onDeleteItem, isPending }
}
