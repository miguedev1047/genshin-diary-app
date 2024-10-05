'use client'

import { CharacterFilter } from '@/app/(index)/_sections/characters/_components/character-filter'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FocalLight } from '@/shared/components/focal-light'
import { BorderBeam } from '@/components/magicui/border-beam'
import { useGetCharacters } from '@/app/(index)/providers'
import { CharacterItem } from '@/app/(index)/_sections/characters/_components/character-item'
import { GRID_LIST } from '@/consts/classes'

const MIN_ITEMS = 0

export function Characters() {
  const { data: CHARACTERS } = useGetCharacters()

  const NO_ITEMS = (CHARACTERS?.length ?? MIN_ITEMS) <= MIN_ITEMS && null

  const ITEMS = CHARACTERS?.map((item) => (
    <CharacterItem
      key={item.id}
      {...item}
    />
  ))

  return (
    <section className='relative mx-auto max-w-[1440px] px-4 md:px-8'>
      <FocalLight />

      <Card className='relative overflow-hidden'>
        <CardHeader className='space-y-4'>
          <CharacterFilter />
        </CardHeader>

        <CardContent>
          {
            <ul className={GRID_LIST}>
              {ITEMS}
              {NO_ITEMS}
            </ul>
          }
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
