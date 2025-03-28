'use client'

import { Badge } from '@/components/ui/badge'
import { getAccountRole } from '@/features/helpers/account-role'
import { ColumnDef } from '@tanstack/react-table'
import { AccountActions } from '@/app/(panel)/panel/accounts/_components/account-actions'
import { CopyField } from '@/components/copy-field'

type userProps = {
  name: string
  id: string
  role: string
  email: string
}

export const accontColumns: ColumnDef<userProps>[] = [
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({ row }) => {
      const { name } = row.original

      return <p>{name}</p>
    },
  },
  {
    accessorKey: 'email',
    header: 'Correo',
    cell: ({ row }) => {
      const { email } = row.original
      return <CopyField label={email} />
    },
  },
  {
    accessorKey: 'role',
    header: 'Rol',
    cell: ({ row }) => {
      const { role } = row.original
      const ROLE = getAccountRole(role)

      return <Badge>{ROLE}</Badge>
    },
  },
  {
    accessorKey: 'actions',
    header: 'Acciones',
    cell: ({ row }) => {
      const { id } = row.original
      return <AccountActions id={id} />
    },
  },
]
