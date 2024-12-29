'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BorderBeam } from '@/components/magicui/border-beam'
import { FocalLight } from '@/components/focal-light'
import { HomeCharactersProps } from '@/app/(index)/(home)/_sections/home-characters/home-characters.type'
import { CharacterRoutes } from '@/app/(index)/(home)/_components/character-routes'
import { CharacterFilter } from '@/app/(index)/_components/filters/character-filter'
import { HeaderWrapper } from '@/components/header-wrapper'

export function HomeCharacters(props: HomeCharactersProps) {
  const { data: CHARACTERS } = props

  return (
    <section className='relative mx-auto max-w-[1440px] px-4 md:px-8'>
      <FocalLight />

      <Card className='relative overflow-hidden'>
        <CardHeader className='space-y-4'>
          <HeaderWrapper>
            <CharacterFilter />
          </HeaderWrapper>
        </CardHeader>

        <CardContent>
          <CharacterRoutes data={CHARACTERS} />
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
