'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useRouter } from 'next/navigation'
import { SkillCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { createConstellation } from '@/app/(panel)/editor/character/[id]/skills/constellations/_services/create'
import { updateConstellation } from '@/app/(panel)/editor/character/[id]/skills/constellations/_services/update'
import { ConstellationFormProps } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-form/constellation-form.type'
import { SKILL_TYPE } from '@/consts/general'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ViewImageInput } from '@/app/(panel)/_components/view-image-input'

const MAX_CONSTELLATIONS = 6

const ERR_CONSTELLATION_LIST = `No puedes añadir más de ${MAX_CONSTELLATIONS} constelaciones.`

export function ConstellationForm(props: ConstellationFormProps) {
  const { id: CONSTELLATION_ID } = props

  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const CONSTELLATIONS = useMemo(
    () => CHARACTER?.constellations ?? [],
    [CHARACTER]
  )

  const IS_EDITING = !!CONSTELLATION_ID

  const form = useForm<z.infer<typeof SkillCharacterSchema>>({
    resolver: zodResolver(SkillCharacterSchema),
    defaultValues: {
      character_id: CHARACTER?.id,
      title: '',
      description: '',
      image_url: '',
      type: undefined,
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const CONSTELLATION = CONSTELLATIONS?.find(
        (i) => i.id === CONSTELLATION_ID
      )
      if (!CONSTELLATION) return

      form.setValue('title', CONSTELLATION.title)
      form.setValue('description', CONSTELLATION.description)
      form.setValue('image_url', CONSTELLATION.image_url ?? DEFAULT_IMAGE)
      form.setValue('type', CONSTELLATION.type)
    }
  }, [form, CONSTELLATION_ID, IS_EDITING, CONSTELLATIONS, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateConstellation(
          values,
          CONSTELLATION_ID
        )

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const MAX_ITEMS = CONSTELLATIONS.length >= MAX_CONSTELLATIONS
      if (MAX_ITEMS) {
        toast.error(ERR_CONSTELLATION_LIST)
        return
      }

      const { status, message } = await createConstellation(values)

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
      title='Constelación'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='constellation-form'
    >
      <Form {...form}>
        <form
          id='constellation-form'
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
                  <Input
                    placeholder='Nombre de la constelación'
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
            name='type'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tipo</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Tipo de habilidad' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Tipo</SelectLabel>
                      <SelectSeparator />
                      {SKILL_TYPE.map(({ value, label }) => (
                        <SelectItem
                          value={value}
                          key={value}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
                  <TextEditor
                    initialValue={field.value}
                    onChange={field.onChange}
                    isLoading={isPending}
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
