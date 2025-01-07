import { PassiveForm } from '@/app/(panel)/editor/character/[id]/skills/passives/_components/passive-form'
import { PassiveList } from '@/app/(panel)/editor/character/[id]/skills/passives/_components/passive-list'

export function Passives() {
  return (
    <div className='space-y-4'>
      <div className='absolute top-0 right-0 m-6'>
        <PassiveForm />
      </div>
      <PassiveList />
    </div>
  )
}
