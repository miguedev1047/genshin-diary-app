'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatsPrioritySchema } from '@/schemas'
import { createStats } from '@/editor/character/[name]/stats-priority/_services/create'
import { updateStats } from '@/editor/character/[name]/stats-priority/_services/update'
import { Input } from '@/components/ui/input'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function StatsPriorityForm() {
  const [isPending, startTransition] = useTransition()
  const { data: CHARACTER } = useGetCharacter()
  const { refresh } = useRouter()

  const STATS = CHARACTER?.stats_priority
  const IS_EDITING = !!STATS?.id

  const form = useForm<z.infer<typeof StatsPrioritySchema>>({
    resolver: zodResolver(StatsPrioritySchema),
    defaultValues: {
      circlet_stat: STATS?.circlet_stat ?? '',
      globet_stat: STATS?.globet_stat ?? '',
      order_priority: STATS?.order_priority ?? '',
      sand_stat: STATS?.sand_stat ?? '',
      character_id: CHARACTER?.id ?? '',
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
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

  return (
    <FormSheet
      title='Estadistica'
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='stats-priority-form'
    >
      <Form {...form}>
        <form
          id='stats-priority-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
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
        </form>
      </Form>
    </FormSheet>
  )
}
