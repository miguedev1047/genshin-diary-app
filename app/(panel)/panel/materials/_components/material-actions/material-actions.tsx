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
import { MaterialActionsProps } from '@/app/(panel)/panel/materials/_components/material-actions/material-actions.type'
import { MATERIAL_TYPES, STARS } from '@/consts/general'
import { deleteMaterial } from '@/app/(panel)/panel/materials/_services/delete'
import { updateMaterial } from '@/app/(panel)/panel/materials/_services/update'
import { Star } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/consts/general'
import { useRouter } from 'next/navigation'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Settings2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { MaterialSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'

export function MaterialActions(props: MaterialActionsProps) {
  const { name, description, type, image_url, id: material_id, rarity } = props

  const { refresh } = useRouter()
  const [isPending, startTranstion] = useTransition()

  const form = useForm<z.infer<typeof MaterialSchema>>({
    resolver: zodResolver(MaterialSchema),
    defaultValues: {
      name: name,
      image_url: image_url ?? DEFAULT_IMAGE,
      description: description,
      type: type,
      rarity: rarity,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await updateMaterial(values, material_id)

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
      const { status, message } = await deleteMaterial(artifact_id)

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
          <DropdownMenuItem onClick={() => handleDelete(material_id)}>
            Eliminar
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Editar material</SheetTitle>
          <SheetDescription>
            Edita los campos del material. Cuando finalices guarda los cambios.
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
                            <SelectValue placeholder='Selecciona una rareza' />
                          </SelectTrigger>
                        </FormControl>
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

              <FormField
                name='description'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Descripcion</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder='Descripción del material'
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
