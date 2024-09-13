import { signOut } from 'next-auth/react'

export const handleSignout = async () => {
  await signOut()
}
