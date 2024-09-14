import { LucideIcon } from "lucide-react"

export type Submenu = {
  href: string
  label: string
  active: boolean
}

export interface CollapseMenuButtonProps {
  icon: LucideIcon
  label: string
  active: boolean
  submenus: Submenu[]
  isOpen: boolean | undefined
}
