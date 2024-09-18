import { CharacterItemProps } from './character-item.type'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { deleteCharacter } from '@/app/(panel)/editor/weapon/[name]/_services/delete'
import { useTransition } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import { useGetCharacterById } from '@/app/(panel)/editor/weapon/[name]/_queries/use-character'
import { Skeleton } from '@/components/ui/skeleton'
import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { formattedUrl } from '@/features/utils/formatted-names'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Image from 'next/image'

export function CharacterItem(props: CharacterItemProps) {
  const { id, character_id } = props

  const [isPending, startTransition] = useTransition()

  const { refetch } = useGetWeaponByName()
  const { data: CHARACTER, status } = useGetCharacterById({ id: character_id })

  const FORMATTED_NAME = formattedUrl(CHARACTER?.name)
  const URL = `/character/${FORMATTED_NAME}`

  const CHARACTER_SPLASH_ART = CHARACTER?.images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarity(CHARACTER?.rarity)

  const handleDelete = (characterId: string) => {
    startTransition(async () => {
      const { message, status } = await deleteCharacter(characterId)

      if (status === 201) {
        toast.success(message)
        refetch()
        return
      }

      toast.error(message)
    })
  }

  if (status === 'error') {
    return <Skeleton className='aspect-[2/3]' />
  }

  if (status === 'pending') {
    return <Skeleton className='aspect-[2/3]' />
  }

  return (
    <>
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
        disabled={isPending}
        onRefresh={refetch}
        onDelete={deleteCharacter}
        className='absolute bottom-3 right-3'
      >
        <Trash2 />
      </DeleteButton>

      {/* <Button
      disabled={isPending}
        onClick={() => handleDelete(id)}
        className='absolute bottom-3 right-3'
      >
        <Trash />
      </Button> */}
    </>
  )
}
