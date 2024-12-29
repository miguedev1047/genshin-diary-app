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
import { useForm } from 'react-hook-form'
import { useEffect, useState, useTransition } from 'react'
import { SkillCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { DEFAULT_IMAGE, SKILL_TYPE } from '@/consts/general'
import { Input } from '@/components/ui/input'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { useGetCharacter } from '@/app/(panel)/editor/character/[id]/provider'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { PassiveFormProps } from '@/app/(panel)/editor/character/[id]/skills/passives/_components/passive-form/passive-form.type'
import { getPassive } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/fetch'
import { createPassive } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/create'
import { updatePassive } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/update'
import { toast } from 'sonner'

const MAX_ITEMS = 3

export function PassiveForm(props: PassiveFormProps) {
  const { id } = props

  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const MAX_PASSIVES = (CHARACTER?.passives.length ?? 0) >= MAX_ITEMS
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
        const DATA = await getPassive(id)
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
        const { status, message } = await updatePassive(values, id)

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      if (MAX_PASSIVES) {
        toast.error(`No puedes añadir más de ${MAX_ITEMS} pasivas.`)
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
                  <Input
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
