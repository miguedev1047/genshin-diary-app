import { HeaderWrapper } from '@/components/header-wrapper'
import { ArtifactHeader } from '@/components/headers/artifact-header'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { getArtifacts } from '@/app/(index)/(routes)/artifacts/_services/fetch'
import { redirect } from 'next/navigation'
import { PageProps } from '@/app/(index)/(routes)/artifacts/_types'
import { BorderBeam } from '@/components/magicui/border-beam'
import { ArtifactList } from '@/app/(index)/(routes)/artifacts/_components/artifact-list'

export default async function ArtifactPage(props: PageProps) {
  const { searchParams: PARAMS } = props
  const ARTIFACTS = await getArtifacts(PARAMS)
  if (!ARTIFACTS) return redirect('/artifacts')

  return (
    <section className='relative'>
      <Card className='max-md:overflow-visible overflow-hidden max-md:border-0 max-md:border-none'>
        <CardHeader className='space-y-4 max-md:p-0'>
          <HeaderWrapper>
            <ArtifactHeader />
          </HeaderWrapper>
        </CardHeader>
        <CardContent className='max-md:p-0'>
          <ArtifactList data={ARTIFACTS ?? []} />
        </CardContent>
        <BorderBeam className='max-md:hidden' />
      </Card>
    </section>
  )
}
