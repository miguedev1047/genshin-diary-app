import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SquareBox } from '@/components/square-box'
import { useGetMaterial } from '@/features/queries/index/use-materiales'
import { MaterialItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent/_components/material-item/material-item.type'
import { SpinLoaderSquareCard } from '@/components/spin-loaders'
import Image from 'next/image'

export function MaterialItem(props: MaterialItemProps) {
  const { material_id, quantity } = props
  const { data: MATERIAL, status } = useGetMaterial(material_id)
  
    if (status === 'pending') return <SpinLoaderSquareCard />
    if (status === 'error') return <SpinLoaderSquareCard />

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SquareBox className='cursor-pointer'>
            <Image
              priority
              src={MATERIAL?.image_url}
              alt={MATERIAL?.name}
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
          <p>{MATERIAL?.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
