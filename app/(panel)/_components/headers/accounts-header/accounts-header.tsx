import { AccountsForm } from '@/app/(panel)/panel/accounts/_components/accounts-form'
import { SpinLoaderButton } from '@/components/spin-loaders'
import { Tittle } from '@/components/ui/tittle'
import { Suspense } from 'react'

export function AccuntsHeader() {
  return (
    <div className='flex items-center justify-between gap-5'>
      <Tittle className='font-extrabold uppercase'>Cuentas</Tittle>

      <Suspense fallback={<SpinLoaderButton />}>
        <AccountsForm />
      </Suspense>
    </div>
  )
}
