import { ConstellationForm } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-form'
import { ConstellationList } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-list'

export function Constellations() {
  return (
    <div className='space-y-4'>
      <div className='flex justify-between items-center gap-4'>
        <h2 className='text-3xl font-bold'>Lista de constelaciones</h2>
        <ConstellationForm />
      </div>
      <ConstellationList />
    </div>
  )
}
