import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { PageProps } from '@/app/(panel)/editor/character/[name]/_shared/types'
import { formattedName } from '@/features/utils/formatted-names'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { CharacterInfo } from '@/app/(panel)/editor/character/[name]/character-info'
import { getCharacterByName } from '@/app/(panel)/editor/character/[name]/_shared/_services/fetch'
import { redirect } from 'next/navigation'
import { Ascension } from './ascensions'

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

      <section className='space-y-6'>
        <CharacterInfo data={CHARACTER} />
        <Ascension data={CHARACTER} />
      </section>
    </ContentLayout>
  )
}
