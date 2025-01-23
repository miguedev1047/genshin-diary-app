'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { WeaponItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-item/artifact-set-item.type'
import { Title } from '@/components/ui/title'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { useGetData } from '@/features/providers/data-provider'
import Image from 'next/image'
import parse from 'html-react-parser'

export function WeaponItem(props: WeaponItemProps) {
  const { weapon_id } = props
  const { data } = useGetData()

  const { weapons } = data
  const WEAPON = weapons?.find((weapon) => weapon.id === weapon_id)

  if (!WEAPON) return null

  const STAR_COLOR = getBorderColorByRarityHover(WEAPON.rarity)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card
          className={cn(
            'flex items-center gap-4 p-4 border transition duration-200 ease-in-out',
            STAR_COLOR
          )}
        >
          <SquareBox size='sm'>
            <Image
              src={WEAPON.image_url ?? DEFAULT_IMAGE}
              alt={WEAPON.name ?? 'WEAPON Image'}
              width={1080}
              height={1080}
              className='object-contain size-full'
            />
          </SquareBox>
          <Title>{WEAPON.name}</Title>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className='w-[480px]'>
        <article className='space-y-4'>
          <div className='flex items-center gap-4'>
            <SquareBox size='sm'>
              <Image
                src={WEAPON.image_url ?? DEFAULT_IMAGE}
                alt={WEAPON.name ?? 'WEAPON Image'}
                width={1080}
                height={1080}
                className='object-contain size-full'
              />
            </SquareBox>
            <Title size='xl'>{WEAPON.name}</Title>
          </div>

          <Separator />

          <div className='tiptap opacity-70'>
            {parse(WEAPON.passive_description)}
          </div>
        </article>
      </HoverCardContent>
    </HoverCard>
  )
}
