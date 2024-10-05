import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import { z } from 'zod'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import { ASCENSION_LEVEL } from '@/consts/general'
import { WeaponAscensionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { MaterialSelector } from '@/editor/weapon/[name]/ascensions/_components/material-selector'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createAscension } from '@/editor/weapon/[name]/ascensions/_services/create'
import { useGetWeapon } from '@/editor/weapon/[name]/provider'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function AsensionForm() {
  const { data: WEAPON } = useGetWeapon()

  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof WeaponAscensionSchema>>({
    resolver: zodResolver(WeaponAscensionSchema),
    defaultValues: {
      ascension_level: undefined,
      materials: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await createAscension(values, WEAPON?.id)

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
    <Sheet>
      <SheetTrigger asChild>
        <Button size='icon'>
          <Plus />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Añadir ascensión</SheetTitle>
          <SheetDescription>Añade una nueva ascensión</SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                name='ascension_level'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ascensión</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona una ascensión' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Ascensiones</SelectLabel>
                          <SelectSeparator />

                          {ASCENSION_LEVEL.map((ASCENSION) => (
                            <SelectItem
                              key={ASCENSION.value}
                              value={ASCENSION.value}
                            >
                              {ASCENSION.label}
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
                    variant='secondary'
                    type='button'
                  >
                    Cancelar
                  </Button>
                </SheetClose>
                <Button
                  type='submit'
                  disabled={isPending}
                >
                  Agregar
                </Button>
              </SheetFooter>
            </form>
          </Form>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
