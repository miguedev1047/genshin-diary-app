import { TalentForm } from '@/app/(panel)/editor/character/[id]/skills/talents/_components/talent-form'
import { TalentList } from '@/app/(panel)/editor/character/[id]/skills/talents/_components/talent-list'

export function Talents() {
  return (
    <div className='space-y-4'>
      <div className='absolute top-0 right-0 m-6'>
        <TalentForm />
      </div>
      <TalentList />
    </div>
  )
}
