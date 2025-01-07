import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { AccountsForm as AccountsEditor } from '../accounts-form'
import { AccountActionsProps } from './account-actions.type'
import { Trash2 } from 'lucide-react'
import { deleteAccount } from '../../_services/delete'
import { Suspense } from 'react'
import { SpinLoaderButton } from '@/components/spin-loaders'

export function AccountActions(props: AccountActionsProps) {
  const { id } = props

  return (
    <div className='flex items-center gap-2'>
      <Suspense fallback={<SpinLoaderButton />}>
        <AccountsEditor id={id} />
      </Suspense>

      <DeleteButton
        itemId={id}
        onDelete={deleteAccount}
      >
        <Trash2 />
      </DeleteButton>
    </div>
  )
}
