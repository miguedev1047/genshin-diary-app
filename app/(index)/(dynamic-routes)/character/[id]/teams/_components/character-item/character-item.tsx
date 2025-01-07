'use client'

import { useGetCharacter } from '@/features/queries/index/use-characters'
import { CharacterItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/character-item/character-item.type'
import { cn } from '@/lib/utils'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { SpinLoaderSquareCard } from '@/components/spin-loaders'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import Link from 'next/link'
import Image from 'next/image'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, constellation } = props
  const { data: CHARACTER, status } = useGetCharacter(character_id)

  if (status === 'pending') return <SpinLoaderSquareCard fullSize />
  if (status === 'error') return <SpinLoaderSquareCard fullSize />

  if (!CHARACTER) return null

  const URL = `/character/${CHARACTER.id}`
  const PROFILE_IMG_URL = CHARACTER.images?.profile_image_url
  const RARITY_COLOR = getBorderColorByRarityHover(CHARACTER.rarity)

  return (
    <Link
      href={URL}
      className={cn(
        'group/item flex overflow-hidden rounded-[1rem] border bg-background transition relative aspect-square',
        RARITY_COLOR
      )}
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SquareBox size='full'>
              <Image
                priority
                src={PROFILE_IMG_URL ?? DEFAULT_IMAGE}
                alt={CHARACTER.name}
                width={720}
                height={1080}
                className='object-cover size-full'
              />
            </SquareBox>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>{CHARACTER.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {constellation > 0 && (
        <Badge className='absolute bottom-2 left-2'>C{constellation}</Badge>
      )}
    </Link>
  )
}
