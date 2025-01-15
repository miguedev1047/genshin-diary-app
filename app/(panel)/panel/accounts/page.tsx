import { ContentLayout } from '@/_components/content-layout'
import { HeaderWrapper } from '@/components/header-wrapper'
import { getAccounts } from '@/app/(panel)/panel/accounts/_services/fetch'
import { Card, CardContent } from '@/components/ui/card'
import { columns } from '@/app/(panel)/panel/accounts/_components/accounts-table/accounts.column'
import { AccountNoAccess } from '@/app/(panel)/panel/accounts/_components/account-no-access'
import { currentRole } from '@/data/auth'
import { User } from '@prisma/client'
import { DataTable } from '@/components/data-table'
import { AccountsHeader } from '@/components/headers/accounts-header'

export default async function AccountsPage() {
  const ACCOUNTS = (await getAccounts()) as Array<User>

  const ROLE = await currentRole()
  if (ROLE !== 'OWNER') return <AccountNoAccess />

  return (
    <ContentLayout title='Cuentas'>
      <HeaderWrapper>
        <AccountsHeader />
      </HeaderWrapper>

      <Card className='p-6'>
        <CardContent>
          <DataTable
            data={ACCOUNTS ?? []}
            columns={columns}
          />
        </CardContent>
      </Card>
    </ContentLayout>
  )
}
