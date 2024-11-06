import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { MaterialForm } from '@/creator/material/_components/material-form'
import Link from 'next/link'

export default function CreatorMaterialPage({
  params,
}: {
  params: { id: string }
}) {
  const IS_EDITING = !!params?.id

  return (
    <ContentLayout title={` ${IS_EDITING ? 'Editar' : 'Crear'} material`}>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/materials'>Materiales</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>
              {IS_EDITING ? 'Editar' : 'Crear'} material
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <MaterialForm />
    </ContentLayout>
  )
}
