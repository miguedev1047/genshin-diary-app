import { Title } from '@/components/ui/title'
import { CharacterArtifactsProps } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/character-artifacts/character-artifacts.type'
import { Badge } from '@/components/ui/badge'
import { SquareBox } from '@/components/square-box'
import { Star } from 'lucide-react'
import Image from 'next/image'

export function CharacterArtifacts(props: CharacterArtifactsProps) {
  const { artifacts } = props

  const MAPPED_ARTIFACTS = artifacts.map((artifact) => (
    <li
      key={artifact.id}
      className='bg-black/15 backdrop-blur-lg py-3 px-2 rounded-(--radius) space-y-2 text-white'
    >
      <div className='flex items-center justify-between gap-4 space-y-1'>
        <div className='space-y-1'>
          <Title
            size='xs'
            className='line-clamp-1'
          >
            {artifact.name}
          </Title>

          <ul className='flex items-center'>
            {Array.from({ length: artifact.stars }).map((_, index) => (
              <li key={index}>
                <Star className='size-3 text-yellow-500' />
              </li>
            ))}
          </ul>

          <Badge className='bg-white !text-xs text-black'>
            Lv. {artifact.level - 1}
          </Badge>
        </div>
        <div className='space-y-1'>
          <SquareBox className='bg-transparent size-12 p-0'>
            <Image
              fill
              src={artifact.imageUrl}
              alt={artifact.name}
              className='size-full object-cover'
            />
          </SquareBox>
        </div>
      </div>

      <div className='space-y-2'>
        <div className='bg-black/15 w-full h-[40px] backdrop-blur-lg px-4 rounded-sm items-center justify-between font-semibold flex gap-2'>
          <p className='text-xs'>{artifact.mainstat}</p>
          <p>{artifact.mainstatValue}</p>
        </div>
        <ul className='px-4 grid gap-2'>
          {artifact.substats.map((substat) => (
            <li
              key={substat.id}
              className='flex w-full h-[32px] items-center justify-between text-sm gap-2'
            >
              <p className='leading-none'>{substat.name}</p>
              <p className='font-bold'>+{substat.value}</p>
            </li>
          ))}
        </ul>
      </div>
    </li>
  ))

  return (
    <ul className='grid grid-cols-5 gap-3 w-full p-4 bg-black/15 backdrop-blur-lg rounded-(--radius)'>
      {MAPPED_ARTIFACTS}
    </ul>
  )
}
