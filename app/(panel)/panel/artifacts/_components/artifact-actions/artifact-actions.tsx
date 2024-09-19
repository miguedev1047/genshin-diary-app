'use client'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { ArtifactActionsProps } from '@/app/(panel)/panel/artifacts/_components/artifact-actions/artifact-actions.type'
import { STARS } from '@/consts/general'
import { Star } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/consts/general'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { updateArtifact } from '@/app/(panel)/panel/artifacts/_services/update'
import { deleteArtifact } from '@/app/(panel)/panel/artifacts/_services/delete'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { ArtifactSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function ArtifactActions(props: ArtifactActionsProps) {
  const { name, bonus_description, image_url, id: artifact_id, rarity } = props

  const { refresh } = useRouter()
  const [isPending, startTranstion] = useTransition()

  const form = useForm<z.infer<typeof ArtifactSchema>>({
    resolver: zodResolver(ArtifactSchema),
    defaultValues: {
      name: name,
      image_url: image_url ?? DEFAULT_IMAGE,
      bonus_description: bonus_description,
      rarity: rarity,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await updateArtifact(values, artifact_id)

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  const handleDelete = (artifact_id: string) => {
    startTranstion(async () => {
      const { status, message } = await deleteArtifact(artifact_id)

      if (status === 201) {
        toast.success(message)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return (
    <Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            disabled={isPending}
            size='icon'
            className='absolute bottom-3 right-3 z-40'
          >
            <Settings2 />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='p-2'
        >
          <DropdownMenuLabel>Acciones</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <SheetTrigger asChild>
            <DropdownMenuItem>Editar</DropdownMenuItem>
          </SheetTrigger>
          <DropdownMenuItem onClick={() => handleDelete(artifact_id)}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Editar artefacto</SheetTitle>
          <SheetDescription>
            Edita los campos del artefacto. Cuando finalices guarda los cambios.
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              onSubmit={handleSubmit}
              id='actions-form'
              className='grid gap-4 px-1'
            >
              <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        disabled={isPending}
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
                        disabled={isPending}
                        placeholder='Https://example.com/image.png'
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
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              type='submit'
              disabled={isPending}
              form='actions-form'
            >
              Guardar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
