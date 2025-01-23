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
import { useEffect, useMemo, useState, useTransition } from 'react'
import { SkillCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { SKILL_TYPE } from '@/consts/general'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Input } from '@/components/ui/input'
import { TextEditor } from '@/app/(panel)/_components/text-editor/text-editor'
import { useGetCharacter } from '@/features/providers/character-provider'
import { createTalent } from '@/app/(panel)/editor/character/[id]/skills/talents/_services/create'
import { useRouter } from 'next/navigation'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { TalentFormProps } from '@/app/(panel)/editor/character/[id]/skills/talents/_components/talent-form/talent-form.type'
import { updateTalent } from '@/app/(panel)/editor/character/[id]/skills/talents/_services/update'
import { toast } from 'sonner'
import { ViewImageInput } from '@/app/(panel)/_components/view-image-input'

const MAX_TALENTS = 3

const ERR_TALENT_LIST = `No puedes añadir más de ${MAX_TALENTS} talentos.`

export function TalentForm(props: TalentFormProps) {
  const { id: TALENT_ID } = props

  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const TALENTS = useMemo(() => CHARACTER?.talents ?? [], [CHARACTER])
  const IS_EDITING = !!TALENT_ID

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
      const TALENT = TALENTS.find((i) => i.id === TALENT_ID)
      if (!TALENT) return

      form.setValue('title', TALENT.title)
      form.setValue('description', TALENT.description)
      form.setValue('image_url', TALENT.image_url ?? DEFAULT_IMAGE)
      form.setValue('type', TALENT.type)
    }
  }, [form, TALENT_ID, TALENTS, IS_EDITING, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateTalent(values, TALENT_ID)

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const MAX_ITEMS = TALENTS.length >= MAX_TALENTS
      if (MAX_ITEMS) {
        toast.error(ERR_TALENT_LIST)
        return
      }

      const { status, message } = await createTalent(values)

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
      title='Talento'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='talent-form'
    >
      <Form {...form}>
        <form
          id='talent-form'
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
                    placeholder='Nombre del talento'
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
