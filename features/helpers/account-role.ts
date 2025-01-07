import { ACCOUNT_ROLE } from '@/consts/general'

export function getAccountRole(role: string) {
  const ROLE = ACCOUNT_ROLE.find((r) => r.value === role)
  return ROLE?.label
}
