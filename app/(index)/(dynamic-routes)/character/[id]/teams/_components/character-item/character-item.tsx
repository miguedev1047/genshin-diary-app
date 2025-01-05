'use client'

import { useGetCharacter } from '@/features/queries/index/use-characters'
import { CharacterItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/character-item/character-item.type'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { SpinAspectRatio } from '@/components/spin-loaders'
import Link from 'next/link'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, constellation } = props
  const { data: CHARACTER, status } = useGetCharacter(character_id)

  if (status === 'pending') return <SpinAspectRatio />
  if (status === 'error') return <SpinAspectRatio />

  if (!CHARACTER) return null

  const URL = `/character/${CHARACTER.id}`
  const CHARACTER_SPLASH_ART = CHARACTER.images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarityHover(CHARACTER.rarity)

  return (
    <Link
      href={URL}
      className={cn(
        'group/item flex aspect-[2/3] overflow-hidden rounded-[1rem] border bg-background transition relative',
        RARITY_COLOR
      )}
    >
      <Card className='size-full transition duration-200 ease-in-out'>
        {CHARACTER_SPLASH_ART && (
          <AspectRatio
            ratio={2 / 3}
            className='absolute translate-y-[4rem]'
          >
            <Image
              src={CHARACTER_SPLASH_ART}
              alt={CHARACTER.name}
              width={720}
              height={1080}
              priority
              className='object-cover w-full h-full transition-all duration-300 ease-in-out dark:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
            />
          </AspectRatio>
        )}

        <p className='absolute top-0 uppercase text-xl font-extrabold opacity-50 group-hover/item:opacity-100 z-20 w-full m-3 p-1 line-clamp-1'>
          {CHARACTER.name}
        </p>

        {constellation > 0 && (
          <Badge className='absolute bottom-0 m-2'>C{constellation}</Badge>
        )}
      </Card>
    </Link>
  )
}
