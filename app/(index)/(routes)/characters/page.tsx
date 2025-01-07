import { PageProps } from '@/app/(index)/(routes)/characters/_types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getCharacters } from '@/app/(index)/(routes)/characters/_services/fetch'
import { CharacterItem } from '@/app/(index)/(routes)/characters/_components/character-item'
import { BorderBeam } from '@/components/magicui/border-beam'
import { CharacterHeader } from '@/components/headers/character-header'
import { HeaderWrapper } from '@/components/header-wrapper'
import { redirect } from 'next/navigation'
import { GRID_LIST } from '@/consts/classes'

export default async function CharacterPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS)

  if (!CHARACTERS) return redirect('/')

  const MAPPED_CHARACTERS = CHARACTERS.map((character) => (
    <li key={character.id}>
      <CharacterItem {...character} />
    </li>
  ))

  return (
    <section className='relative'>
      <Card className='overflow-hidden'>
        <CardHeader className='space-y-4'>
          <HeaderWrapper>
            <CharacterHeader />
          </HeaderWrapper>
        </CardHeader>

        <CardContent>
          <ul className={GRID_LIST}>{MAPPED_CHARACTERS}</ul>
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
