import { ContentLayout } from '@/_components/content-layout'
import { HeaderWrapper } from '@/components/header-wrapper'
import { getAccounts } from '@/app/(panel)/panel/accounts/_services/fetch'
import { Card } from '@/components/ui/card'
import { columns } from '@/app/(panel)/panel/accounts/_components/accounts-table/accounts.column'
import { AccuntsHeader } from '@/app/(panel)/_components/headers/accounts-header'
import { AccountNoAccess } from '@/app/(panel)/panel/accounts/_components/account-no-access'
import { currentRole } from '@/data/auth'
import { User } from '@prisma/client'
import { DataTable } from '@/components/data-tabla'

export default async function AccountsPage() {
  const ACCOUNTS = (await getAccounts()) as Array<User>

  const ROLE = await currentRole()
  if (ROLE !== 'OWNER') return <AccountNoAccess />

  return (
    <ContentLayout title='Cuentas'>
      <HeaderWrapper>
        <AccuntsHeader />
      </HeaderWrapper>

      <Card className='p-6'>
        <DataTable
          data={ACCOUNTS ?? []}
          columns={columns}
        />
      </Card>
    </ContentLayout>
  )
}
