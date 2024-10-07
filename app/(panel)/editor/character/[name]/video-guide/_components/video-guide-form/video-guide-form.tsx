'use client'

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
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
import { NONE } from '@/consts/general'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Pencil, Plus } from 'lucide-react'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { VideoGuideSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { updateVideoGuide } from '@/editor/character/[name]/video-guide/_services/update'
import { createVideoGuide } from '@/editor/character/[name]/video-guide/_services/create'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function VideoGuideForm() {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const { data: CHARACTER } = useGetCharacter()

  const VIDEO_GUIDE = CHARACTER?.video_guide
  const VIDEO_GUIDE_EXISTS = VIDEO_GUIDE?.id !== undefined

  const form = useForm<z.infer<typeof VideoGuideSchema>>({
    resolver: zodResolver(VideoGuideSchema),
    defaultValues: {
      character_id: CHARACTER?.id ?? NONE,
      youtuber_name: VIDEO_GUIDE?.youtuber_name ?? NONE,
      youtuber_channel: VIDEO_GUIDE?.youtuber_channel ?? NONE,
      embed_video_url: VIDEO_GUIDE?.embed_video_url ?? NONE,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (VIDEO_GUIDE_EXISTS) {
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

  const handleReset = () => form.reset()

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon'>
          {VIDEO_GUIDE_EXISTS ? <Pencil /> : <Plus />}
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>
            {VIDEO_GUIDE_EXISTS ? 'Editar' : 'Nueva'} video guia
          </SheetTitle>
          <SheetDescription>
            {VIDEO_GUIDE_EXISTS
              ? 'Edita el video guia seleccionado.'
              : 'Añade un video guia para el personaje.'}
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
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

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    variant='secondary'
                    type='button'
                    onClick={handleReset}
                  >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  disabled={isPending}
                  type='submit'
                >
                  {VIDEO_GUIDE_EXISTS ? 'Guardar' : 'Agregar'}
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
