import { useAuth } from '@/features/providers/auth-provider'

export const useCurrentRole = () => {
  const session = useAuth()
  return session.user?.role
}

export const useCurrentUser = () => {
  const session = useAuth()
  return session.user
}
