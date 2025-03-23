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
import { Input } from '@/components/ui/input'
import { useGetCharacter } from '@/features/providers/character-provider'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { VideoGuideSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateVideoGuide } from '@/app/(panel)/editor/character/[id]/video-guide/_services/update'
import { createVideoGuide } from '@/app/(panel)/editor/character/[id]/video-guide/_services/create'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function VideoGuideForm() {
  const [isPending, startTransition] = useTransition()

  const { data: CHARACTER } = useGetCharacter()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const VIDEO_GUIDE = CHARACTER?.video_guide
  const IS_EDITING = VIDEO_GUIDE?.id !== undefined

  const form = useForm<z.infer<typeof VideoGuideSchema>>({
    resolver: zodResolver(VideoGuideSchema),
    defaultValues: {
      character_id: CHARACTER?.id ?? '',
      youtuber_name: VIDEO_GUIDE?.youtuber_name ?? '',
      youtuber_channel: VIDEO_GUIDE?.youtuber_channel ?? '',
      embed_video_url: VIDEO_GUIDE?.embed_video_url ?? '',
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateVideoGuide(
          values,
          VIDEO_GUIDE.id
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

      const { status, message } = await createVideoGuide(values)

      if (status === 201) {
        toast.success(message)
        setIsOpen(false)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Video guía'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='video-guide-form'
    >
      <Form {...form}>
        <form
          id='video-guide-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            control={form.control}
            name='youtuber_name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre del Youtuber</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Tanna'
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
            name='youtuber_channel'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url del canal</FormLabel>
                <FormControl>
                  <Input
                    placeholder='@Tanna'
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
            name='embed_video_url'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Url del video</FormLabel>
                <FormControl>
                  <Input
                    placeholder='https://www.youtube.com/embed/XXXXXXXXXXXX'
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
