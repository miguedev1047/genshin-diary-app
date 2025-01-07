import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { ArtifactForm } from '@/creator/artifact/_components/artifact-form'
import { PageProps } from '@/app/(panel)/creator/artifact/_types'
import Link from 'next/link'

export default function CreatorArtifactPage(props: PageProps) {
  const { params } = props

  const ITEM_ID = params?.id
  const IS_EDITING = !!ITEM_ID

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
