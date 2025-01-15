'use client'

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { useGetArtifact } from '@/features/queries/use-artifacts'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { ArtifactItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons/_components/weapon-item/weapon-item.type'
import { SpinLoaderCard } from '@/components/spin-loaders'
import { Title } from '@/components/ui/title'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { getBorderColorByRarityHover } from '@/features/utils/rarity-color'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'
import Image from 'next/image'
import parse from 'html-react-parser'

export function ArtifactItem(props: ArtifactItemProps) {
  const { artifact_id } = props

  const { data: ARTIFACT, status } = useGetArtifact(artifact_id)
  if (status === 'pending') return <SpinLoaderCard />
  if (status === 'error') return <SpinLoaderCard />

  if (!ARTIFACT) return null

  const STAR_COLOR = getBorderColorByRarityHover(ARTIFACT.rarity)

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Card className={cn('flex items-center gap-4 p-4 border transition duration-200 ease-in-out', STAR_COLOR)}>
          <SquareBox size='sm'>
            <Image
              src={ARTIFACT.image_url ?? DEFAULT_IMAGE}
              alt={ARTIFACT.name ?? 'Artifact Image'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </SquareBox>
          <Title>{ARTIFACT.name}</Title>
        </Card>
      </HoverCardTrigger>
      <HoverCardContent className='w-[480px]'>
        <article className='space-y-4'>
          <div className='flex items-center gap-4'>
            <SquareBox size='sm'>
              <Image
                src={ARTIFACT.image_url ?? DEFAULT_IMAGE}
                alt={ARTIFACT.name ?? 'Artifact Image'}
                width={1080}
                height={1080}
                className='object-cover size-full'
              />
            </SquareBox>
            <Title size='xl'>{ARTIFACT.name}</Title>
          </div>

          <Separator />

          <div className='tiptap opacity-70'>
            {parse(ARTIFACT.bonus_description)}
          </div>
        </article>
      </HoverCardContent>
    </HoverCard>
  )
}
