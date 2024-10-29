'use client'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { useForm } from 'react-hook-form'
import { CharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { updateCharacter } from '@/app/(panel)/editor/character/[name]/character-info/_services/update'
import { toast } from 'sonner'
import { formattedUrl } from '@/features/utils/formatted-names'
import { FormSheet } from '@/shared/layouts/panel/form-sheet'
import { TextEditor } from '@/shared/components/text-editor'
import { Switch } from '@/components/ui/switch'

export function CharacterInfoForm() {
  const { data: CHARACTER } = useGetCharacter()

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
      is_new: CHARACTER?.is_new,
      is_public: CHARACTER?.is_public,
    },
  })

  const IS_EDITING = !!CHARACTER

  const handleSubmit = form.handleSubmit((values) => {
    const FORMAT_NAME = formattedUrl(values.name)

    startTranstion(async () => {
      const { status, message } = await updateCharacter(values, CHARACTER?.id)

      if (status === 201) {
        toast.success(message)

        replace(`/editor/character/${FORMAT_NAME}`)
        refresh()
        return
      }

      toast.success(message)
    })
  })

  return (
    <FormSheet
      title='Informacion del personaje'
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='character-info-form'
    >
      <Form {...form}>
        <form
          id='character-info-form'
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='grid gap-4'>
            <h2 className='text-lg font-bold'>General</h2>

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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                  <FormMessage />
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
                    <TextEditor
                      initialValue={field.value}
                      onChange={field.onChange}
                      isLoading={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid gap-4'>
            <h2 className='text-lg font-bold'>Configuraciones</h2>

            <FormField
              control={form.control}
              name='is_public'
              render={({ field }) => (
                <FormItem className='flex items-center justify-between gap-4 rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel>Visible para todos</FormLabel>
                    <FormDescription>
                      Permite que todos los usuarios vean este contenido.
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='is_new'
              render={({ field }) => (
                <FormItem className='flex flex-row items-center justify-between gap-4 rounded-lg border p-4'>
                  <div className='space-y-0.5'>
                    <FormLabel>Nuevo personaje</FormLabel>
                    <FormDescription>
                      Marca este personaje como una nueva adición.
                    </FormDescription>
                  </div>

                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </FormSheet>
  )
}
