import {
  fetchElementChart,
  fetchResumenChart,
} from '@/app/(panel)/panel/index/_services/fetch'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { ElementChart } from '@/app/(panel)/panel/index/charts/element-chart'
import { ResumenChart } from '@/app/(panel)/panel/index/charts/resumen-chart'
import { Welcome } from '@/app/(panel)/panel/index/_components/welcome-card'
import { IndexRoutes } from '@/app/(panel)/panel/index/_components/index-routes'

export default async function IndexPanelPage() {
  const RESUMEN_DATA = await fetchResumenChart()
  const RESUMEN_ELEMENT = await fetchElementChart()

  return (
    <ContentLayout title='Panel'>
      <section className='grid grid-cols-8 gap-4'>
        <Welcome />
        <ResumenChart data={RESUMEN_DATA} />
        <ElementChart data={RESUMEN_ELEMENT} />
        <IndexRoutes />
      </section>
    </ContentLayout>
  )
}
