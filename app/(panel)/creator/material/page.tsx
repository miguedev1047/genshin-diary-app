import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { CreatorMaterialForm } from '@/app/(panel)/creator/material/_components/creator-material-form'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import Link from 'next/link'

export default function CreatorMaterialPage() {
  return (
    <ContentLayout
      title='Crear material'
      className='space-y-6'
    >
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

      <CreatorMaterialForm />
    </ContentLayout>
  )
}
