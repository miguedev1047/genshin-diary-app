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
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TalentSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { createTalentAscension } from '@/editor/character/[name]/talents-ascension/_services/create'
import { MaterialSelector } from '@/editor/character/[name]/talents-ascension/_components/material-selector'
import { FormSheet } from '@/shared/layouts/panel/form-sheet'
import { toast } from 'sonner'

export function TalentAscensionForm() {
  const { data: CHARACTER } = useGetCharacter()

  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()

  const DISABLED_ASCENSIONS = CHARACTER?.talents_ascension
    .filter((c) => c.character_id === CHARACTER?.id)
    .map((c) => c.ascension_level)

  const form = useForm<z.infer<typeof TalentSchema>>({
    resolver: zodResolver(TalentSchema),
    defaultValues: {
      talent_level: '',
      materials: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { message, status } = await createTalentAscension(
        values,
        CHARACTER?.id
      )

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
      title='Ascensión de talento'
      isLoading={isPending}
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
