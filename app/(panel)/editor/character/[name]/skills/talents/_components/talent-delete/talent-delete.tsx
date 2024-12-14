import { TalentDeleteProps } from '@/editor/character/[name]/skills/talents/_components/talent-delete/talent-delete.type'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteTalent } from '@/editor/character/[name]/skills/talents/_services/delete'
import { Trash2 } from 'lucide-react'

export function TalentDelete(props: TalentDeleteProps) {
  const { id } = props

  return (
    <div>
      <DeleteButton itemId={id} onDelete={deleteTalent}>
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
