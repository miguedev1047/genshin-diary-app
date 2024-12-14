export type DeleteButtonProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  onDelete: (itemId: string) => Promise<{message: string, status: boolean | number}>
  disabled?: boolean
}

export type UseDeleteProps = {
  itemId: string
  onDelete: (itemId: string) => Promise<{message: string, status: boolean | number}>
}
