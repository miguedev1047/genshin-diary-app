import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { getCharacterById } from '@/app/(panel)/editor/character/[id]/_shared/_services/fetch'
import { redirect } from 'next/navigation'
import { CharacterProvider } from '@/features/providers/character-provider'
import { PageProps } from '@/app/(panel)/editor/character/[id]/_shared/types'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { AlertStatus } from '@/app/(panel)/editor/character/[id]/alert-status'
import { CharacterInfo } from '@/app/(panel)/editor/character/[id]/character-info'
import { Ascension } from '@/app/(panel)/editor/character/[id]/ascensions'
import { Weapons } from '@/app/(panel)/editor/character/[id]/weapons'
import { Artifacts } from '@/app/(panel)/editor/character/[id]/artifacts'
import { StatsPriority } from '@/app/(panel)/editor/character/[id]/stats-priority'
import { VideoGuide } from '@/app/(panel)/editor/character/[id]/video-guide'
import { TalentAscension } from '@/app/(panel)/editor/character/[id]/talents-ascension/talent-ascension'
import { Teams } from '@/app/(panel)/editor/character/[id]/teams'
import { Skills } from '@/app/(panel)/editor/character/[id]/skills'
import { LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function EditorCharacterPage(props: PageProps) {
  const { params } = props

  const CHARACTER_ID = params.id
  const CHARACTER = await getCharacterById(CHARACTER_ID)

  if (!CHARACTER) return redirect('/panel/characters')

  return (
    <ContentLayout title='Editar personaje'>
      <article className='flex items-center justify-between'>
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

        <div>
          <Button
            variant='link'
            asChild
          >
            <Link
              href={`/character/${CHARACTER.id}`}
              target='_blank'
              className='flex items-center gap-3'
            >
              <LinkIcon /> <span>Ver personaje</span>
            </Link>
          </Button>
        </div>
      </article>

      <CharacterProvider data={CHARACTER}>
        <section className='grid grid-cols-2 gap-x-4 gap-y-6'>
          <AlertStatus />
          <CharacterInfo />
          <Ascension />
          <TalentAscension />
          <Weapons />
          <Artifacts />
          <StatsPriority />
          <Teams />
          <Skills />
          <VideoGuide />
        </section>
      </CharacterProvider>
    </ContentLayout>
  )
}
