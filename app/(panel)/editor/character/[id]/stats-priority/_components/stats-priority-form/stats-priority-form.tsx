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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { z } from 'zod'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { StatsPrioritySchema } from '@/schemas'
import { createStats } from '@/app/(panel)/editor/character/[id]/stats-priority/_services/create'
import { updateStats } from '@/app/(panel)/editor/character/[id]/stats-priority/_services/update'
import { Input } from '@/components/ui/input'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ARTIFACTS_STATS } from '@/consts/general'

export function StatsPriorityForm() {
  const [isPending, startTransition] = useTransition()

  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)
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
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createStats(values)

      if (status === 201) {
        toast.success(message)
        setIsOpen(false)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Estadistica'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Vida Porcentual' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ARTIFACTS_STATS.sands.map((stat) => (
                      <SelectItem
                        key={stat.value}
                        value={stat.value}
                      >
                        {stat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Bono de Daño Pyro' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ARTIFACTS_STATS.globet.map((stat) => (
                      <SelectItem
                        key={stat.value}
                        value={stat.value}
                      >
                        {stat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Daño Crit.' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ARTIFACTS_STATS.circlet.map((stat) => (
                      <SelectItem
                        key={stat.value}
                        value={stat.value}
                      >
                        {stat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
