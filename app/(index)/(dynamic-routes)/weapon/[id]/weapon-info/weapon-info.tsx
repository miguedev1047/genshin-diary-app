import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { WeaponInfoCard } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/_components/weapon-info-card'
import { WeaponInfoProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/weapon-info.type'

export function WeaponInfo(props: WeaponInfoProps) {
  const { data: WEAPON } = props

  return (
    <div className='space-y-8'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href='/weapons'>Armas</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{WEAPON.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <WeaponInfoCard {...WEAPON} />
    </div>
  )
}
