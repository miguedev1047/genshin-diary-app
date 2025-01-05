import { ViewCard } from '@/app/(index)/_components/view-card'
import { DataTable } from '@/components/data-tabla'
import { AscensionTalentsColumns } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent/_components/ascension-talent/ascension-talent.column'
import { AscensionTalentsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent/ascension-talent.type'

export function AscensionTalents(props: AscensionTalentsProps) {
  const { data } = props
  const ASCENSION_TALENTS = data.talents_ascension ?? []

  return (
    <div className='col-span-2'>
      <ViewCard title='Mejora de talentos'>
        <DataTable
          data={ASCENSION_TALENTS}
          columns={AscensionTalentsColumns}
        />
      </ViewCard>
    </div>
  )
}
