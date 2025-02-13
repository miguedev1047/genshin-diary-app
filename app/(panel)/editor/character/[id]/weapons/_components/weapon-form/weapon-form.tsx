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
import { WeaponSelector } from '@/app/(panel)/editor/character/[id]/weapons/_components/weapon-selector'
import { WeaponCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Suspense, useState, useTransition } from 'react'
import { createWeapons } from '@/app/(panel)/editor/character/[id]/weapons/_services/create'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { toast } from 'sonner'
import { SpinLoaderInput } from '@/components/spin-loaders'

const MAX_WEAPONS = 5

export function WeaponForm() {
  const [isPending, startTransition] = useTransition()
  
  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)
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
        setIsOpen(false)
        form.reset()

        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Armas'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
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
                  <Suspense fallback={<SpinLoaderInput />}>
                    <WeaponSelector {...field} />
                  </Suspense>
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
