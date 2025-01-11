import { HeaderWrapper } from '@/components/header-wrapper'
import { MaterialHeader } from '@/components/headers/material-header'
import { BorderBeam } from '@/components/magicui/border-beam'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageProps } from '@/app/(index)/(routes)/materials/_types'
import { materialColumns } from '@/app/(index)/(routes)/materials/_components/material-table'
import { getMaterials } from '@/app/(index)/(routes)/materials/_services/fetch'
import { MaterialTable } from '@/app/(index)/(routes)/materials/_components/material-table/material-table'

export default async function MaterialPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const MATERIALS = await getMaterials(PARAMS)

  return (
    <section className='relative'>
      <Card className='relative overflow-clip'>
        <CardHeader>
          <HeaderWrapper>
            <MaterialHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent>
          <MaterialTable
            data={MATERIALS ?? []}
            columns={materialColumns}
          />
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
