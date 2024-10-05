import { CharacterItemProps } from '@/app/(panel)/editor/weapon/[name]/best-characters/_components/character-item/character-item.type'
import { useGetCharacter } from '@/features/queries/panel/use-characters'
import { Skeleton } from '@/components/ui/skeleton'
import { formattedUrl } from '@/features/utils/formatted-names'
import { Card } from '@/components/ui/card'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { deleteCharacter } from '@/app/(panel)/editor/weapon/[name]/best-characters/_services/delete'
import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { Trash2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, id } = props

  const { data: CHARACTER, status } = useGetCharacter(character_id)

  if (status !== 'success') {
    return <Skeleton className='aspect-[2/3]' />
  }

  const FORMATTED_NAME = formattedUrl(CHARACTER?.name)
  const URL = `/editor/character/${FORMATTED_NAME}`

  const CHARACTER_SPLASH_ART = CHARACTER?.images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarity(CHARACTER?.rarity)

  return (
    <>
      <Link
        href={URL}
        className={cn(
          'group/item flex aspect-[2/3] overflow-hidden rounded-[1rem] border bg-background transition relative',
          RARITY_COLOR
        )}
      >
        <Card className='size-full'>
          {CHARACTER_SPLASH_ART && (
            <AspectRatio
              ratio={2 / 3}
              className='absolute translate-y-[4rem]'
            >
              <Image
                src={CHARACTER_SPLASH_ART}
                alt={CHARACTER?.name}
                width={720}
                height={1080}
                priority
                className='object-cover w-full h-full transition-all duration-300 ease-in-out dark:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
              />
            </AspectRatio>
          )}

          <p className='absolute top-0 uppercase text-xl font-extrabold opacity-50 group-hover/item:opacity-100 z-20 w-full m-3 p-1 line-clamp-1'>
            {CHARACTER?.name}
          </p>
        </Card>
      </Link>

      <DeleteButton
        itemId={id}
        onDelete={deleteCharacter}
        className='absolute bottom-3 right-3 z-20'
      >
        <Trash2 />
      </DeleteButton>
    </>
  )
}
