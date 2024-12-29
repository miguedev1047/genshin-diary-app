import { TierlistForm } from '@/app/(panel)/panel/tierlist/_components/tierlist-form'
import { Tittle } from '@/components/ui/tittle'

export function TierlistHeader() {
  return (
    <div className='flex items-center justify-between gap-4'>
      <Tittle
        size='2xl'
        className='font-extrabold uppercase'
      >
        Tierlists
      </Tittle>

      <TierlistForm />
    </div>
  )
}
