import { Suspense } from 'react'
import { TierCharacterItem } from '../tier-character-item'
import { TierCharactersProps } from './tier-characters.type'
import { SpinLoaderCard } from '@/components/spin-loaders'
import { Card } from '@/components/ui/card'

export function TierCharacters(props: TierCharactersProps) {
  const { characters } = props

  const MAPPED_CHARACTERS = characters.map((character) => (
    <li key={character.id}>
      <Card className='p-6 '>
        <Suspense fallback={<SpinLoaderCard />}>
          <TierCharacterItem {...character} />
        </Suspense>
      </Card>
    </li>
  ))

  return (
    <Card className='col-span-8 p-6 flex-1 min-h-[8rem]'>
      <ul className=' space-y-4'>{MAPPED_CHARACTERS}</ul>
    </Card>
  )
}
