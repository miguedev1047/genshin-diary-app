'use client'

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { NONE } from '@/consts/general'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Pencil, Plus } from 'lucide-react'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatsPrioritySchema } from '@/schemas'
import { createStats } from '@/editor/character/[name]/stats-priority/_services/create'
import { updateStats } from '@/editor/character/[name]/stats-priority/_services/update'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function StatsPriorityForm() {
  const [isPending, startTransition] = useTransition()
  const { data: CHARACTER } = useGetCharacter()
  const { refresh } = useRouter()

  const STATS = CHARACTER?.stats_priority
  const STATS_EXISTS = STATS?.id !== undefined

  const form = useForm<z.infer<typeof StatsPrioritySchema>>({
    resolver: zodResolver(StatsPrioritySchema),
    defaultValues: {
      circlet_stat: CHARACTER?.stats_priority?.circlet_stat ?? NONE,
      globet_stat: CHARACTER?.stats_priority?.globet_stat ?? NONE,
      order_priority: CHARACTER?.stats_priority?.order_priority ?? NONE,
      sand_stat: CHARACTER?.stats_priority?.sand_stat ?? NONE,
      character_id: CHARACTER?.id ?? NONE,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (STATS_EXISTS) {
        const { status, message } = await updateStats(values, STATS.id)

        if (status === 201) {
          toast.success(message)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createStats(values)

      if (status === 201) {
        toast.success(message)
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
        <Button size='icon'>{STATS_EXISTS ? <Pencil /> : <Plus />}</Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>
            {STATS_EXISTS ? 'Editar' : 'Nueva'} estadistica
          </SheetTitle>
          <SheetDescription>
            {STATS_EXISTS
              ? 'Edita la estadistica seleccionada.'
              : 'Añade una nueva estadistica para el personaje.'}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                control={form.control}
                name='sand_stat'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Reloj</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Vida Porcentual'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='globet_stat'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Caliz</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Bono de daño Pyro'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='circlet_stat'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tiara</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Daño de Critico'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='order_priority'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Prioridad</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Prob. Crít. / Daño Crít. > Vida Porcentual > Maestria > Recarga de Energía'
                        {...field}
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    variant='secondary'
                    type='button'
                    onClick={handleReset}
                  >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  disabled={isPending}
                  type='submit'
                >
                  {STATS_EXISTS ? 'Guardar' : 'Agregar'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
