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
  SelectSeparator,
  SelectValue,
  SelectTrigger,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { ASCENSION_LEVEL } from '@/consts/general'
import { WeaponAscensionSchema } from '@/schemas'
import { useTransition } from 'react'
import { DialogMultiSelect } from '@/shared/layouts/panel/dialog-multi-select/dialog-multi-select'
import { useGetMaterials } from '@/app/(panel)/editor/weapon/[name]/_queries/use-marterial'
import { createAscension } from '@/app/(panel)/editor/weapon/[name]/_services/create'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { toast } from 'sonner'

const MAX_MATERIALS = 3
const MAX_ASCENSION = 6
const MIN_ITEMS = 0

export function AscensionForm() {
  const [isPending, startTranstion] = useTransition()

  const { data: WEAPON, refetch } = useGetWeaponByName()
  const { data: MATERIALS } = useGetMaterials()

  const ASCENSION_ITEMS = WEAPON?.ascensions ?? []
  const MAX_ASCENSION_ITEMS = ASCENSION_ITEMS.length >= MAX_ASCENSION

  const form = useForm<z.infer<typeof WeaponAscensionSchema>>({
    resolver: zodResolver(WeaponAscensionSchema),
    defaultValues: {
      ascension_level: undefined,
      materials: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const MAX_MATERIALS_ITEMS = values.materials.length > MAX_MATERIALS

    if (MAX_ASCENSION_ITEMS) {
      toast.error(`No puedes agregar mas de ${MAX_ASCENSION} ascensiones`)
      return
    }

    if (MAX_MATERIALS_ITEMS) {
      toast.error(`No puedes agregar mas de ${MAX_MATERIALS} materiales`)
      return
    }

    startTranstion(async () => {
      const { status, message } = await createAscension(values, WEAPON?.id)

      if (status === 201) {
        toast.success(message)
        form.reset()

        refetch()
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
          <SheetTitle>Agregar ascensión</SheetTitle>
          <SheetDescription>Agrega un nivel de ascensión</SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              id='ascension-form'
              onSubmit={handleSubmit}
              className='grid gap-4 px-1'
            >
              <FormField
                control={form.control}
                name='ascension_level'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de ascensión</FormLabel>
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un nivel de ascensión' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Nivel de ascensión</SelectLabel>
                          <SelectSeparator />
                          {ASCENSION_LEVEL.map(({ value, label }) => (
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
                control={form.control}
                name='materials'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nivel de ascensión</FormLabel>
                    <FormControl>
                      <DialogMultiSelect
                        options={MATERIALS}
                        disabledKeys={[]}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        placeholder='Seleccionar materiales'
                        maxCount={2}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              type='submit'
              form='ascension-form'
              disabled={isPending}
            >
              Guardar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
