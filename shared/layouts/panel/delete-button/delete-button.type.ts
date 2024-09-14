export type DeleteButtonProps = {
  children: React.ReactNode
  className?: string
  itemId: string
  onDelete: (itemId: string) => Promise<any>
  disabled?: boolean
}

export type UseDeleteProps = {
  itemId: string
  onDelete: (itemId: string) => Promise<any>
}
