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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { MaterialSchema } from '@/schemas'
import { FormCard } from '@/shared/layouts/panel/form-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'
import { MATERIAL_TYPES, STARS } from '@/consts/general'
import { Textarea } from '@/components/ui/textarea'
import { createMaterial } from '@/app/(panel)/creator/material/_service/create'
import { toast } from 'sonner'

export function CreatorMaterialForm() {
  const [isPending, startTranstion] = useTransition()
  const { refresh, push } = useRouter()

  const form = useForm<z.infer<typeof MaterialSchema>>({
    resolver: zodResolver(MaterialSchema),
    defaultValues: {
      name: '',
      description: '',
      image_url: '',
      rarity: undefined,
      type: undefined,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await createMaterial(values)

      if (status === 201) {
        toast.success(message)
        
        push('/panel/materials')
        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <FormCard
      title='¿Deseas crear un nuevo material?'
      description='Ingresa los detalles del nuevo material. Haga clic en crear cuando haya terminado.'
      formId='creator-material'
    >
      <Form {...form}>
        <form
          id='creator-material'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <div className='grid lg:grid-cols-2 gap-4'>
            <FormField
              name='name'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nombre del material'
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              name='image_url'
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de la imagen</FormLabel>
                  <FormControl>
                    <Input
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
                      {STARS.map(({ label, value }) => (
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
              name='type'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <Select
                    disabled={isPending}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder='Tipo de material' />
                        </SelectTrigger>
                      </FormControl>
                    </FormControl>
                    <SelectContent>
                      {MATERIAL_TYPES.map(({ label, value }) => (
                        <SelectItem
                          key={value}
                          value={value}
                        >
                          <span>{label}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripcion</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder='Descripción del artefacto'
                    {...field}
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
