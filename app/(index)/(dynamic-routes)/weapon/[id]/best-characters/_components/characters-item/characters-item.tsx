'use client'

import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { CharacterItemProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/best-characters/_components/characters-item/characters-item.type'
import { getElementIcon } from '@/features/utils/character-texts'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { useGetData } from '@/features/providers/data-provider'
import Link from 'next/link'
import Image from 'next/image'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id } = props
  const { data } = useGetData()

  const { characters } = data
  const CHARACTER = characters?.find((material) => material.id === character_id)

  if (!CHARACTER) return null

  const URL = `/character/${character_id}`

  const CHARACTER_SPLASH_ART = CHARACTER.images?.splash_art_url ?? DEFAULT_IMAGE
  const RARITY_COLOR = getBorderColorByRarityHover(CHARACTER.rarity)
  const ELEMENT_ICON = getElementIcon(CHARACTER.element)?.src

  return (
    <Link
      href={URL}
      className={cn(
        'group/item flex aspect-[2/3] size-full overflow-hidden rounded-[1rem] border bg-background transition relative',
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

        <div className='flex justify-end absolute bottom-2 inset-x-0 px-2'>
          <SquareBox
            size='default'
            className='rounded-full size-8'
          >
            <Image
              priority
              src={ELEMENT_ICON ?? DEFAULT_IMAGE}
              width={64}
              height={64}
              alt={CHARACTER.name}
              className='size-full object-cover'
            />
          </SquareBox>
        </div>
      </Card>
    </Link>
  )
}
