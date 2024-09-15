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
import { STARS } from '@/consts/general'
import { InputBlock } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ArtifactSchema } from '@/schemas'
import { Star } from 'lucide-react'
import { FormCard } from '@/shared/layouts/panel/form-card'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createArtifact } from '@/app/(panel)/creator/artifact/_service/create'
import { toast } from 'sonner'

export function CreatorArtifactForm() {
  const [isPending, startTranstion] = useTransition()
  const { refresh, push } = useRouter()

  const form = useForm<z.infer<typeof ArtifactSchema>>({
    resolver: zodResolver(ArtifactSchema),
    defaultValues: {
      name: '',
      bonus_description: '',
      image_url: '',
      rarity: undefined,
    },
  })

  const handledSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
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
      title='¿Deseas crear un nuevo artefacto?'
      description='Ingresa los detalles del nuevo artefacto. Haga clic en crear cuando haya terminado.'
      formId='creator-artifact'
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
                    <InputBlock
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
                    <InputBlock
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
            name='bonus_description'
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
