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
import { ArtifactCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArtifactSelector } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-selector'
import { createArtifacts } from '@/app/(panel)/editor/character/[id]/artifacts/_services/create'
import { useGetCharacter } from '@/features/providers/character-provider'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { toast } from 'sonner'
import { ArtifactFormProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-form/artifact-form.type'
import { updateArtifacts } from '@/app/(panel)/editor/character/[id]/artifacts/_services/update'
import { useRouter } from 'next/navigation'

const MAX_ARTIFACTS_SET = 5
const MAX_ARTIFACTS_SET_ITEM = 5

const ERR_ARTIFACT_LIST = `No puedes añadir más de ${MAX_ARTIFACTS_SET} artefactos.`
const ERR_ARTIFACT_SET_ITEM = `No puedes añadir más de ${MAX_ARTIFACTS_SET_ITEM} artfecatos x set.`

export function ArtifactForm(props: ArtifactFormProps) {
  const { id: ARTIFACT_SET_ID } = props
  const { data: CHARACTER } = useGetCharacter()

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const ARTIFACTS = useMemo(() => CHARACTER?.artifacts ?? [], [CHARACTER])
  const IS_EDITING = !!ARTIFACT_SET_ID

  const form = useForm<z.infer<typeof ArtifactCharacterSchema>>({
    resolver: zodResolver(ArtifactCharacterSchema),
    defaultValues: {
      artifacts: [],
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const ARTIFACT = ARTIFACTS.find((i) => i.id === ARTIFACT_SET_ID)
      const ARTIFACT_SET = ARTIFACT?.artifact_set.map((i) => i.artifact_id)

      if (!ARTIFACT_SET) return

      form.setValue('artifacts', ARTIFACT_SET as never)
      return
    }
  }, [form, ARTIFACTS, IS_EDITING, ARTIFACT_SET_ID, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    const CHARACTER_ID = CHARACTER?.id

    const MAX_ITEMS = ARTIFACTS.length > MAX_ARTIFACTS_SET
    const MAX_SETS = values.artifacts.length > MAX_ARTIFACTS_SET_ITEM

    if (MAX_ITEMS) return toast.error(ERR_ARTIFACT_LIST)
    if (MAX_SETS) return toast.error(ERR_ARTIFACT_SET_ITEM)

    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateArtifacts(
          values,
          CHARACTER_ID,
          ARTIFACT_SET_ID
        )

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.success(message)
        return
      }

      const { status, message } = await createArtifacts(values, CHARACTER_ID)

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
      title='Artefactos'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isLoading={isPending}
      isEditing={IS_EDITING}
      formId='artifact-form'
    >
      <Form {...form}>
        <form
          id='artifact-form'
          onSubmit={handleSubmit}
        >
          <FormField
            name='artifacts'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Artefactos</FormLabel>
                <FormControl>
                  <ArtifactSelector {...field} />
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
