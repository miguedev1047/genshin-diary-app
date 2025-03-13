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
import { SkillCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { PassiveFormProps } from '@/app/(panel)/editor/character/[id]/skills/passives/_components/passive-form/passive-form.type'
import { createPassive } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/create'
import { updatePassive } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/update'
import { toast } from 'sonner'
import { ViewImageInput } from '@/app/(panel)/_components/view-image-input'
import { PasteButtonInput } from '@/app/(panel)/_components/paste-button-input'
import { TiptapEditor } from '@/components/tiptap'

const MAX_PASSIVES = 4

const ERR_PASSIVE_LIST = `No puedes añadir más de ${MAX_PASSIVES} pasivas.`

export function PassiveForm(props: PassiveFormProps) {
  const { id: PASSIVE_ID } = props

  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const PASSIVES = useMemo(() => CHARACTER?.passives ?? [], [CHARACTER])
  const IS_EDITING = !!PASSIVE_ID

  const form = useForm<z.infer<typeof SkillCharacterSchema>>({
    resolver: zodResolver(SkillCharacterSchema),
    defaultValues: {
      character_id: CHARACTER?.id,
      title: '',
      description: '',
      image_url: '',
      type: 'PASSIVE',
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const PASSIVE = PASSIVES.find((i) => i.id === PASSIVE_ID)
      if (!PASSIVE) return

      form.setValue('title', PASSIVE.title)
      form.setValue('description', PASSIVE.description)
      form.setValue('image_url', PASSIVE.image_url ?? DEFAULT_IMAGE)
      form.setValue('type', PASSIVE.type)
    }
  }, [form, PASSIVES, PASSIVE_ID, IS_EDITING, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updatePassive(values, PASSIVE_ID)

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const MAX_ITEMS = PASSIVES.length >= MAX_PASSIVES
      if (MAX_ITEMS) {
        toast.error(ERR_PASSIVE_LIST)
        return
      }

      const { status, message } = await createPassive(values)

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
      title='Pasiva'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='passive-form'
    >
      <Form {...form}>
        <form
          id='passive-form'
          onSubmit={handleSubmit}
          className='grid gap-4 px-1 py-2'
        >
          <FormField
            control={form.control}
            name='title'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <PasteButtonInput
                    placeholder='Nombre de la pasiva'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='image_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>URL de la imagen</FormLabel>
                <FormControl>
                  <ViewImageInput
                    placeholder='URL de la imagen'
                    disabled={isPending}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    placeholder='Descripción de la pasiva'
                  />
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
