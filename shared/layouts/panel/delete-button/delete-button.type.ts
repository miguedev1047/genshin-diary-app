export type DeleteButtonProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  onDelete: (itemId: string) => Promise<any>
  onRefresh?: () => void
  disabled?: boolean
}

export type UseDeleteProps = {
  itemId: string
  onRefresh?: () => void
  onDelete: (itemId: string) => Promise<any>
}
