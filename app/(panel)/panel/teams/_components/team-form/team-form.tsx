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
import { Input } from '@/components/ui/input'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { TeamsCharacterSchema } from '@/schemas'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { CharacterSelector } from '@/app/(panel)/panel/teams/_components/character-selector'
import { createTeam } from '@/app/(panel)/panel/teams/_services/create'
import { TeamFormProps } from '@/app/(panel)/panel/teams/_components/team-form/team-form.props'
import { toast } from 'sonner'
import { useGetData } from '@/features/providers/data-provider'
import { NONE } from '@/consts/misc'
import { updateTeam } from '../../_services/update'

const MAX_CHARACTERS = 5

export function TeamForm(props: TeamFormProps) {
  const { id: TEAM_ID } = props

  const [isPending, startTranstion] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const { data } = useGetData()
  const { teams } = data

  const TEAM = useMemo(
    () => teams?.find((i) => i.id === TEAM_ID),
    [TEAM_ID, teams]
  )
  const IS_EDITING = !!TEAM_ID

  const form = useForm<z.infer<typeof TeamsCharacterSchema>>({
    resolver: zodResolver(TeamsCharacterSchema),
    defaultValues: {
      name: '',
      characters: [],
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const CHARACTERS = TEAM?.characters.map((item) => item.character_id)
      if (!TEAM && !CHARACTERS) return

      form.setValue('name', TEAM?.name ?? NONE)
      form.setValue('characters', CHARACTERS as never)
    }
  }, [TEAM_ID, IS_EDITING, isOpen, form, TEAM])

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_ITEMS = values.characters.length >= MAX_CHARACTERS

    if (MAX_ITEMS) {
      return toast.error(
        `No puedes seleccionar mas de ${MAX_CHARACTERS} personajes!`
      )
    }

    startTranstion(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateTeam(values, TEAM_ID)
        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()
          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createTeam(values)

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
      formId='form-team'
      title='Crear equipo'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isLoading={isPending}
      isEditing={IS_EDITING}
    >
      <Form {...form}>
        <form
          id='form-team'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder='Nombre del equipo'
                    disabled={isPending || IS_EDITING}
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
