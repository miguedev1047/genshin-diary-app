import { TalentForm } from '@/app/(panel)/editor/character/[id]/skills/talents/_components/talent-form'
import { TalentList } from '@/app/(panel)/editor/character/[id]/skills/talents/_components/talent-list'

export function Talents() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center gap-4'>
        <h2 className='text-3xl font-bold'>Lista de talentos</h2>
        <TalentForm />
      </div>
      <TalentList />
    </div>
  )
}
