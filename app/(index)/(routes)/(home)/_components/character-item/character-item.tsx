import { CharacterItemProps } from '@/app/(panel)/panel/characters/_components/character-item/character-item.type'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { getElementIcon } from '@/features/utils/character-texts'
import { cn } from '@/lib/utils'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Badge } from '@/components/ui/badge'
import Image from 'next/image'
import Link from 'next/link'

export function CharacterItem(props: CharacterItemProps) {
  const { images, name, rarity, is_new, element, id } = props

  const URL = `/character/${id}`
  
  const CHARACTER_SPLASH_ART = images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarityHover(rarity)
  const ELEMENT_ICON = getElementIcon(element)

  return (
    <Link
      href={URL}
      className={cn(
        'group/item flex aspect-2/3 overflow-hidden rounded-[1rem] border bg-background transition relative',
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
              alt={name}
              width={720}
              height={1080}
              loading='lazy'
              className='object-cover size-full transition-all duration-300 ease-in-out dark:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
            />
          </AspectRatio>
        )}

        <p className='writing-vertical absolute top-3 right-1 uppercase text-xl  md:text-2xl font-extrabold opacity-50 group-hover/item:opacity-100 z-20 line-clamp-1'>
          {name}
        </p>

        <div
          className={cn(
            'flex items-center absolute bottom-2 inset-x-0 px-2',
            is_new ? 'justify-between' : 'justify-end'
          )}
        >
          {is_new && <Badge className='bg-green-500'>Nuevo</Badge>}

          <SquareBox
            size='default'
            className='rounded-full size-8'
          >
            <Image
              priority
              src={ELEMENT_ICON ?? DEFAULT_IMAGE}
              width={64}
              height={64}
              alt={name}
              className='size-full object-cover'
            />
          </SquareBox>
        </div>
      </Card>
    </Link>
  )
}
