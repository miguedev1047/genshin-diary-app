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
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { ArtifactCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArtifactSelector } from '@/editor/character/[name]/artifacts/_components/artifact-selector'
import { createArtifacts } from '@/editor/character/[name]/artifacts/_services/create'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const MAX_ARTIFACTS = 5

export function ArtifactForm() {
  const { data: CHARACTER } = useGetCharacter()
  
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const ARTIFACTS = CHARACTER?.artifacts ?? []

  const form = useForm<z.infer<typeof ArtifactCharacterSchema>>({
    resolver: zodResolver(ArtifactCharacterSchema),
    defaultValues: {
      artifacts: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_ITEMS = [...ARTIFACTS, ...values.artifacts].length > MAX_ARTIFACTS

    if (MAX_ITEMS) {
      return toast.error(`No puedes añadir más de ${MAX_ARTIFACTS} artefactos`)
    }

    startTransition(async () => {
      const { status, message } = await createArtifacts(values, CHARACTER?.id)

      if (status === 201) {
        toast.success(message)
        form.reset()
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
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Nuevo artefacto</SheetTitle>
          <SheetDescription>
            Añade un nuevo artefacto para el personaje.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                name='artifacts'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artefactos</FormLabel>
                    <FormControl>
                      <ArtifactSelector {...field} />
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
                  Guardar
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
