import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { MaterialItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/_components/material-item/material-item.type'
import { SquareBox } from '@/components/square-box'
import { useGetData } from '@/features/providers/data-provider'
import { DEFAULT_IMAGE } from '@/consts/misc'
import Image from 'next/image'

export function MaterialItem(props: MaterialItemProps) {
  const { material_id, quantity } = props
  const { data } = useGetData()

  const { materials } = data
  const MATERIAL = materials?.find((material) => material.id === material_id)

  if (!MATERIAL) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SquareBox className='cursor-pointer'>
            <Image
              priority
              src={MATERIAL.image_url ?? DEFAULT_IMAGE}
              alt={MATERIAL.name}
              width={720}
              height={720}
              className='object-contain size-full'
            />
            <div className='absolute inset-x-0 bottom-0 g-black/70b supports-[backdrop-filter]:bg-background/60 py-1 flex items-center justify-center z-20'>
              <p>{quantity}</p>
            </div>
          </SquareBox>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>{MATERIAL.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
