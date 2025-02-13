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
import { MaterialItemProps } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-item/material-item.type'
import { useGetMaterial } from '@/features/queries/panel/use-materiales'
import { MaterialForm } from '@/app/(panel)/editor/character/[id]/ascensions/_components/material-form'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'

export function MaterialItem(props: MaterialItemProps) {
  const { material_id, quantity } = props
  const { data: MATERIAL } = useGetMaterial(material_id)

  return (
    <Popover>
      <TooltipProvider>
        <Tooltip>
          <PopoverTrigger asChild>
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
          </PopoverTrigger>
          <TooltipContent side='bottom'>
            <p>{MATERIAL?.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <PopoverContent side='bottom'>
        <MaterialForm {...props} />
      </PopoverContent>
    </Popover>
  )
}
