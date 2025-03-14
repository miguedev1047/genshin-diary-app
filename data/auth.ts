import { auth } from '@/auth'

export const currentUser = async () => {
  const session = await auth()
  return session?.user
}

export const currentRole = async () => {
  const session = await auth()
  return session?.user?.role
}

export const isCurrentRole = async (value: string) => {
  const role = await currentRole()
  return role === value
}
