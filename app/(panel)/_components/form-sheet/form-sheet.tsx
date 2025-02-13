import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { FormSheetProps } from '@/app/(panel)/_components/form-sheet/form-sheet.type'
import { Button } from '@/components/ui/button'
import { Pencil, Plus } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'

export function FormSheet(props: FormSheetProps) {
  const {
    title,
    formId,
    isEditing,
    disabled,
    isLoading,
    children,
    isOpen,
    onOpenChange,
  } = props

  return (
    <Sheet
      open={isOpen}
      onOpenChange={onOpenChange}
    >
      <SheetTrigger asChild>
        <Button size='icon'>{isEditing ? <Pencil /> : <Plus />}</Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>
            {isEditing ? 'Editar' : 'Agregar'} {title}
          </SheetTitle>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <div className='px-1 space-y-4'>
            {children}

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  disabled={disabled || isLoading}
                  variant='secondary'
                  type='reset'
                >
                  Cancelar
                </Button>
              </SheetClose>

              <Button
                disabled={disabled || isLoading}
                type='submit'
                form={formId}
              >
                {isEditing ? 'Guardar' : 'Agregar'}
              </Button>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
