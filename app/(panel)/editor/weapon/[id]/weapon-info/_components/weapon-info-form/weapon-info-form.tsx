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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { ATTRIBUTES, STARS, WEAPON_TYPE } from '@/consts/general'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { WeaponSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { updateWeapon } from '@/app/(panel)/editor/weapon/[id]/weapon-info/_services/update'
import { useRouter } from 'next/navigation'
import { useGetWeapon } from '@/features/providers/weapon-provider'
import { toast } from 'sonner'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { Star } from 'lucide-react'
import { ViewImageInput } from '@/app/(panel)/_components/view-image-input'
import { TiptapEditor } from '@/components/tiptap'
import { Switch } from '@/components/ui/switch'

export function WeaponInfoForm() {
  const [isPending, startTransition] = useTransition()

  const { data: WEAPON } = useGetWeapon()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const IS_EDITING = !!WEAPON

  const form = useForm<z.infer<typeof WeaponSchema>>({
    resolver: zodResolver(WeaponSchema),
    defaultValues: {
      name: WEAPON?.name,
      max_base_attack: WEAPON?.max_base_attack.toString(),
      min_base_attack: WEAPON?.min_base_attack.toString(),
      max_secondary_stat_base: WEAPON?.max_secondary_stat_base.toString(),
      min_secondary_stat_base: WEAPON?.min_secondary_stat_base.toString(),
      image_url: WEAPON?.image_url ?? DEFAULT_IMAGE,
      secondary_stat: WEAPON?.secondary_stat,
      type: WEAPON?.type,
      rarity: WEAPON?.rarity,
      passive_description: WEAPON?.passive_description,
      is_new: WEAPON?.is_new || false,
      is_public: WEAPON?.is_public || false,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await updateWeapon(values, WEAPON?.id)

      if (status === 201) {
        toast.success(message)
        setIsOpen(false)
        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Información del arma'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='weapon-info-form'
    >
      <Form {...form}>
        <form
          id='weapon-info-form'
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <h2 className='text-lg font-bold'>General</h2>

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
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Daño Crit.' />
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

            <div className='grid grid-cols-2 gap-4'>
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
                  <FormLabel>Pasiva</FormLabel>
                  <FormControl>
                    <TiptapEditor
                      content={field.value}
                      onChange={field.onChange}
                      disabled={isPending}
                      placeholder='Descripción de la pasiva'
                    />
                  </FormControl>
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
                    <FormLabel>Nueva arma</FormLabel>
                    <FormDescription>
                      Marca esta arma como una nueva adición.
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
