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
import { useForm } from 'react-hook-form'
import { WeaponSelector } from '@/editor/character/[name]/weapons/_components/weapon-selector'
import { WeaponCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { createWeapons } from '@/editor/character/[name]/weapons/_services/create'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/shared/layouts/panel/form-sheet'
import { toast } from 'sonner'

const MAX_WEAPONS = 5

export function WeaponForm() {
  const { data: CHARACTER } = useGetCharacter()

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const WEAPONS = CHARACTER?.weapons ?? []
  const form = useForm<z.infer<typeof WeaponCharacterSchema>>({
    resolver: zodResolver(WeaponCharacterSchema),
    defaultValues: {
      weapons: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_ITEMS = [...WEAPONS, ...values.weapons].length > MAX_WEAPONS

    if (MAX_ITEMS) {
      return toast.error(`No puedes añadir más de ${MAX_WEAPONS} armas`)
    }

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
    <FormSheet
      title='Armas'
      isLoading={isPending}
      formId='weapon-form'
    >
      <Form {...form}>
        <form
          id='weapon-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
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
        </form>
      </Form>
    </FormSheet>
  )
}
