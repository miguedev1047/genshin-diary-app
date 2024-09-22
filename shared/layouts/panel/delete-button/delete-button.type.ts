export type DeleteButtonProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  onDelete: (itemId: string) => Promise<{message: string, status: boolean | number}>
  onRefresh?: () => void
  disabled?: boolean
}

export type UseDeleteProps = {
  itemId: string
  onRefresh?: () => void
  onDelete: (itemId: string) => Promise<{message: string, status: boolean | number}>
}
