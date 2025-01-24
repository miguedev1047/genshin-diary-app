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
import { useEffect, useMemo, useState, useTransition } from 'react'
import { TeamsCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { createTeams } from '@/app/(panel)/editor/character/[id]/teams/_services/create'
import { useGetCharacter } from '@/features/providers/character-provider'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { updateTeamsCharacters } from '@/app/(panel)/editor/character/[id]/teams/_services/update'
import { TeamFormProps } from '@/app/(panel)/editor/character/[id]/teams/_components/team-form/team-form.type'
import { CharacterSelector } from '@/app/(panel)/_components/dialog-selectors/character-selector'
import { toast } from 'sonner'
import { NONE } from '@/consts/misc'

const MAX_TEAMS = 4
const MAX_CHARACTERS = 4

const ERR_TEAM_LIST = `No puedes añadir más de ${MAX_TEAMS} equipos.`
const ERR_CHARACTER_LIST = `No puedes añadir más de ${MAX_CHARACTERS} personajes a un equipo.`

export function TeamForm(props: TeamFormProps) {
  const { id: TEAM_ID } = props
  const { data: CHARACTER } = useGetCharacter()

  const { refresh } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const TEAMS = useMemo(() => CHARACTER?.teams ?? [], [CHARACTER])
  const IS_EDITING = !!TEAM_ID
  const TEAM_NAME = `Equipo de ${CHARACTER?.name}`

  const form = useForm<z.infer<typeof TeamsCharacterSchema>>({
    resolver: zodResolver(TeamsCharacterSchema),
    defaultValues: {
      name: TEAM_NAME,
      characters: [],
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const TEAM = TEAMS.find((i) => i.id === TEAM_ID)
      const CHARACTERS = TEAM?.characters.map((i) => i.character_id)

      if (!TEAM && !CHARACTERS) return

      form.setValue('name', TEAM?.name ?? NONE)
      form.setValue('characters', CHARACTERS as never)
      return
    }
  }, [form, IS_EDITING, TEAM_ID, TEAMS, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    const CHARACTER_ID = CHARACTER?.id

    const CHARACTER_ITEMS = values.characters.length > MAX_CHARACTERS
    if (CHARACTER_ITEMS) return toast.error(ERR_CHARACTER_LIST)

    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateTeamsCharacters(values, TEAM_ID)

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const TEAM_ITEMS = TEAMS.length > MAX_TEAMS
      if (TEAM_ITEMS) {
        toast.error(ERR_TEAM_LIST)
        return
      }

      const { message, status } = await createTeams(values, CHARACTER_ID)

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
      isEditing={IS_EDITING}
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
