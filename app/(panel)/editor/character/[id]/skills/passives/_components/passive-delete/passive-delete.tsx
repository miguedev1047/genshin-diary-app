import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deletePassive } from '@/app/(panel)/editor/character/[id]/skills/passives/_services/delete'
import { PassiveDeleteProps } from '@/app/(panel)/editor/character/[id]/skills/passives/_components/passive-delete/passive-delete.type'
import { Trash2 } from 'lucide-react'

export function PassiveDelete(props: PassiveDeleteProps) {
  const { id } = props

  return (
    <div>
      <DeleteButton
        itemId={id}
        onDelete={deletePassive}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
