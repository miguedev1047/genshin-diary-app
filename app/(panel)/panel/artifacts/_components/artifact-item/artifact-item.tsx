import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArtifactItemProps } from '@/app/(panel)/panel/artifacts/_components/artifact-item/artifact-item.type'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { ArtifactActions } from '@/app/(panel)/panel/artifacts/_components/artifact-actions'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function ArtifactItem(props: ArtifactItemProps) {
  const { name, rarity, image_url } = props

  const ARTIFACT_IMAGE = image_url
  const STAR_COLOR = getBorderColorByRarity(rarity)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div
              className={cn(
                'group/item flex aspect-[1/1] overflow-hidden rounded-[1rem] border border-muted/30 bg-background transition relative',
                STAR_COLOR
              )}
            >
              <Card className='size-full'>
                {ARTIFACT_IMAGE && (
                  <AspectRatio
                    ratio={1 / 1}
                    className='p-8'
                  >
                    <Image
                      src={ARTIFACT_IMAGE!}
                      alt={name}
                      width={720}
                      height={1080}
                      priority
                      className='dark:grayscale object-cover w-full h-full transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
                    />
                  </AspectRatio>
                )}
              </Card>
            </div>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>{name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <ArtifactActions {...props} />
    </>
  )
}
