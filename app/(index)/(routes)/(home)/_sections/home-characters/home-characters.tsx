'use client'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { BorderBeam } from '@/components/magicui/border-beam'
import { FocalLight } from '@/components/focal-light'
import { HeaderWrapper } from '@/components/header-wrapper'
import { HomeCharactersProps } from '@/app/(index)/(routes)/(home)/_sections/home-characters/home-characters.type'
import { CharacterHeader } from '@/components/headers/character-header'
import { CharacterRoutes } from '@/app/(index)/(routes)/(home)/_components/character-routes'

export function HomeCharacters(props: HomeCharactersProps) {
  const { data: CHARACTERS } = props
  
  return (
    <section className='relative mx-auto max-w-[1440px] px-4 md:px-8'>
      <FocalLight />

      <Card className='relative overflow-hidden'>
        <CardHeader className='space-y-4'>
          <HeaderWrapper>
            <CharacterHeader />
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
