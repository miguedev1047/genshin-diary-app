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
import { useEffect, useMemo, useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { createWeaponAscension } from '@/app/(panel)/editor/weapon/[id]/ascensions/_services/create'
import { useGetWeapon } from '@/features/providers/weapon-provider'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { WeaponAscensionFormProps } from './ascension-form.type'
import { updateWeaponAscensionMaterials } from '../../_services/update'

const MAX_MATERIALS = 4

const ERR_MATERIAL_LIST = `No puedes añadir mas de ${MAX_MATERIALS} materiales!`

export function WeaponAscensionForm(props: WeaponAscensionFormProps) {
  const { id: ASCENSION_ID } = props
  const { data: WEAPON } = useGetWeapon()

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const ASCENSIONS = useMemo(() => WEAPON?.ascensions ?? [], [WEAPON])

  const DISABLED_ASCENSIONS = WEAPON?.ascensions
    .filter((c) => c.weapon_id === WEAPON?.id)
    .map((c) => c.ascension_level)

  const IS_EDITING = !!ASCENSION_ID

  const form = useForm<z.infer<typeof WeaponAscensionSchema>>({
    resolver: zodResolver(WeaponAscensionSchema),
    defaultValues: {
      ascension_level: undefined,
      materials: [],
    },
  })

  useEffect(() => {
    if (IS_EDITING && isOpen) {
      const ASCENSION = ASCENSIONS.find((i) => i.id === ASCENSION_ID)
      const MATERIALS = ASCENSION?.materials.map((i) => i.material_id)

      if (!MATERIALS || !ASCENSION) return

      form.setValue('ascension_level', ASCENSION?.ascension_level)
      form.setValue('materials', MATERIALS as never)
      return
    }
  }, [form, IS_EDITING, ASCENSIONS, ASCENSION_ID, isOpen])

  const handleSubmit = form.handleSubmit((values) => {
    const WEAPON_ID = WEAPON?.id

    const ASCENSION_ITEMS = values.materials.length > MAX_MATERIALS
    if (ASCENSION_ITEMS) return toast.error(ERR_MATERIAL_LIST)

    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateWeaponAscensionMaterials(
          values,
          WEAPON_ID,
          ASCENSION_ID
        )

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()

          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createWeaponAscension(
        values,
        WEAPON_ID,
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
      isEditing={IS_EDITING}
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
                  disabled={isPending}
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
                  <MaterialSelector {...field} />
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
