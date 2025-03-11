'use client'

import { Card } from '@/components/ui/card'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { formattedUrl } from '@/features/utils/formatted-names'
import { TierCharacterItemProps } from '@/app/(panel)/panel/tierlist/_components/tier-character-item/tier-character-item.type'
import { deleteCharacterTier } from '@/app/(panel)/panel/tierlist/_services/delete'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { Trash2 } from 'lucide-react'
import { useGetData } from '@/features/providers/data-provider'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { useRouter } from 'next/navigation'

export function TierCharacterItem(props: TierCharacterItemProps) {
  const { character_id, id } = props
  const { push } = useRouter() 

  const { data } = useGetData()
  const { characters: CHARACTERS } = data

  const CHARACTER = CHARACTERS?.find((item) => item.id === character_id)
  if (!CHARACTER) return null

  const URL = `/editor/character/${character_id}`

  const CHARACTER_SPLASH_ART = CHARACTER.images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarityHover(CHARACTER.rarity)

  return (
    <Card
      className={cn(
        'size-full transition duration-200 ease-in-out overflow-hidden',
        RARITY_COLOR
      )}
      onClick={() => push(URL)}
    >
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

      <div className='absolute bottom-4 right-4 flex gap-2'>
        <DeleteButton
          onDelete={deleteCharacterTier}
          itemId={id}
        >
          <Trash2 />
        </DeleteButton>
        
        <SortableList.DragHandle />
      </div>
    </Card>
  )
}
