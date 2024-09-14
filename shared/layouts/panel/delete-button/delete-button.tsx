'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { DeleteButtonProps, UseDeleteProps } from '@/shared/layouts/panel/delete-button/delete-button.type'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function useDelete(props: UseDeleteProps) {
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
    })
  }

  return { onDeleteItem, isPending }
}

export function DeleteButton(props: DeleteButtonProps) {
  const { children, className, itemId, disabled, onDelete } = props

  const { isPending, onDeleteItem } = useDelete({
    itemId,
    onDelete,
  })

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            disabled={isPending || disabled}
            variant='destructive'
            size='icon'
            className={cn(className, 'p-1 z-50')}
            onClick={onDeleteItem}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>Eliminar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
