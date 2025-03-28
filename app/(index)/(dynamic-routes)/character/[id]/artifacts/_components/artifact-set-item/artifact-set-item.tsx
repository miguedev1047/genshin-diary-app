'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { ArtifactItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons/_components/weapon-item/weapon-item.type'
import { Title } from '@/components/ui/title'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import { useGetData } from '@/features/providers/data-provider'
import { Badge } from '@/components/ui/badge'
import { getRarityStars } from '@/features/utils/character-texts'
import { Star } from 'lucide-react'
import { TiptapPreview } from '@/components/tiptap'
import Image from 'next/image'

export function ArtifactSetItem(props: ArtifactItemProps) {
  const { data: ARTIFACT_DATA, requiredPieces } = props
  const { artifact_id } = ARTIFACT_DATA

  const { data } = useGetData()
  const { artifacts } = data

  const ARTIFACT = artifacts?.find((artifact) => artifact.id === artifact_id)
  if (!ARTIFACT) return null

  const RARITY_COLOR_BORDER_HOVER = getBorderColorByRarityHover(ARTIFACT.rarity)
  const MAX_STARS = getRarityStars(ARTIFACT.rarity)

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
              src={ARTIFACT.image_url ?? DEFAULT_IMAGE}
              alt={ARTIFACT.name}
              width={1080}
              height={1080}
              className='object-contain size-full'
            />
          </SquareBox>
          <Title className='text-sm md:text-base'>{ARTIFACT.name}</Title>
          <Badge>{requiredPieces}</Badge>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className='w-[480px]'>
        <article className='space-y-4'>
          <div className='flex items-center gap-4'>
            <SquareBox>
              <Image
                src={ARTIFACT.image_url ?? DEFAULT_IMAGE}
                alt={ARTIFACT.name}
                width={1080}
                height={1080}
                className='object-contain size-full'
              />
            </SquareBox>
            <Title>{ARTIFACT.name}</Title>
            <ul className='flex items-center flex-1 justify-end gap-1'>
              {MAX_STARS.map((_, index) => (
                <li key={index}>
                  <Star className='text-amber-500 size-5' />
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <TiptapPreview content={ARTIFACT.bonus_description} />
        </article>
      </HoverCardContent>
    </HoverCard>
  )
}
