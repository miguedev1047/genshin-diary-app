import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { formattedName } from '@/features/utils/formatted-names'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { PageProps } from './_shared/types'
import { fetchWeapon } from './_shared/_services/fetch'
import Link from 'next/link'

export default async function EditorWeaponPage({ params }: PageProps) {
  const CHARACTER_NAME = formattedName(params.name)
  const CHARACTER = await fetchWeapon(CHARACTER_NAME)

  return (
    <ContentLayout
      title={`Editar arma`}
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
            <BreadcrumbPage>Editar arma</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <section className='space-y-6'></section>
    </ContentLayout>
  )
}
