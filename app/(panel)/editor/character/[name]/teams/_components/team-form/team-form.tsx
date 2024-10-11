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
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { TeamsCharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { CharacterSelector } from '@/editor/character/[name]/teams/_components/character-selector'
import { createTeams } from '@/editor/character/[name]/teams/_services/create'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const MAX_TEAMS = 4
const MAX_CHARACTERS = 4

export function TeamForm() {
  const { data: CHARACTER } = useGetCharacter()

  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()

  const TEAMS = CHARACTER?.teams ?? []

  const form = useForm<z.infer<typeof TeamsCharacterSchema>>({
    resolver: zodResolver(TeamsCharacterSchema),
    defaultValues: {
      name: '',
      characters: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_CHARACTER_ITEMS = values.characters.length > MAX_CHARACTERS

    if (MAX_CHARACTER_ITEMS) {
      return toast.error(
        `No puedes añadir más de ${MAX_CHARACTERS} personajes a un equipo.`
      )
    }

    const MAX_TEAM_ITEMS = TEAMS.length >= MAX_TEAMS

    if (MAX_TEAM_ITEMS) {
      return toast.error(`No puedes añadir más de ${MAX_TEAMS} equipos.`)
    }

    startTransition(async () => {
      const { message, status } = await createTeams(values, CHARACTER?.id)

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
          <SheetTitle>Nuevo equipo</SheetTitle>
          <SheetDescription>Añade un equipo al personaje.</SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del equipo</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder='Baaltional Team'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='characters'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Personajes</FormLabel>
                    <FormControl>
                      <CharacterSelector
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
                  type='submit'
                  disabled={isPending}
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
