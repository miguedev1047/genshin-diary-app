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
import { z } from 'zod'
import { MaterialSchema } from '@/schemas'
import { FormCard } from '@/app/(panel)/_components/form-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Star } from 'lucide-react'
import { MATERIAL_TYPES, STARS } from '@/consts/general'
import { createMaterial } from '@/app/(panel)/creator/material/_services/create'
import { toast } from 'sonner'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { useGetMaterial } from '@/features/queries/use-materiales'
import { updateMaterial } from '@/app/(panel)/creator/material/_services/update'
import { ViewImageInput } from '@/app/(panel)/_components/view-image-input'

export function MaterialForm() {
  const [key, setKey] = useState(+new Date())
  const [isPending, startTranstion] = useTransition()
  const { refresh, push } = useRouter()

  const params = useParams<{ id: string }>()
  const ITEM_ID = params?.id
  const IS_EDITING = !!ITEM_ID

  const { data: MATERIAL } = useGetMaterial(ITEM_ID)

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

  useEffect(() => {
    if (MATERIAL) {
      startTranstion(() => {
        setKey(+new Date())

        form.setValue('name', MATERIAL.name)
        form.setValue('description', MATERIAL.description)
        form.setValue('image_url', MATERIAL.image_url ?? '')
        form.setValue('rarity', MATERIAL.rarity)
        form.setValue('type', MATERIAL.type)
      })
    }
  }, [MATERIAL, form])

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateMaterial(values, ITEM_ID)

        if (status === 201) {
          toast.success(message)

          push('/panel/materials')
          refresh()
          return
        }

        toast.error(message)
        return
      }

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
      title={`${
        IS_EDITING
          ? 'Edita los campos del material'
          : '¿Deseas crear un nuevo material?'
      }`}
      description={`${
        IS_EDITING
          ? 'Ingresa los detalles del material.'
          : 'Ingresa los detalles del nuevo material. Haga clic en crear cuando haya terminado.'
      }`}
      formId='creator-material'
      isEditing={IS_EDITING}
      isLoading={isPending}
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
                      disabled={isPending}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
                    <ViewImageInput
                      placeholder='URL de la imagen'
                      disabled={isPending}
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
                  <FormMessage />
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
                      <SelectTrigger>
                        <SelectValue placeholder='Tipo de material' />
                      </SelectTrigger>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            name='description'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Descripción</FormLabel>
                <FormControl>
                  <TextEditor
                    key={key}
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
