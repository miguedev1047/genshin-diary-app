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
import { useEffect, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { SkillCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { getConstellation } from '@/editor/character/[name]/skills/constellations/_services/fetch'
import { createConstellation } from '@/editor/character/[name]/skills/constellations/_services/create'
import { updateConstellation } from '@/editor/character/[name]/skills/constellations/_services/update'
import { ConstellationFormProps } from '@/editor/character/[name]/skills/constellations/_components/constellation-form/constellation-form.type'
import { DEFAULT_IMAGE, SKILL_TYPE } from '@/consts/general'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'

const MAX_ITEMS = 6

export function ConstellationForm(props: ConstellationFormProps) {
  const { id } = props

  const { data: CHARACTER } = useGetCharacter()
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const MAX_CONSTELLATIONS = (CHARACTER?.passives.length ?? 0) >= MAX_ITEMS
  const IS_EDITING = !!id

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
    if (IS_EDITING) {
      startTransition(async () => {
        const DATA = await getConstellation(id)
        if (!DATA) return

        form.setValue('title', DATA.title)
        form.setValue('description', DATA.description)
        form.setValue('image_url', DATA.image_url ?? DEFAULT_IMAGE)
        form.setValue('type', DATA.type)
      })
    }
  }, [id, form, IS_EDITING])

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateConstellation(values, id)

        if (status === 201) {
          toast.success(message)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      if (MAX_CONSTELLATIONS) {
        toast.error(`No puedes añadir más de ${MAX_ITEMS} constelaciones.`)
        return
      }

      const { status, message } = await createConstellation(values)

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
      title='Constelación'
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
                  <Input
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
