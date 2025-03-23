import { currentUser } from '@/data/auth'
import { AuthProvider } from '@/features/providers/auth-provider/auth-provider'

export async function AuthWrapper({ children }: { children: React.ReactNode }) {
  const USER = await currentUser()
  return <AuthProvider user={USER}>{children}</AuthProvider>
}
