import { HeaderWrapper } from '@/components/header-wrapper'
import { MaterialHeader } from '@/components/headers/material-header'
import { BorderBeam } from '@/components/magicui/border-beam'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { PageProps } from '@/app/(index)/(routes)/materials/_types'
import { getMaterials } from '@/app/(index)/(routes)/materials/_services/fetch'
import { MaterialList } from '@/app/(index)/(routes)/materials/_components/material-list'

export default async function MaterialPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const MATERIALS = await getMaterials(PARAMS)

  return (
    <section className='relative  pb-24'>
      <Card className='max-md:overflow-visible overflow-hidden max-md:border-0 max-md:border-none'>
        <CardHeader className='space-y-4 max-md:p-0'>
          <HeaderWrapper>
            <MaterialHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent className='max-md:p-0'>
          <MaterialList data={MATERIALS ?? []} />
        </CardContent>
        <BorderBeam className='max-md:hidden' />
      </Card>
    </section>
  )
}
