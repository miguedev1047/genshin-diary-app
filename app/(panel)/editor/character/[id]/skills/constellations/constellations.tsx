import { ConstellationForm } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-form'
import { ConstellationList } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-list'

export function Constellations() {
  return (
    <div className='space-y-4'>
      <div className='absolute top-0 right-0 m-6'>
        <ConstellationForm />
      </div>
      <ConstellationList />
    </div>
  )
}
