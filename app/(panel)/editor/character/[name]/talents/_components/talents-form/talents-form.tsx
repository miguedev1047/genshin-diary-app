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
import { ScrollArea } from '@/components/ui/scroll-area'
import { Plus } from 'lucide-react'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { TalentSchema } from '@/schemas'
import { Button } from '@/components/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialSelector } from '@/editor/character/[name]/talents/_components/material-selector'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { createTalent } from '@/editor/character/[name]/talents/_services/create'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function TalentsForm() {
  const { data: CHARACTER } = useGetCharacter()

  const { refresh } = useRouter()
  const [isPending, startTransition] = useTransition()

  const DISABLED_ASCENSIONS = CHARACTER?.talents
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
      const { message, status } = await createTalent(values, CHARACTER?.id)

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
          <SheetTitle>Nuevo talento</SheetTitle>
          <SheetDescription>
            Añade un nivel de talento nuevo para el personaje.
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
                          {ASCENSION_LEVEL.map((talent) => (
                            <SelectItem
                              key={talent.value}
                              value={talent.value}
                              disabled={DISABLED_ASCENSIONS?.includes(
                                talent.value
                              )}
                            >
                              {talent.label}
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

              <SheetFooter>
                <SheetClose asChild>
                  <Button
                    type='button'
                    variant='secondary'
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
