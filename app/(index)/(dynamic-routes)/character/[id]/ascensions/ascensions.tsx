import { ViewCard } from '@/app/(index)/_components/view-card'
import { AscensionsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/ascensions.type'
import { ascensionColumns } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/_components/ascension-table/ascension.column'
import { DataTable } from '@/components/data-table'

export function Ascensions(props: AscensionsProps) {
  const { data } = props
  const ASCENSIONS = data.ascensions ?? []

  return (
    <div className='mt-0! col-span-2'>
      <ViewCard title='Ascensiones'>
        <DataTable
          data={ASCENSIONS}
          columns={ascensionColumns}
        />
      </ViewCard>
    </div>
  )
}
