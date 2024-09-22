import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { Input } from '@/components/ui/input'
import { MaterialQuantitySchema } from '@/schemas'
import { MaterialFormProps } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-ascension/material-form/material-form.type'
import { updateMaterialQuantity } from '@/app/(panel)/editor/weapon/[name]/_services/update'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'

export function MaterialForm(props: MaterialFormProps) {
  const {
    data: { quantity, id: material_id },
  } = props

  const { refetch } = useGetWeaponByName()
  const [isPending, startTranstion] = useTransition()

  const form = useForm<z.infer<typeof MaterialQuantitySchema>>({
    resolver: zodResolver(MaterialQuantitySchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await updateMaterialQuantity(
        values,
        material_id
      )

      if (status === 201) {
        toast.success(message)
        refetch()
        return
      }

      toast.error(message)
    })
  })

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          name='quantity'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <div className='grid grid-cols-3 items-center gap-4'>
                <FormLabel>Cantidad</FormLabel>
                <FormControl>
                  <Input
                    disabled={isPending}
                    placeholder='0'
                    className='col-span-2 h-8'
                    {...field}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
