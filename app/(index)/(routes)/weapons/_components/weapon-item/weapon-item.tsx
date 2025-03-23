import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { WeaponItemProps } from '@/app/(index)/(routes)/weapons/_components/weapon-item/weapon-item.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function WeaponItem(props: WeaponItemProps) {
  const { image_url, name, rarity, id } = props

  const URL = `/weapon/${id}`

  const WEAPON_IMAGE = image_url
  const RARITY_COLOR = getBorderColorByRarityHover(rarity)

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Link
          href={URL}
          className={cn(
            'group/item flex aspect-1/1 overflow-hidden rounded-[1rem] border border-muted/30 bg-background transition relative select-none',
            RARITY_COLOR
          )}
        >
          <Card className='size-full transition duration-200 ease-in-out'>
            {WEAPON_IMAGE && (
              <AspectRatio ratio={1 / 1}>
                <Image
                  src={WEAPON_IMAGE!}
                  alt={name}
                  width={720}
                  height={1080}
                  priority
                  className='object-contain w-full h-full transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
                />
              </AspectRatio>
            )}
          </Card>
        </Link>
      </TooltipTrigger>
      <TooltipContent side='bottom'>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
