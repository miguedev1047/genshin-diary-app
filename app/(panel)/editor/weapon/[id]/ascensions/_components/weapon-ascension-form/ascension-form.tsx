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
import { ASCENSION_LEVEL } from '@/consts/general'
import { WeaponAscensionSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { MaterialSelector } from '@/app/(panel)/editor/weapon/[id]/ascensions/_components/material-selector'
import { Suspense, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createWeaponAscension } from '@/app/(panel)/editor/weapon/[id]/ascensions/_services/create'
import { useGetWeapon } from '@/app/(panel)/editor/weapon/[id]/provider'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { SpinLoaderInput } from '@/components/spin-loaders'

export function WeaponAscensionForm() {
  const [isPending, startTransition] = useTransition()

  const { data: WEAPON } = useGetWeapon()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const DISABLED_ASCENSIONS = WEAPON?.ascensions
    .filter((c) => c.weapon_id === WEAPON?.id)
    .map((c) => c.ascension_level)

  const form = useForm<z.infer<typeof WeaponAscensionSchema>>({
    resolver: zodResolver(WeaponAscensionSchema),
    defaultValues: {
      ascension_level: undefined,
      materials: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await createWeaponAscension(
        values,
        WEAPON?.id
      )

      if (status === 201) {
        toast.success(message)
        form.reset()
        setIsOpen(false)
        refresh()

        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Ascensión de arma'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isLoading={isPending}
      formId='weapon-ascension-form'
    >
      <Form {...form}>
        <form
          id='weapon-ascension-form'
          onSubmit={handleSubmit}
          className='grid gap-4 px-1 py-4'
        >
          <FormField
            name='ascension_level'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ascensión</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona una ascensión' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Ascensiones</SelectLabel>
                      <SelectSeparator />

                      {ASCENSION_LEVEL.slice(0, 6).map(({ label, value }) => (
                        <SelectItem
                          key={value}
                          value={value}
                          disabled={DISABLED_ASCENSIONS?.includes(value)}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />

          <FormField
            name='materials'
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Materiales</FormLabel>
                <FormControl>
                  <Suspense fallback={<SpinLoaderInput />}>
                    <MaterialSelector {...field} />
                  </Suspense>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormSheet>
  )
}
