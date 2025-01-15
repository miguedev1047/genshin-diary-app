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
import { MaterialSelector } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-selector'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AscensionSchema } from '@/schemas'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { createAscension } from '@/app/(panel)/editor/character/[id]/ascensions/_services/create'
import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

const MAX_MATERIALS = 4

export function AscensionForm(props: AscensionsFormProps) {
  const { data: CHARACTER } = props

  const [isPending, startTranstion] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const DISABLED_ASCENSIONS = CHARACTER?.ascensions
    .filter((c) => c.character_id === CHARACTER?.id)
    .map((c) => c.ascension_level)

  const form = useForm<z.infer<typeof AscensionSchema>>({
    resolver: zodResolver(AscensionSchema),
    defaultValues: {
      ascension_level: '',
      materials: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const ASCENSION_ITEMS = values.materials.length > MAX_MATERIALS

    if (ASCENSION_ITEMS) {
      return toast.error(`No puedes añadir mas de ${MAX_MATERIALS} materiales!`)
    }

    startTranstion(async () => {
      const { message, status } = await createAscension(values, CHARACTER?.id)

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
                  disabled={isPending}
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
