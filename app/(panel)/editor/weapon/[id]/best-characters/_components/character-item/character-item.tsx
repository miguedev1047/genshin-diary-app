import { CharacterItemProps } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-item/character-item.type'
import { Card } from '@/components/ui/card'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { deleteCharacter } from '@/app/(panel)/editor/weapon/[id]/best-characters/_services/delete'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { Trash2 } from 'lucide-react'
import { useGetData } from '@/features/providers/data-provider'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, id } = props
  const { data } = useGetData()

  const { characters } = data
  const CHARACTER = characters?.find((material) => material.id === character_id)
  const { name } = CHARACTER!

  if (!CHARACTER) return null

  const CHARACTER_ID = CHARACTER.id
  const URL = `/editor/character/${CHARACTER_ID}`

  const CHARACTER_SPLASH_ART = CHARACTER?.images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarityHover(CHARACTER?.rarity)

  return (
    <>
      <Link
        href={URL}
        className={cn(
          'group/item flex aspect-2/3 overflow-hidden rounded-[1rem] border bg-background transition relative',
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
                alt={name}
                width={720}
                height={1080}
                priority
                className='object-cover w-full h-full transition-all duration-300 ease-in-out dark:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
              />
            </AspectRatio>
          )}

          <p className='writing-vertical absolute top-3 right-1 uppercase text-xl  md:text-2xl font-extrabold opacity-50 group-hover/item:opacity-100 z-20 line-clamp-1'>
            {name}
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
