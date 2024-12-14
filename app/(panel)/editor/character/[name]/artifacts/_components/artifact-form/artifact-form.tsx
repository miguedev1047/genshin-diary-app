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
import { Suspense, useTransition } from 'react'
import { ArtifactCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArtifactSelector } from '@/editor/character/[name]/artifacts/_components/artifact-selector'
import { createArtifacts } from '@/editor/character/[name]/artifacts/_services/create'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { toast } from 'sonner'
import { SpinLoaderInput } from '@/components/spin-loaders'

const MAX_ARTIFACTS = 5

export function ArtifactForm() {
  const { data: CHARACTER } = useGetCharacter()

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const ARTIFACTS = CHARACTER?.artifacts ?? []

  const form = useForm<z.infer<typeof ArtifactCharacterSchema>>({
    resolver: zodResolver(ArtifactCharacterSchema),
    defaultValues: {
      artifacts: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_ITEMS = [...ARTIFACTS, ...values.artifacts].length > MAX_ARTIFACTS

    if (MAX_ITEMS) {
      return toast.error(`No puedes añadir más de ${MAX_ARTIFACTS} artefactos`)
    }

    startTransition(async () => {
      const { status, message } = await createArtifacts(values, CHARACTER?.id)

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
      title='Artefactos'
      isLoading={isPending}
      formId='artifact-form'
    >
      <Form {...form}>
        <form
          id='artifact-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            name='artifacts'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artefactos</FormLabel>
                <FormControl>
                  <Suspense fallback={<SpinLoaderInput />}>
                    <ArtifactSelector {...field} />
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
