import { PageProps } from '@/app/(index)/(routes)/characters/_types'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getCharacters } from '@/app/(index)/(routes)/characters/_services/fetch'
import { BorderBeam } from '@/components/magicui/border-beam'
import { CharacterHeader } from '@/components/headers/character-header'
import { HeaderWrapper } from '@/components/header-wrapper'
import { CharacterRoutes } from '@/app/(index)/(routes)/characters/_components/character-routes'
import { redirect } from 'next/navigation'

export default async function CharacterPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS)
  if (!CHARACTERS ) redirect('/characters')

  return (
    <section className='relative  pb-24'>
      <Card className='max-md:overflow-visible overflow-hidden max-md:border-0 max-md:border-none'>
        <CardHeader className='space-y-4 max-md:p-0'>
          <HeaderWrapper>
            <CharacterHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent className='max-md:p-0'>
          <CharacterRoutes data={CHARACTERS ?? []} />
        </CardContent>
        <BorderBeam className='max-md:hidden' />
      </Card>
    </section>
  )
}
