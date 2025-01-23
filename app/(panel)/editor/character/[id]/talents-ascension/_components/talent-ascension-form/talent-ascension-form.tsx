'use client'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { z } from 'zod'
import { ASCENSION_LEVEL } from '@/consts/general'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TalentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useRouter } from 'next/navigation'
import { createTalentAscension } from '@/app/(panel)/editor/character/[id]/talents-ascension/_services/create'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { toast } from 'sonner'
import { TalentAscensionFormProps } from '@/app/(panel)/editor/character/[id]/talents-ascension/_components/talent-ascension-form/talent-ascension-form.type'
import { updateMaterialTalentAscension } from '@/app/(panel)/editor/character/[id]/talents-ascension/_services/update'
import { TalentSelector } from '@/app/(panel)/_components/dialog-selectors/talent-selector'

const MAX_MATERIALS = 4

const ERR_MATERIAL_LIST = `No puedes añadir mas de ${MAX_MATERIALS} materiales!`

export function TalentAscensionForm(props: TalentAscensionFormProps) {
  const { id: ASCENSION_ID } = props
  const { data: CHARACTER } = useGetCharacter()

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const ASCENSIONS = useMemo(
    () => CHARACTER?.talents_ascension ?? [],
    [CHARACTER]
  )

  const DISABLED_ASCENSIONS = CHARACTER?.talents_ascension
    .filter((c) => c.character_id === CHARACTER?.id)
    .map((c) => c.ascension_level)

  const IS_EDITING = !!ASCENSION_ID

  const form = useForm<z.infer<typeof TalentSchema>>({
    resolver: zodResolver(TalentSchema),
    defaultValues: {
      talent_level: '',
      materials: [],
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const ASCENSION = ASCENSIONS.find((i) => i.id === ASCENSION_ID)
      const MATERIALS = ASCENSION?.materials.map((i) => i.material_id)

      if (!MATERIALS || !ASCENSION) return

      form.setValue('talent_level', ASCENSION.ascension_level)
      form.setValue('materials', MATERIALS as never)
    }
  }, [form, IS_EDITING, ASCENSIONS, ASCENSION_ID, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    const CHARACTER_ID = CHARACTER?.id
    
    const ASCENSION_ITEMS = values.materials.length > MAX_MATERIALS
    if (ASCENSION_ITEMS) return toast.error(ERR_MATERIAL_LIST)

    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateMaterialTalentAscension(
          values,
          CHARACTER_ID,
          ASCENSION_ID
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

      const { message, status } = await createTalentAscension(
        values,
        CHARACTER_ID
      )

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
      title='Ascensión de talento'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isLoading={isPending}
      isEditing={IS_EDITING}
      formId='talent-ascension-form'
    >
      <Form {...form}>
        <form
          id='talent-ascension-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            control={form.control}
            name='talent_level'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  disabled={isPending}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Seleccione un nivel' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Nivel</SelectLabel>
                      {ASCENSION_LEVEL.map(({ label, value }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          disabled={DISABLED_ASCENSIONS?.includes(value)}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='materials'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materiales</FormLabel>
                <FormControl>
                  <TalentSelector {...field} />
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
