'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  DeleteButtonProps,
  UseDeleteProps,
} from '@/app/(panel)/_components/delete-button/delete-button.type'
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

      toast.error(message)
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
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <TooltipTrigger asChild>
              <Button
                disabled={isPending || disabled}
                variant='destructive'
                size='icon'
                className={cn(className, 'p-1 z-40')}
              >
                {children}
              </Button>
            </TooltipTrigger>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
              <AlertDialogDescription>
                Esta acción no se puede deshacer. Si estas seguro, presiona el
                botón de eliminar.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel disabled={isPending || disabled}>
                Cancelar
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={onDeleteItem}
                disabled={isPending || disabled}
              >
                Eliminar
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <TooltipContent side='bottom'>
          <p>Eliminar</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
