import { TierlistForm } from '@/app/(panel)/panel/tierlist/_components/tierlist-form'
import { Title } from '@/components/ui/title'

export function TierlistHeader() {
  return (
    <div className='flex items-center justify-between gap-4'>
      <Title
        size='2xl'
        className='font-extrabold uppercase'
      >
        Tierlists
      </Title>

      <TierlistForm />
    </div>
  )
}
