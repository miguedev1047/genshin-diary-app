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
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createTierlist } from '@/app/(panel)/panel/tierlist/_services/create'
import { toast } from 'sonner'

export function TierlistForm() {
  const [isPending, startTranstion] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof TierlistSchema>>({
    resolver: zodResolver(TierlistSchema),
    defaultValues: {
      tier_category: '',
    },
  })

  const handledSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
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
