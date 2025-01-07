import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { WeaponItemProps } from '@/app/(index)/(routes)/weapons/_components/weapon-item/weapon-item.type'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export function WeaponItem(props: WeaponItemProps) {
  const { image_url, name, rarity, id } = props

  const WEAPON_ID = id
  const URL = `/weapon/${WEAPON_ID}`

  const WEAPON_IMAGE = image_url
  const STAR_COLOR = getBorderColorByRarityHover(rarity)

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            href={URL}
            className={cn(
              'group/item flex aspect-[1/1] overflow-hidden rounded-[1rem] border border-muted/30 bg-background transition relative',
              STAR_COLOR
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
                    className='object-cover w-full h-full transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
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
    </TooltipProvider>
  )
}
