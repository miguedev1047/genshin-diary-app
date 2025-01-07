import { AccountsForm } from '@/app/(panel)/panel/accounts/_components/accounts-form'
import { SpinLoaderButton } from '@/components/spin-loaders'
import { Title } from '@/components/ui/title'
import { Suspense } from 'react'

export function AccuntsHeader() {
  return (
    <div className='flex items-center justify-between gap-5'>
      <Title className='font-extrabold uppercase'>Cuentas</Title>

      <Suspense fallback={<SpinLoaderButton />}>
        <AccountsForm />
      </Suspense>
    </div>
  )
}
