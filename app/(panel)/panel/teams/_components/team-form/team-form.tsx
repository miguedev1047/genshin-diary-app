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
import { TeamsCharacterSchema } from '@/schemas'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { Suspense, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { CharacterSelector } from '@/app/(panel)/panel/teams/_components/character-selector'
import { createTeam } from '@/app/(panel)/panel/teams/_services/create'
import { SpinLoaderInput } from '@/components/spin-loaders'
import { toast } from 'sonner'

export function TeamForm() {
  const [isPending, startTranstion] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof TeamsCharacterSchema>>({
    resolver: zodResolver(TeamsCharacterSchema),
    defaultValues: {
      name: '',
      characters: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await createTeam(values)

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
      formId='form-team'
      title='Crear equipo'
      isLoading={isPending}
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
                    disabled={isPending}
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
                    <CharacterSelector {...field} />
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
