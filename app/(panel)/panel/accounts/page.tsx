import { ContentLayout } from '@/_components/content-layout'
import { HeaderWrapper } from '@/components/header-wrapper'
import { getAccounts } from '@/app/(panel)/panel/accounts/_services/fetch'
import { Card } from '@/components/ui/card'
import { accontColumns } from '@/app/(panel)/panel/accounts/_components/accounts-table/accounts.column'
import { DataTable } from '@/components/data-table'
import { AccountsHeader } from '@/components/headers/accounts-header'
import { isCurrentRole } from '@/data/auth'
import { redirect } from 'next/navigation'

export default async function PanelAccountsPage() {
  const ACCOUNTS = await getAccounts()

  if (await isCurrentRole('USER')) {
    return redirect('/dashboard')
  }

  return (
    <ContentLayout title='Cuentas'>
      <HeaderWrapper>
        <AccountsHeader />
      </HeaderWrapper>

      <Card className='p-6'>
        <DataTable
          data={ACCOUNTS ?? []}
          columns={accontColumns}
        />
      </Card>
    </ContentLayout>
  )
}
