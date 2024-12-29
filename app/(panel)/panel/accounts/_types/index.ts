import { User } from '@prisma/client'

export type PageProps = {
  searchParams: {
    name: string
  }
}

export type Accounts = Array<User>
