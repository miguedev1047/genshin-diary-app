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
import { STARS } from '@/consts/general'
import { Input } from '@/components/ui/input'
import { ArtifactSchema } from '@/schemas'
import { Star } from 'lucide-react'
import { FormCard } from '@/app/(panel)/_components/form-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createArtifact } from '@/app/(panel)/creator/artifact/_services/create'
import { TextEditor } from '@/app/(panel)/_components/text-editor'
import { updateArtifact } from '@/app/(panel)/creator/artifact/_services/update'
import { useGetArtifact } from '@/features/queries/panel/use-artifacts'
import { toast } from 'sonner'

export function ArtifactForm() {
  const [key, setKey] = useState(+new Date())
  const [isPending, startTranstion] = useTransition()
  const { refresh, push } = useRouter()

  const params = useParams<{ id: string }>()
  const ITEM_ID = params?.id
  const IS_EDITING = !!ITEM_ID

  const { data: ARTIFACT } = useGetArtifact(ITEM_ID)

  const form = useForm<z.infer<typeof ArtifactSchema>>({
    resolver: zodResolver(ArtifactSchema),
    defaultValues: {
      name: '',
      bonus_description: '',
      image_url: '',
      rarity: undefined,
    },
  })

  useEffect(() => {
    if (ARTIFACT) {
      startTranstion(() => {
        setKey(+new Date())

        form.setValue('name', ARTIFACT.name)
        form.setValue('bonus_description', ARTIFACT.bonus_description)
        form.setValue('image_url', ARTIFACT.image_url ?? '')
        form.setValue('rarity', ARTIFACT.rarity)
      })
    }
  }, [ARTIFACT, form])

  const handledSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateArtifact(values, ITEM_ID)

        if (status === 201) {
          toast.success(message)

          push('/panel/artifacts')
          refresh()
          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createArtifact(values)

      if (status === 201) {
        toast.success(message)

        push('/panel/artifacts')
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
          ? 'Edita los campos del artefacto'
          : '¿Deseas crear un nuevo artefacto?'
      }`}
      description={`${
        IS_EDITING
          ? 'Ingresa los detalles del artefacto.'
          : 'Ingresa los detalles del nuevo artefacto. Haga clic en crear cuando haya terminado.'
      }`}
      formId='creator-artifact'
      isEditing={IS_EDITING}
      isLoading={isPending}
    >
      <Form {...form}>
        <form
          onSubmit={handledSubmit}
          className='grid gap-4'
          id='creator-artifact'
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
                      placeholder='Nombre del artefacto'
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

          <FormField
            control={form.control}
            name='rarity'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rareza maxima</FormLabel>
                <Select
                  disabled={isPending}
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Seleciona una rareza' />
                      </SelectTrigger>
                    </FormControl>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Rareza maxima</SelectLabel>
                      <SelectSeparator />
                      {STARS.slice(0, 3).map(({ label, value }) => (
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
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name='bonus_description'
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
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormCard>
  )
}
