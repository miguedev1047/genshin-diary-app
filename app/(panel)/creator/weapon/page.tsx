import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import Link from 'next/link'
import { CreatorWeaponForm } from '@/app/(panel)/creator/weapon/_components/creator-weapon-form'

export default function EditWeaponPage() {
  return (
    <ContentLayout
      title='Crear Arma'
      className='space-y-6'
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/weapons'>Armas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Crear arma</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <CreatorWeaponForm />
    </ContentLayout>
  )
}
