import { DeleteButton } from '@/_components/delete-button'
import { deleteTierlist } from '@/panel/tierlist/_services/delete'
import { TierActionsProps } from '@/panel/tierlist/_components/tier-actions/tier-actions.type'
import { TierlistForm } from '@/panel/tierlist/_components/tierlist-form'
import { Trash2 } from 'lucide-react'

export function TierActions(props: TierActionsProps) {
  const { id } = props

  return (
    <div className='absolute top-0 right-0 flex items-center gap-2'>
      <TierlistForm id={id} />

      <DeleteButton
        itemId={id}
        onDelete={deleteTierlist}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
