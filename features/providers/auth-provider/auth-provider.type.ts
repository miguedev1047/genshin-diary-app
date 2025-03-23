import { User } from 'next-auth'

export type AuthContextProps = {
  user: User | undefined
}

export type AuthProviderProps = {
  user: User | undefined
  children: React.ReactNode
}
