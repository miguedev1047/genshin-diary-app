import { PassiveForm } from '@/editor/character/[name]/skills/passives/_components/passive-form'
import { PassiveList } from '@/editor/character/[name]/skills/passives/_components/passive-list'

export function Passives() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center gap-4'>
        <h2 className='text-3xl font-bold'>Lista de pasivas</h2>
        <PassiveForm />
      </div>

      <PassiveList />
    </div>
  )
}
