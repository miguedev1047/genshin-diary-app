import { ActionProps } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-ascension/actions/actions.type'
import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { deleteAscension } from '@/app/(panel)/editor/weapon/[name]/_services/delete'
import { Trash2 } from 'lucide-react'

export function Actions(props: ActionProps) {
  const { id } = props
  const { refetch } = useGetWeaponByName()

  return (
    <DeleteButton
      itemId={id}
      onRefresh={refetch}
      onDelete={deleteAscension}
    >
      <Trash2 />
    </DeleteButton>
  )
}
