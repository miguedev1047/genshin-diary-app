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
import { WeaponBestCharactersSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CharacterSelector } from '@/editor/weapon/[name]/best-characters/_components/character-selector'
import { useGetWeapon } from '@/editor/weapon/[name]/provider'
import { createBestCharacters } from '@/editor/weapon/[name]/best-characters/_services/create'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/shared/layouts/panel/form-sheet'

const MAX_CHARACTERS = 6

export function BestCharactersForm() {
  const { data: WEAPON } = useGetWeapon()

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const BEST_CHARACTERS =
    WEAPON?.bests_characters.map((character) => character.id) ?? []

  const form = useForm<z.infer<typeof WeaponBestCharactersSchema>>({
    resolver: zodResolver(WeaponBestCharactersSchema),
    defaultValues: {
      characters: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_ITEMS =
      [...values.characters, ...BEST_CHARACTERS].length > MAX_CHARACTERS

    if (MAX_ITEMS)
      return toast.error(`No puedes añadir más de ${MAX_CHARACTERS} personajes`)

    startTransition(async () => {
      const { status, message } = await createBestCharacters(values, WEAPON?.id)

      if (status === 201) {
        toast.success(message)
        form.reset()
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Personajes'
      isLoading={isPending}
      formId='best-characters-form'
    >
      <Form {...form}>
        <form
          id='best-characters-form'
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
                  <CharacterSelector {...field} />
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
