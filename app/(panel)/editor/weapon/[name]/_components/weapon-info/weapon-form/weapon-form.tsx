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
import { Textarea } from '@/components/ui/textarea'
import { updateWeapon } from '@/app/(panel)/editor/weapon/[name]/_services/update'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { ATTRIBUTES, STARS, WEAPON_TYPE } from '@/consts/general'
import { useForm } from 'react-hook-form'
import { useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { WeaponSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Star } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { formattedUrl } from '@/features/utils/formatted-names'
import { Button } from '@/components/ui/button'
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
import { ScrollArea } from '@/components/ui/scroll-area'

export function WeaponForm() {
    const { data: WEAPON } = useGetWeaponByName()
    const WEAPON_ID = WEAPON?.id
  
    const [isPending, startTransition] = useTransition()
    const { refresh, replace } = useRouter()
  
    const form = useForm<z.infer<typeof WeaponSchema>>({
      resolver: zodResolver(WeaponSchema),
      defaultValues: {
        base_attack: WEAPON?.base_attack.toString(),
        image_url: WEAPON?.image_url!,
        name: WEAPON?.name,
        rarity: WEAPON?.rarity,
        main_stat: WEAPON?.main_stat,
        type: WEAPON?.type,
        passive_description: WEAPON?.passive_description,
      },
    })
  
    const handleSubmit = form.handleSubmit((values) => {
      startTransition(async () => {
        const NEW_NAME = formattedUrl(values.name)
  
        const { status, message } = await updateWeapon(values, WEAPON_ID)
        if (status === 201) {
          toast.success(message)
  
          replace(`/editor/weapon/${NEW_NAME}`)
          refresh()
          return
        }
  
        toast.error(message)
      })
    })
  
    return (
      <Sheet>
        <SheetTrigger>
          <Button size='icon'>
            <Pencil />
          </Button>
        </SheetTrigger>
        <SheetContent className='sm:max-w-[640px]'>
          <SheetHeader>
            <SheetTitle>Editar arma</SheetTitle>
            <SheetDescription>Edita la información de la arma.</SheetDescription>
          </SheetHeader>
  
          <ScrollArea className='w-full h-[800px]'>
            <Form {...form}>
              <form
                id='editor-weapon'
                onSubmit={handleSubmit}
                className='grid gap-4 px-1'
              >
                <FormField
                  control={form.control}
                  name='name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nombre</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isPending}
                          placeholder='Nombre del arma'
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
  
                <FormField
                  control={form.control}
                  name='passive_description'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pasiva</FormLabel>
                      <FormControl>
                        <Textarea
                          disabled={isPending}
                          placeholder='Descripción de la pasiva'
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
              </form>
            </Form>
          </ScrollArea>
  
          <SheetFooter>
            <SheetClose asChild>
              <Button
                form='editor-weapon'
                type='submit'
                disabled={isPending}
                className='mt-6'
              >
                Guardar
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    )
  }