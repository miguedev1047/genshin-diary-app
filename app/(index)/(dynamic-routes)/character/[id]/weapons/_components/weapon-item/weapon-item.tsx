'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { WeaponItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-item/artifact-item.type'
import { SpinLoaderCard } from '@/components/spin-loaders'
import { Title } from '@/components/ui/title'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { cn } from '@/lib/utils'
import { useGetWeapon } from '@/features/queries/use-weapons'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import parse from 'html-react-parser'

export function WeaponItem(props: WeaponItemProps) {
  const { weapon_id } = props

  const { data: WEAPON, status } = useGetWeapon(weapon_id)
  if (status === 'pending') return <SpinLoaderCard />
  if (status === 'error') return <SpinLoaderCard />

  if (!WEAPON) return null

  const STAR_COLOR = getBorderColorByRarityHover(WEAPON.rarity)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={cn('flex items-center gap-4 p-4 border transition duration-200 ease-in-out', STAR_COLOR)}>
          <SquareBox size='sm'>
            <Image
              src={WEAPON.image_url ?? DEFAULT_IMAGE}
              alt={WEAPON.name ?? 'WEAPON Image'}
              width={1080}
              height={1080}
              className='object-cover size-full'
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
                className='object-cover size-full'
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
