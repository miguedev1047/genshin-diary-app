import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { redirect } from 'next/navigation'
import { PageProps } from '@/editor/character/[name]/_shared/types'
import { formattedName } from '@/features/utils/formatted-names'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { getCharacterByName } from '@/editor/character/[name]/_shared/_services/fetch'
import { CharacterInfo } from '@/editor/character/[name]/character-info'
import { Ascension } from '@/editor/character/[name]/ascensions'
import { CharacterProvider } from '@/editor/character/[name]/provider'
import { Weapons } from './weapons'

export default async function EditorCharacterPage(props: PageProps) {
  const { params } = props

  const CHARACTER_NAME = formattedName(params.name)
  const CHARACTER = await getCharacterByName(CHARACTER_NAME)

  if (!CHARACTER) return redirect('/panel/characters')

  return (
    <ContentLayout
      title={`Editar personaje: ${CHARACTER_NAME}`}
      className='space-y-6'
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/panel/characters'>Personajes</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{CHARACTER_NAME}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CharacterProvider data={CHARACTER}>
        <section className='space-y-6'>
          <CharacterInfo />
          <Ascension />
          <div className='grid lg:grid-cols-2 gap-6'>
            <Weapons />
          </div>
        </section>
      </CharacterProvider>
    </ContentLayout>
  )
}
