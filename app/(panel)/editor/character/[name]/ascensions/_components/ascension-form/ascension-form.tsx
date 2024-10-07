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
import { AscensionsFormProps } from '@/app/(panel)/editor/character/[name]/ascensions/_components/ascension-form/ascension-form.type'
import { Plus } from 'lucide-react'
import { MaterialSelector } from '@/app/(panel)/editor/character/[name]/ascensions/_components/material-selector'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'
import { AscensionSchema } from '@/schemas'
import { createAscension } from '@/app/(panel)/editor/character/[name]/ascensions/_services/create'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { toast } from 'sonner'

const MAX_MATERIAL_ITEMS = 4
const MAX_ASCENSIONS_ITEMS = 6

const MIN_ITEMS = 0

export function AscensionForm(props: AscensionsFormProps) {
  const { data: CHARACTER } = props
  const ASCENSIONS = CHARACTER?.ascensions

  const [isPending, startTranstion] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof AscensionSchema>>({
    resolver: zodResolver(AscensionSchema),
    defaultValues: {
      ascension_level: '',
      materials: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_MATERIALS = values.materials.length > MAX_MATERIAL_ITEMS
    if (MAX_MATERIALS) {
      return toast.error(
        `No puedes agregar mas de ${MAX_MATERIAL_ITEMS} materiales.`
      )
    }

    const MAX_ASCENSIONS =
      (ASCENSIONS?.length ?? MIN_ITEMS) >= MAX_ASCENSIONS_ITEMS
    if (MAX_ASCENSIONS) {
      return toast.error(
        `No puedes agregar mas de ${MAX_ASCENSIONS_ITEMS} ascensiones.`
      )
    }

    startTranstion(async () => {
      const { message, status } = await createAscension(values, CHARACTER?.id)

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
          <SheetTitle>Agregar ascension</SheetTitle>
          <SheetDescription>
            Añade una ascension al personaje. Una vez termines guarda los
            cambios.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              id='ascension-form'
              onSubmit={handleSubmit}
              className='grid gap-4 px-1'
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
                          {ASCENSION_LEVEL.map(({ label, value }) => (
                            <SelectItem
                              key={value}
                              value={value}
                            >
                              {label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
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
