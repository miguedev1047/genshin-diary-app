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
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { ASCENSION_LEVEL } from '@/consts/general'
import { AscensionsFormProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/ascension-form/ascension-form.type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AscensionSchema } from '@/schemas'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { createAscension } from '@/app/(panel)/editor/character/[id]/ascensions/_services/create'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { MaterialSelector } from '@/app/(panel)/_components/dialog-selectors/material-selector'
import { updateMaterials } from '@/app/(panel)/editor/character/[id]/ascensions/_services/update'
import { useGetCharacter } from '@/features/providers/character-provider'

const MAX_MATERIALS = 4

const ERR_MATERIAL_LIST = `No puedes añadir mas de ${MAX_MATERIALS} materiales!`

export function AscensionForm(props: AscensionsFormProps) {
  const { id: ASCENSION_ID } = props
  const { data: CHARACTER } = useGetCharacter()

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const ASCENSIONS = useMemo(() => CHARACTER?.ascensions ?? [], [CHARACTER])

  const DISABLED_ASCENSIONS = ASCENSIONS.filter(
    (c) => c.character_id === CHARACTER?.id
  ).map((c) => c.ascension_level)

  const IS_EDITING = !!ASCENSION_ID

  const form = useForm<z.infer<typeof AscensionSchema>>({
    resolver: zodResolver(AscensionSchema),
    defaultValues: {
      ascension_level: '',
      materials: [],
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const ASCENSION = ASCENSIONS.find((i) => i.id === ASCENSION_ID)
      const MATERIALS = ASCENSION?.materials.map((i) => i.material_id)
      
      if (!MATERIALS || !ASCENSION) return

      form.setValue('ascension_level', ASCENSION?.ascension_level)
      form.setValue('materials', MATERIALS as never)
    }
  }, [form, IS_EDITING, ASCENSIONS, ASCENSION_ID, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    const CHARACTER_ID = CHARACTER?.id

    const ASCENSION_ITEMS = values.materials.length > MAX_MATERIALS
    if (ASCENSION_ITEMS) return toast.error(ERR_MATERIAL_LIST)

    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateMaterials(
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

      const { message, status } = await createAscension(values, CHARACTER_ID)

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
      title='Ascension'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isLoading={isPending}
      isEditing={IS_EDITING}
      formId='ascension-form'
    >
      <Form {...form}>
        <form
          id='ascension-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            name='ascension_level'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nivel de ascension</FormLabel>
                <Select
                  disabled={isPending || IS_EDITING}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una ascension' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ascensiones</SelectLabel>
                      {ASCENSION_LEVEL.slice(0, 6).map(({ label, value }) => (
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
            name='materials'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Seleccionar materiales</FormLabel>
                <FormControl>
                  <MaterialSelector {...field} />
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
