import { CharacterFilter } from './_components/character-filter'
import { CharacterRoutes } from './_components/character-routes/character-routes'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { FocalLight } from '@/shared/components/focal-light'
import { BorderBeam } from '@/components/magicui/border-beam'

export async function Characters() {
  return (
    <section className='relative mx-auto max-w-[1440px] min-h-[calc(100dvh-4rem)] px-4 md:px-8'>
      <FocalLight />

      <Card className='relative overflow-hidden'>
        <CardHeader className='space-y-4'>
          <CharacterFilter />
        </CardHeader>

        <CardContent>
          <CharacterRoutes />
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
