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
import { CharacterSelectorSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CharacterSelector } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-selector'
import { useGetWeapon } from '@/features/providers/weapon-provider'
import { createBestCharacters } from '@/app/(panel)/editor/weapon/[id]/best-characters/_services/create'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const MAX_CHARACTERS = 6

export function BestCharactersForm() {
  const [isPending, startTransition] = useTransition()

  const { data: WEAPON } = useGetWeapon()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const BEST_CHARACTERS =
    WEAPON?.bests_characters.map((character) => character.id) ?? []

  const form = useForm<z.infer<typeof CharacterSelectorSchema>>({
    resolver: zodResolver(CharacterSelectorSchema),
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
        setIsOpen(false)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Personajes'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
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
