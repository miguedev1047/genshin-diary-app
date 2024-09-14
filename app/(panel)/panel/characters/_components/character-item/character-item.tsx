import { CharacterItemProps } from './character-item.type'
import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { formattedUrl } from '@/features/utils/formatted-names'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function CharacterItem(props: CharacterItemProps) {
  const { attribute, images, name, rarity, role, is_new, is_public } = props

  const FORMATTED_NAME = formattedUrl(name)
  const URL = `/character/${FORMATTED_NAME}`

  const CHARACTER_SPLASH_ART = images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarity(rarity)

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
              alt={name}
              width={720}
              height={1080}
              priority
              className='object-cover w-full h-full transition-all duration-300 ease-in-out dark:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
            />
          </AspectRatio>
        )}

        <p className='absolute top-0 uppercase text-xl font-extrabold opacity-50 group-hover/item:opacity-100 z-20 w-full m-3 p-1 line-clamp-1'>
          {name}
        </p>
      </Card>
    </Link>
  )
}
