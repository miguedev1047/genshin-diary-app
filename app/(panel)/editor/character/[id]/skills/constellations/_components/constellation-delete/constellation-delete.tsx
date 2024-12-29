import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { ConstellationDeleteProps } from '@/app/(panel)/editor/character/[id]/skills/constellations/_components/constellation-delete/constellation-delete.type'
import { deleteConstellation } from '@/app/(panel)/editor/character/[id]/skills/constellations/_services/delete'
import { Trash2 } from 'lucide-react'

export function ConstellationDelete(props: ConstellationDeleteProps) {
  const { id } = props

  return (
    <div>
      <DeleteButton
        itemId={id}
        onDelete={deleteConstellation}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
