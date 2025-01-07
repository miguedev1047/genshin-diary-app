import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { MaterialForm } from '@/creator/material/_components/material-form'
import { PageProps } from '@/app/(panel)/creator/material/_types'
import Link from 'next/link'

export default function CreatorMaterialPage(props: PageProps) {
  const { params } = props

  const ITEM_ID = params?.id
  const IS_EDITING = !!ITEM_ID

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
