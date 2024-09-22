import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { ActionsProps } from '@/app/(panel)/editor/character/[name]/ascensions/_components/actions/actions.type'
import { deleteAscension } from '@/app/(panel)/editor/character/[name]/ascensions/_services/delete'
import { Trash2 } from 'lucide-react'

export function Actions(props: ActionsProps) {
  const { id } = props

  return (
    <div>
      <DeleteButton
        itemId={id}
        onDelete={deleteAscension}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
