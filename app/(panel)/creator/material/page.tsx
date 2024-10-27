import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { MaterialForm } from '@/creator/material/_components/material-form'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import Link from 'next/link'

export default function CreatorMaterialPage() {
  return (
    <ContentLayout title='Crear material'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/materials'>Materiales</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Crear material</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <MaterialForm />
    </ContentLayout>
  )
}
