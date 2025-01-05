'use client'

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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ATTRIBUTES,
  ELEMENTS,
  REGIONS,
  ROLE,
  STARS,
  WEAPON_TYPE,
} from '@/consts/general'
import { z } from 'zod'
import { CharacterSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { createCharacter } from '@/app/(panel)/creator/character/_services/create'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { FormCard } from '@/app/(panel)/_components/form-card'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { toast } from 'sonner'

export function CharacterForm() {
  const [isPending, startTranstion] = useTransition()
  const { refresh, push } = useRouter()

  const form = useForm<z.infer<typeof CharacterSchema>>({
    resolver: zodResolver(CharacterSchema),
    defaultValues: {
      name: '',
      image_url: '',
      description: '',
      role: '',
      element: '',
      rarity: '',
      attribute: '',
      region: '',
      weapon: '',
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await createCharacter(values)

      if (status === 201) {
        toast.success(message)

        push('/panel/characters')
        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <FormCard
      title='¿Deseas crear un nuevo personaje?'
      description='Ingresa los detalles del personaje. Haga clic en crear cuando haya terminado.'
      isLoading={isPending}
      formId='character-create-form'
    >
      <Form {...form}>
        <form
          id='character-create-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <div className='grid lg:grid-cols-2 gap-4'>
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
          </div>

          <div className='grid lg:grid-cols-2 gap-4'>
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
          </div>

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
        </form>
      </Form>
    </FormCard>
  )
}
