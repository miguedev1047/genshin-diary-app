import { ContentLayout } from '@/_components/content-layout'
import { HeaderWrapper } from '@/components/header-wrapper'
import { getAccounts } from '@/app/(panel)/panel/accounts/_services/fetch'
import { Card } from '@/components/ui/card'
import { columns } from '@/app/(panel)/panel/accounts/_components/accounts-table/accounts.column'
import { AccountsTable } from '@/app/(panel)/panel/accounts/_components/accounts-table'
import { AccuntsHeader } from '@/app/(panel)/_components/headers/accounts-header'
import { AccountNoAccess } from '@/app/(panel)/panel/accounts/_components/account-no-access'
import { currentRole } from '@/data/auth'
import { User } from '@prisma/client'

export default async function AccountsPage() {
  const ACCOUNTS = (await getAccounts()) as Array<User>

  const ROLE = await currentRole()
  if (ROLE !== 'OWNER') return <AccountNoAccess />

  return (
    <ContentLayout title='Cuentas'>
      <HeaderWrapper>
        <AccuntsHeader />
      </HeaderWrapper>

      <section className='space-y-4'>
        <Card className='p-6'>
          <AccountsTable
            data={ACCOUNTS ?? []}
            columns={columns}
          />
        </Card>
      </section>
    </ContentLayout>
  )
}
