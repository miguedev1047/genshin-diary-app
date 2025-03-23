'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  getAttributesText,
  getRarityStars,
} from '@/features/utils/character-texts'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { WeaponItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-item/artifact-set-item.type'
import { Title } from '@/components/ui/title'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { useGetData } from '@/features/providers/data-provider'
import { TiptapPreview } from '@/components/tiptap'
import Image from 'next/image'

export function WeaponItem(props: WeaponItemProps) {
  const { weapon_id } = props
  const { data } = useGetData()

  const { weapons } = data
  const WEAPON = weapons?.find((weapon) => weapon.id === weapon_id)

  if (!WEAPON) return null

  const RARITY_COLOR_BORDER_HOVER = getBorderColorByRarityHover(WEAPON.rarity)
  const SECONDARY_STAT = getAttributesText(WEAPON.secondary_stat)
  const STARS = getRarityStars(WEAPON.rarity)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card
          className={cn(
            'flex items-center gap-2 md:gap-4 p-2 md:p-4 border transition duration-200 ease-in-out',
            RARITY_COLOR_BORDER_HOVER
          )}
        >
          <SquareBox className='w-12 h-12 md:w-20 md:h-20'>
            <Image
              src={WEAPON.image_url ?? DEFAULT_IMAGE}
              alt={WEAPON.name}
              width={1080}
              height={1080}
              className='object-contain size-full'
            />
          </SquareBox>
          <article>
            <Title className='text-sm md:text-base'>{WEAPON.name}</Title>
            <Title className='text-xs md:text-sm'>
              <span className='opacity-70'>{SECONDARY_STAT}</span>
            </Title>
          </article>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className='w-[480px]'>
        <article className='space-y-4'>
          <div className='flex items-center gap-4'>
            <SquareBox>
              <Image
                src={WEAPON.image_url ?? DEFAULT_IMAGE}
                alt={WEAPON.name}
                width={1080}
                height={1080}
                className='object-contain size-full'
              />
            </SquareBox>
            <article>
              <Title>{WEAPON.name}</Title>
              <Title size='sm'>
                <span className='opacity-70'>{SECONDARY_STAT}</span>
              </Title>
            </article>
            <ul className='flex items-center flex-1 justify-end gap-1'>
              {STARS.map((_, index) => (
                <li key={index}>
                  <Star className='text-amber-500 size-5' />
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <TiptapPreview content={WEAPON.passive_description} />
        </article>
      </HoverCardContent>
    </HoverCard>
  )
}
