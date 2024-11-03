import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
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
import { ConstellationFormProps } from '@/editor/character/[name]/teams/_components/constellation-form/constellation-form.type'
import { CONSTELLATION_TYPE, DEFAULT_IMAGE } from '@/consts/general'
import { useState, useTransition } from 'react'
import { updateCharacterConstellation } from '@/editor/character/[name]/teams/_services/update'
import { useRouter } from 'next/navigation'
import { SquareBox } from '@/shared/components/square-box'
import { toast } from 'sonner'
import Image from 'next/image'

export function ConstellationForm(props: ConstellationFormProps) {
  const { data: CHARACTER, itemId, constellation } = props

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)

  const { refresh } = useRouter()

  const handleChangeState = (value: string) => {
    startTransition(async () => {
      const { status, message } = await updateCharacterConstellation(
        Number(value),
        itemId
      )

      if (status === 201) {
        toast.success(message)
        setIsOpen(false)
        refresh()

        return
      }

      toast.error(message)
    })
  }

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <PopoverTrigger asChild>
        <SquareBox
          size='sm'
          className='hover:scale-110 transition-transform ease-in-out duration-200 cursor-pointer'
        >
          <Image
            src={CHARACTER?.images?.splash_art_url ?? DEFAULT_IMAGE}
            alt={CHARACTER?.name ?? 'Character Image'}
            width={1080}
            height={1080}
            className='object-cover size-full'
          />
        </SquareBox>
      </PopoverTrigger>
      <PopoverContent className='w-80'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Constelación</h4>
            <p className='text-sm text-muted-foreground'>
              Establece el nivel de constelación del personaje.
            </p>
          </div>

          <Select
            disabled={isPending}
            defaultValue='0'
            value={constellation?.toString()}
            onValueChange={handleChangeState}
          >
            <SelectTrigger>
              <SelectValue placeholder='Selecciona una constelación' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Constelación</SelectLabel>
                <SelectSeparator />
                {CONSTELLATION_TYPE.map(({ label, value }) => (
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
        </div>
      </PopoverContent>
    </Popover>
  )
}
