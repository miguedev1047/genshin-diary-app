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
import { Suspense, useState, useTransition } from 'react'
import { TeamsCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { CharacterSelector } from '@/app/(panel)/editor/character/[id]/teams/_components/character-selector'
import { createTeams } from '@/app/(panel)/editor/character/[id]/teams/_services/create'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SpinLoaderInput } from '@/components/spin-loaders'

const MAX_TEAMS = 4
const MAX_CHARACTERS = 4

export function TeamForm() {
  const { data: CHARACTER } = useGetCharacter()

  const { refresh } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const TEAMS = CHARACTER?.teams ?? []

  const form = useForm<z.infer<typeof TeamsCharacterSchema>>({
    resolver: zodResolver(TeamsCharacterSchema),
    defaultValues: {
      name: '',
      characters: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_CHARACTER_ITEMS = values.characters.length > MAX_CHARACTERS

    if (MAX_CHARACTER_ITEMS) {
      return toast.error(
        `No puedes añadir más de ${MAX_CHARACTERS} personajes a un equipo.`
      )
    }

    const MAX_TEAM_ITEMS = TEAMS.length >= MAX_TEAMS

    if (MAX_TEAM_ITEMS) {
      return toast.error(`No puedes añadir más de ${MAX_TEAMS} equipos.`)
    }

    startTransition(async () => {
      const { message, status } = await createTeams(values, CHARACTER?.id)

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
      title='Equipo'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isLoading={isPending}
      formId='team-form'
    >
      <Form {...form}>
        <form
          id='team-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del equipo</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder='Baaltional Team'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='characters'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Personajes</FormLabel>
                <FormControl>
                  <Suspense fallback={<SpinLoaderInput />}>
                    <CharacterSelector
                      disabled={isPending}
                      {...field}
                    />
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
