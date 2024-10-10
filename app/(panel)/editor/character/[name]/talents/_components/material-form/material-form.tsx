import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import { updateTalentMaterialQuantity } from '@/editor/character/[name]/talents/_services/update'
import { MaterialQuantitySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { MaterialFormProps } from '@/editor/character/[name]/ascensions/_components/material-form/material-form.type'

export function MaterialForm(props: MaterialFormProps) {
  const { id: material_id, quantity } = props

  const [isPending, startTranstion] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof MaterialQuantitySchema>>({
    resolver: zodResolver(MaterialQuantitySchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTranstion(async () => {
      const { status, message } = await updateTalentMaterialQuantity(
        values,
        material_id
      )

      if (status === 201) {
        toast.success(message)
        refresh()
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
                    className='col-span-2'
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
