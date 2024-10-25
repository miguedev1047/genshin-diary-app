import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { ConstellationDeleteProps } from '@/editor/character/[name]/skills/constellations/_components/constellation-delete/constellation-delete.type'
import { deleteConstellation } from '@/editor/character/[name]/skills/constellations/_services/delete'
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
