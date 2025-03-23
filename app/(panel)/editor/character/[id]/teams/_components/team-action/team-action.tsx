import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { TeamActionProps } from '@/app/(panel)/editor/character/[id]/teams/_components/team-action/team-action.type'
import { deleteTeamCharacter } from '@/app/(panel)/editor/character/[id]/teams/_services/delete'
import { TeamForm as TeamEditor } from '@/app/(panel)/editor/character/[id]/teams/_components/team-form'
import { Trash2 } from 'lucide-react'

export function TeamAction(props: TeamActionProps) {
  const { id } = props

  return (
    <div className='flex items-center gap-3'>
      <TeamEditor id={id} />

      <DeleteButton
        itemId={id}
        onDelete={deleteTeamCharacter}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
