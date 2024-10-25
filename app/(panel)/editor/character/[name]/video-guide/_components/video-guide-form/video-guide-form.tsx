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
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { VideoGuideSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateVideoGuide } from '@/editor/character/[name]/video-guide/_services/update'
import { createVideoGuide } from '@/editor/character/[name]/video-guide/_services/create'
import { FormSheet } from '@/shared/layouts/panel/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function VideoGuideForm() {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const { data: CHARACTER } = useGetCharacter()

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
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createVideoGuide(values)

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Video guía'
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
                <FormLabel>Nombre del Canal</FormLabel>
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
                <FormLabel>Embed del Video</FormLabel>
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
