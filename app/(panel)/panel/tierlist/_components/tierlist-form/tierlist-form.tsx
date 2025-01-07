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
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { Input } from '@/components/ui/input'
import { TierlistSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createTierlist } from '@/app/(panel)/panel/tierlist/_services/create'
import { toast } from 'sonner'
import { TierlistFormProps } from '@/app/(panel)/panel/tierlist/_components/tierlist-form/tierlist-form.type'
import { API_PANEL_PREFIX } from '@/consts/misc'
import { fetcher } from '@/features/helpers/fetcher'
import { updateTierlist } from '@/app/(panel)/panel/tierlist/_services/update'

export function TierlistForm(props: TierlistFormProps) {
  const { id } = props

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const IS_EDITING = !!id

  const form = useForm<z.infer<typeof TierlistSchema>>({
    resolver: zodResolver(TierlistSchema),
    defaultValues: {
      tier_category: '',
    },
  })

  useEffect(() => {
    if (IS_EDITING) {
      startTransition(async () => {
        const DATA = await fetcher(`${API_PANEL_PREFIX}/tierlist/id/${id}`)
        if (!DATA) return

        form.setValue('tier_category', DATA.tier_category)
      })
    }
  }, [id, form, IS_EDITING])

  const handledSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateTierlist(values, id)

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createTierlist(values)

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
      title='Tier'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      formId='creator-tier'
      isEditing={IS_EDITING}
      isLoading={isPending}
    >
      <Form {...form}>
        <form
          id='creator-tier'
          onSubmit={handledSubmit}
          className='grid gap-4'
        >
          <FormField
            control={form.control}
            name='tier_category'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Main DPS'
                    disabled={isPending}
                    {...field}
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
