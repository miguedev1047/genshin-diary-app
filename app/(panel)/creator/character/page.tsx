import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { CreatorCharacterForm } from '@/app/(panel)/creator/character/_components/creator-character-form/creator-character-form'
import Link from 'next/link'

export default function CreatorCharacterPage() {
  return (
    <ContentLayout
      title='Crear personaje'
      className='space-y-6'
    >
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

      <CreatorCharacterForm />
    </ContentLayout>
  )
}
