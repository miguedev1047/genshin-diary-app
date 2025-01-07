import { ViewCard } from '@/app/(index)/_components/view-card'
import { AscensionsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/ascensions.type'
import { AscensionsColumns } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/_components/ascension-table/ascensions.column'
import { DataTable } from '@/components/data-tabla'

export function Ascensions(props: AscensionsProps) {
  const { data } = props
  const ASCENSIONS = data.ascensions ?? []

  return (
    <div className='!mt-0 col-span-2'>
      <ViewCard title='Ascensiones'>
        <DataTable
          data={ASCENSIONS}
          columns={AscensionsColumns}
        />
      </ViewCard>
    </div>
  )
}
