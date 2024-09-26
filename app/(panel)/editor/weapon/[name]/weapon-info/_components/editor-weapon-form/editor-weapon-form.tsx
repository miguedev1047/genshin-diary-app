'use client'

import { EditorWeaponFormProps } from '@/app/(panel)/editor/weapon/[name]/weapon-info/_components/editor-weapon-form/editor-weapon-form.type'
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
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { ATTRIBUTES, DEFAULT_IMAGE, STARS, WEAPON_TYPE } from '@/consts/general'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { WeaponSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { AttributeEnum, WeaponTypeEnum } from '@prisma/client'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Pencil, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formattedUrl } from '@/features/utils/formatted-names'
import { updateWeapon } from '@/app/(panel)/editor/weapon/[name]/weapon-info/_services/update'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function EditorWeaponForm(props: EditorWeaponFormProps) {
  const { data: WEAPON } = props

  const [isPending, startTransition] = useTransition()
  const { refresh, replace } = useRouter()

  const form = useForm<z.infer<typeof WeaponSchema>>({
    resolver: zodResolver(WeaponSchema),
    defaultValues: {
      name: WEAPON?.name,
      main_stat: WEAPON?.main_stat as AttributeEnum,
      image_url: WEAPON?.image_url ?? DEFAULT_IMAGE,
      type: WEAPON?.type as WeaponTypeEnum,
      rarity: WEAPON?.rarity,
      base_attack: WEAPON?.base_attack.toString(),
      passive_description: WEAPON?.passive_description,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const FORMAT_NAME = formattedUrl(values.name)

    startTransition(async () => {
      const { status, message } = await updateWeapon(values, WEAPON?.id)

      if (status === 201) {
        toast.success(message)
        replace(`/editor/weapon/${FORMAT_NAME}`)
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
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>Editar arma</SheetHeader>
        <SheetDescription>
          Ingresa los detalles de la arma. Haga clic en editar cuando haya
          terminado.
        </SheetDescription>
        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              id='editor-weapon-form'
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder='Nombre de la arma'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='image_url'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de la imagen</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder='URL de la imagen'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='main_stat'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atributo principal</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Atributo principal' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Atributo principal</SelectLabel>
                            <SelectSeparator />
                            {ATTRIBUTES.slice(0, 9).map(({ label, value }) => (
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
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='base_attack'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ataque base</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        type='number'
                        placeholder='Ataque base'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='rarity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rareza</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Rareza del arma' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Rareza</SelectLabel>
                            <SelectSeparator />
                            {STARS.map(({ label, value }) => (
                              <SelectItem
                                key={value}
                                value={value}
                              >
                                <div className='flex items-center gap-2'>
                                  <span className='text-amber-400'>
                                    <Star />
                                  </span>
                                  {label}
                                </div>
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='type'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de arma</FormLabel>
                    <FormControl>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Tipo de arma' />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Tipo de arma</SelectLabel>
                            <SelectSeparator />
                            {WEAPON_TYPE.map(({ label, value }) => (
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
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='passive_description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pasiva</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder='Descripción de la pasiva'
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <SheetFooter>
          <Button
            type='submit'
            disabled={isPending}
            form='editor-weapon-form'
          >
            Guardar
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
