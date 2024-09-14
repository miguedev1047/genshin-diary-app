import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { MaterialItemProps } from '@/app/(panel)/panel/materials/_components/material-item/material-item.type'
import { formattedUrl } from '@/features/utils/formatted-names'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export function MaterialItem(props: MaterialItemProps) {
  const { name, rarity, image_url } = props

  const FORMATTED_NAME = formattedUrl(name)
  const URL = `/editor/material/${FORMATTED_NAME}`

  const MATERIAL_IMAGE = image_url
  const STAR_COLOR = getBorderColorByRarity(rarity)

  return (
    <>
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
                {MATERIAL_IMAGE && (
                  <AspectRatio
                    ratio={1 / 1}
                    className='p-6'
                  >
                    <Image
                      src={MATERIAL_IMAGE!}
                      alt={name}
                      width={720}
                      height={1080}
                      priority
                      className='dark:grayscale object-cover w-full h-full transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
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
    </>
  )
}
