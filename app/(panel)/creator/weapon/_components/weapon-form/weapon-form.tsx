'use client'

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
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { ATTRIBUTES, STARS, WEAPON_TYPE } from '@/consts/general'
import { WeaponSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Star } from 'lucide-react'
import { createWeapon } from '@/app/(panel)/creator/weapon/_services/create'
import { FormCard } from '@/app/(panel)/_components/form-card'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function WeaponForm() {
  const [isPending, startTranstion] = useTransition()
  const { refresh, push } = useRouter()

  const form = useForm<z.infer<typeof WeaponSchema>>({
    resolver: zodResolver(WeaponSchema),
    defaultValues: {
      name: '',
      image_url: '',
      passive_description: '',
      rarity: undefined,
      type: undefined,
      base_attack: undefined,
      main_stat: undefined,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await createWeapon(values)

      if (status === 201) {
        toast.success(message)

        push('/panel/weapons')
        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <FormCard
      title='¿Deseas crear una nueva arma?'
      description='Ingresa los detalles del arma. Haga clic en crear cuando haya terminado.'
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
          </div>

          <div className='grid lg:grid-cols-2 gap-4'>
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
          </div>

          <FormField
            control={form.control}
            name='passive_description'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción de la pasiva</FormLabel>
                <FormControl>
                  <TextEditor
                    initialValue={field.value}
                    onChange={field.onChange}
                    isLoading={isPending}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormCard>
  )
}
