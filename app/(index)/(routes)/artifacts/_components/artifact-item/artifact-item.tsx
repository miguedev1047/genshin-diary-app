import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArtifactItemProps } from '@/app/(index)/(routes)/artifacts/_components/artifact-item/artifact-item.type'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { SquareBox } from '@/components/square-box'
import { Title } from '@/components/ui/title'
import { TiptapPreview } from '@/components/tiptap'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

export function ArtifactItem(props: ArtifactItemProps) {
  const { bonus_description, name, image_url, rarity } = props

  const ARTIFACT_IMAGE = image_url
  const RARITY_COLOR = getBorderColorByRarityHover(rarity)

  return (
    <Tooltip>
      <Dialog>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <div
              className={cn(
                'group/item flex aspect-1/1 overflow-hidden rounded-[1rem] border border-muted/30 bg-background transition relative cursor-pointer select-none',
                RARITY_COLOR
              )}
            >
              <Card className='size-full transition duration-200 ease-in-out'>
                {ARTIFACT_IMAGE && (
                  <AspectRatio ratio={1 / 1}>
                    <Image
                      src={ARTIFACT_IMAGE!}
                      alt={name}
                      width={720}
                      height={1080}
                      priority
                      className='object-contain w-full h-full transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
                    />
                  </AspectRatio>
                )}
              </Card>
            </div>
          </DialogTrigger>
        </TooltipTrigger>
        <DialogContent
          closeButton={false}
          className='max-w-[720px]'
        >
          <DialogHeader>
            <div className='flex justify-between items-center gap-4'>
              <Title className='max-w-40 md:max-w-64 font-bold text-lg md:text-2xl w-full text-start text-balance'>
                {name}
              </Title>

              <SquareBox size='default'>
                <Image
                  src={ARTIFACT_IMAGE!}
                  alt={name}
                  width={720}
                  height={1080}
                  priority
                  className='object-contain size-full'
                />
              </SquareBox>
            </div>
          </DialogHeader>

          <div>
            <TiptapPreview
              content={bonus_description}
              className='text-sm md:text-base'
            />
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button>Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <TooltipContent side='bottom'>
        <p>{name}</p>
      </TooltipContent>
    </Tooltip>
  )
}
