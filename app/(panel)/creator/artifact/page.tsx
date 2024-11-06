import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { ArtifactForm } from '@/creator/artifact/_components/artifact-form'
import Link from 'next/link'

export default function CreatorArtifactPage({
  params,
}: {
  params: { id: string }
}) {
  const IS_EDITING = !!params?.id

  return (
    <ContentLayout title={` ${IS_EDITING ? 'Editar' : 'Crear'} artefacto`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/artifacts'>Artefactos</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {IS_EDITING ? 'Editar' : 'Crear'} artefacto
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ArtifactForm />
    </ContentLayout>
  )
}
