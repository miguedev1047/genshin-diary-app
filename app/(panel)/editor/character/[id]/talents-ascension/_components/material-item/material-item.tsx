import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form'
import { z } from 'zod'
import { updateTalentAscensionMaterialQuantity } from '@/app/(panel)/editor/character/[id]/talents-ascension/_services/update'
import { useRouter } from 'next/navigation'
import { MaterialQuantitySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { MaterialItemProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-item/material-item.type'
import { SquareBox } from '@/components/square-box'
import { useGetData } from '@/features/providers/data-provider'
import { DEFAULT_IMAGE } from '@/consts/misc'
import Image from 'next/image'

export function MaterialItem(props: MaterialItemProps) {
  const { id, material_id, quantity } = props
  const { data } = useGetData()

  const { materials } = data
  const MATERIAL = materials?.find((item) => item.id === material_id)

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof MaterialQuantitySchema>>({
    resolver: zodResolver(MaterialQuantitySchema),
    defaultValues: {
      quantity: quantity.toString(),
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await updateTalentAscensionMaterialQuantity(
        values,
        id
      )

      if (status === 201) {
        toast.success(message)
        setIsOpen(false)
        refresh()
        return
      }

      toast.error(message)
    })
  })

  if (!MATERIAL) return null

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <TooltipProvider>
        <Tooltip>
          <PopoverTrigger asChild>
            <TooltipTrigger asChild>
              <SquareBox className='cursor-pointer transition hover:scale-105 ease-in-out duration-300'>
                <Image
                  priority
                  src={MATERIAL.image_url ?? DEFAULT_IMAGE}
                  alt={MATERIAL.name}
                  width={720}
                  height={720}
                  className='object-contain size-full'
                />
                <div className='absolute inset-x-0 bottom-0 g-black/70b supports-backdrop-filter:bg-background/60 py-1 flex items-center justify-center z-20'>
                  <p>{quantity}</p>
                </div>
              </SquareBox>
            </TooltipTrigger>
          </PopoverTrigger>
          <TooltipContent side='bottom'>
            <p>{MATERIAL.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent side='bottom'>
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
                        type='number'
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
      </PopoverContent>
    </Popover>
  )
}
