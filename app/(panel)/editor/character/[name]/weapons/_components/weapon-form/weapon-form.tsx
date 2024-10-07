'use client'

import { Button } from '@/components/ui/button'
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { Plus } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'
import { useForm } from 'react-hook-form'
import { WeaponSelector } from '@/editor/character/[name]/weapons/_components/weapon-selector'
import { WeaponCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { createWeapons } from '@/editor/character/[name]/weapons/_services/create'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function WeaponForm() {
  const { data: CHARACTER } = useGetCharacter()

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof WeaponCharacterSchema>>({
    resolver: zodResolver(WeaponCharacterSchema),
    defaultValues: {
      weapons: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await createWeapons(values, CHARACTER?.id)

      if (status === 201) {
        toast.success(message)
        form.reset()

        refresh()
        return
      }

      toast.error(message)
    })
  })

  const handleReset = () => form.reset()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon'>
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Nueva arma</SheetTitle>
          <SheetDescription>
            Añade una nueva arma para el personaje
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                name='weapons'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Armas</FormLabel>
                    <FormControl>
                      <WeaponSelector {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    variant='secondary'
                    onClick={handleReset}
                    type='button'
                  >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  disabled={isPending}
                  type='submit'
                >
                  Agregar
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
