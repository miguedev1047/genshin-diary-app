import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { redirect } from 'next/navigation'
import { CharacterProvider } from '@/editor/character/[name]/provider'
import { PageProps } from '@/editor/character/[name]/_shared/types'
import { formattedName } from '@/features/utils/formatted-names'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { getCharacterByName } from '@/editor/character/[name]/_shared/_services/fetch'
import { CharacterInfo } from '@/editor/character/[name]/character-info'
import { Ascension } from '@/editor/character/[name]/ascensions'
import { Weapons } from '@/editor/character/[name]/weapons'
import { Artifacts } from '@/editor/character/[name]/artifacts'
import { StatsPriority } from '@/editor/character/[name]/stats-priority'
import { VideoGuide } from '@/editor/character/[name]/video-guide'
import { TalentAscension } from '@/editor/character/[name]/talents-ascension/talent-ascension'
import { Teams } from '@/editor/character/[name]/teams'
import { Skills } from '@/editor/character/[name]/skills'
import Link from 'next/link'

export default async function EditorCharacterPage(props: PageProps) {
  const { params } = props

  const CHARACTER_NAME = formattedName(params.name)
  const CHARACTER = await getCharacterByName(CHARACTER_NAME)

  if (!CHARACTER) return redirect('/panel/characters')

  return (
    <ContentLayout title={CHARACTER_NAME}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/characters'>Personajes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar personaje</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CharacterProvider data={CHARACTER}>
        <section className='space-y-6'>
          <CharacterInfo />
          <Ascension />
          <TalentAscension />
          <div className='grid lg:grid-cols-2 gap-6'>
            <Weapons />
            <Artifacts />
          </div>
          <StatsPriority />
          <VideoGuide />
          <Teams />
          <Skills />
        </section>
      </CharacterProvider>
    </ContentLayout>
  )
}
