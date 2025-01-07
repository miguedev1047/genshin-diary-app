import { HeaderWrapper } from '@/components/header-wrapper'
import { ArtifactHeader } from '@/components/headers/artifact-header'
import { BorderBeam } from '@/components/magicui/border-beam'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getArtifacts } from '@/app/(index)/(routes)/artifacts/_services/fetch'
import { PageProps } from '@/app/(index)/(routes)/artifacts/_types'
import { DataTable } from '@/components/data-tabla'
import { artifactColumns } from '@/app/(index)/(routes)/artifacts/_components/artifact-table/artifact-table.column'

export default async function ArtifactPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const ARTIFACTS = await getArtifacts(PARAMS)

  return (
    <section className='relative'>
      <Card className='relative overflow-clip'>
        <CardHeader>
          <HeaderWrapper>
            <ArtifactHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent>
          <DataTable
            data={ARTIFACTS ?? []}
            columns={artifactColumns}
          />
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}
