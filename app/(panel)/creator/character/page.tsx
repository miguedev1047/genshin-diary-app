import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { CharacterForm } from '@/creator/character/_components/character-form'
import Link from 'next/link'

export default function CreatorCharacterPage() {
  return (
    <ContentLayout title='Crear personaje'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/characters'>Personajes</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Crear personaje</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CharacterForm />
    </ContentLayout>
  )
}
