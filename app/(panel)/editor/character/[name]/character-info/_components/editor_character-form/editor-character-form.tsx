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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ATTRIBUTES,
  DEFAULT_IMAGE,
  ELEMENTS,
  REGIONS,
  ROLE,
  STARS,
  WEAPON_TYPE,
} from '@/consts/general'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { EditorCharacterFormProps } from './editor-character-form.type'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Pencil, Star } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { CharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { updateCharacter } from '@/app/(panel)/editor/character/[name]/character-info/_services/update'
import { toast } from 'sonner'
import { formattedUrl } from '@/features/utils/formatted-names'

export function EditorCharacterForm(props: EditorCharacterFormProps) {
  const { data: CHARACTER } = props

  const [isPending, startTranstion] = useTransition()
  const { refresh, replace } = useRouter()

  const form = useForm<z.infer<typeof CharacterSchema>>({
    resolver: zodResolver(CharacterSchema),
    defaultValues: {
      attribute: CHARACTER?.attribute,
      description: CHARACTER?.description,
      element: CHARACTER?.element,
      image_url: CHARACTER?.images?.splash_art_url ?? DEFAULT_IMAGE,
      name: CHARACTER?.name,
      rarity: CHARACTER?.rarity,
      region: CHARACTER?.region,
      role: CHARACTER?.role,
      weapon: CHARACTER?.weapon,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const CHARACTER_NAME = formattedUrl(values.name)

    startTranstion(async () => {
      const { status, message } = await updateCharacter(values, CHARACTER?.id)

      if (status === 201) {
        toast.success(message)

        replace(`/editor/character/${CHARACTER_NAME}`)
        refresh()
        return
      }

      toast.success(message)
    })
  })

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size='icon'
          disabled={isPending}
        >
          <Pencil />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Editar personaje: {CHARACTER?.name}</SheetTitle>
          <SheetDescription>
            Edita la informacion del personaje. Una vez que termines guarda los
            cambios.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              id='editor-character-form'
              onSubmit={handleSubmit}
              className='grid gap-4 px-1 py-4'
            >
              <FormField
                disabled={isPending}
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
                        placeholder='Nombre'
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
                name='rarity'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rareza</FormLabel>
                    <Select
                      disabled={isPending}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Rareza' />
                          </SelectTrigger>
                        </FormControl>
                      </FormControl>
                      <SelectContent>
                        {STARS.slice(0, 2).map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            <div className='flex items-center space-x-2'>
                              <Star className='size-6 text-amber-400' />
                              <span>{label}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='region'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select
                      disabled={isPending}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Region' />
                          </SelectTrigger>
                        </FormControl>
                      </FormControl>
                      <SelectContent>
                        {REGIONS.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='element'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Elemento</FormLabel>
                    <Select
                      disabled={isPending}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Elemento' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ELEMENTS.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='role'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      disabled={isPending}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Rol' />
                          </SelectTrigger>
                        </FormControl>
                      </FormControl>
                      <SelectContent>
                        {ROLE.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='weapon'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tipo de arma</FormLabel>
                    <Select
                      disabled={isPending}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Arma' />
                          </SelectTrigger>
                        </FormControl>
                      </FormControl>
                      <SelectContent>
                        {WEAPON_TYPE.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='attribute'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Atributo de ascension</FormLabel>
                    <Select
                      value={field.value}
                      disabled={isPending}
                      onValueChange={field.onChange}
                    >
                      <FormControl>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder='Atributo de ascension' />
                          </SelectTrigger>
                        </FormControl>
                      </FormControl>
                      <SelectContent>
                        {ATTRIBUTES.map(({ label, value }) => (
                          <SelectItem
                            key={value}
                            value={value}
                          >
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripción</FormLabel>
                    <FormControl>
                      <Textarea
                        disabled={isPending}
                        placeholder='Descripción del personaje'
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
          <SheetClose asChild>
            <Button
              type='submit'
              form='editor-character-form'
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
