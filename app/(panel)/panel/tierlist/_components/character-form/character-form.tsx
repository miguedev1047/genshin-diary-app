'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { Suspense, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CharacterSelectorSchema } from '@/schemas'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { CharacterSelector } from '@/app/(panel)/panel/tierlist/_components/character-selector'
import { CharacterFormProps } from '@/app/(panel)/panel/tierlist/_components/character-form/character-form.type'
import { createTierCharacter } from '@/app/(panel)/panel/tierlist/_services/create'
import { toast } from 'sonner'

export function CharacterForm(props: CharacterFormProps) {
  const { data: CHARACTERS, tierId } = props

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof CharacterSelectorSchema>>({
    resolver: zodResolver(CharacterSelectorSchema),
    defaultValues: {
      characters: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await createTierCharacter(values, tierId)

      if (status === 201) {
        toast.success(message)
        form.reset()
        setIsOpen(false)
        refresh()

        return
      }
      toast.success(message)
    })
  })

  return (
    <Sheet
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='!size-full border-4 border-dashed col-span-1 aspect-[2/3] grid place-content-center'
        >
          <Plus className='size-8' />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Agregar personajes</SheetTitle>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <div className='px-1 space-y-4'>
            <Form {...form}>
              <form
                id='characters-selector-form'
                onSubmit={handleSubmit}
                className='grid gap-4'
              >
                <FormField
                  name='characters'
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Seleccionar personajes</FormLabel>
                      <FormControl>
                        <Suspense fallback={<SpinLoaderInput />}>
                          <CharacterSelector
                            value={field.value}
                            onChange={field.onChange}
                            data={CHARACTERS}
                          />
                        </Suspense>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </form>
            </Form>

            <SheetFooter>
              <SheetClose asChild>
                <Button
                  disabled={isPending}
                  variant='secondary'
                  type='reset'
                >
                  Cancelar
                </Button>
              </SheetClose>

              <Button
                disabled={isPending}
                type='submit'
                form='characters-selector-form'
              >
                Agregar
              </Button>
            </SheetFooter>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
