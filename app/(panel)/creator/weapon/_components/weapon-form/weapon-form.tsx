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
import { TiptapEditor } from '@/components/tiptap'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { ViewImageInput } from '@/app/(panel)/_components/view-image-input'

export function WeaponForm() {
  const [isPending, startTransition] = useTransition()
  const { back } = useRouter()

  const form = useForm<z.infer<typeof WeaponSchema>>({
    resolver: zodResolver(WeaponSchema),
    defaultValues: {
      name: '',
      image_url: '',
      passive_description: '',
      rarity: undefined,
      type: undefined,
      secondary_stat: undefined,
      max_base_attack: undefined,
      min_base_attack: undefined,
      max_secondary_stat_base: undefined,
      min_secondary_stat_base: undefined,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await createWeapon(values)

      if (status === 201) {
        toast.success(message)
        back()

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
                    <ViewImageInput
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
              name='secondary_stat'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Substat secundario</FormLabel>
                  <FormControl>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Selecciona un substat' />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Atributo sencundario</SelectLabel>
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
                          {STARS.slice(0, 3).map(({ label, value }) => (
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
                  <FormMessage />
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='grid lg:grid-cols-2 gap-4'>
            <FormField
              control={form.control}
              name='min_base_attack'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ataque base minimo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='number'
                      placeholder='41'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='max_base_attack'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ataque base maximo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='number'
                      placeholder='674'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='min_secondary_stat_base'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Substat base minimo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='number'
                      placeholder='11%'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='max_secondary_stat_base'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Substat base maximo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      type='number'
                      placeholder='82%'
                    />
                  </FormControl>
                  <FormMessage />
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
                  <TiptapEditor
                    content={field.value}
                    onChange={field.onChange}
                    disabled={isPending}
                    placeholder='Descripción del arma'
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
