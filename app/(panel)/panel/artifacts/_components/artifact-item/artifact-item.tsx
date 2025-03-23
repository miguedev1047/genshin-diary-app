import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { ArtifactItemProps } from '@/app/(panel)/panel/artifacts/_components/artifact-item/artifact-item.type'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteArtifact } from '@/panel/artifacts/_services/delete'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function ArtifactItem(props: ArtifactItemProps) {
  const { name, rarity, image_url, id } = props

  const ARTIFACT = id
  const URL = `/editor/artifact/${ARTIFACT}`

  const ARTIFACT_IMAGE = image_url
  const RARITY_COLOR = getBorderColorByRarityHover(rarity)

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link
              href={URL}
              className={cn(
                'group/item flex aspect-1/1 overflow-hidden rounded-[1rem] border border-muted/30 bg-background transition relative',
                RARITY_COLOR
              )}
            >
              <Card className='size-full'>
                {ARTIFACT_IMAGE && (
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={ARTIFACT_IMAGE!}
                      alt={name}
                      width={1080}
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
      </TooltipProvider>

      <DeleteButton
        itemId={id}
        onDelete={deleteArtifact}
        className='absolute z-40 bottom-2 right-2 size-8 rounded-md!'
      >
        <Trash2 className='size-5' />
      </DeleteButton>
    </>
  )
}
