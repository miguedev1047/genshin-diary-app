import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { ArtifactForm as ArtifactEditor } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-form'
import { ArtifactActionProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-action/artifact-action.type'
import { deleteArtifactSet } from '@/app/(panel)/editor/character/[id]/artifacts/_services/delete'
import { Trash2 } from 'lucide-react'

export function ArtifactAction(props: ArtifactActionProps) {
  const { id } = props

  return (
    <div className='flex items-center gap-2'>
      <ArtifactEditor id={id} />

      <DeleteButton
        itemId={id}
        onDelete={deleteArtifactSet}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
