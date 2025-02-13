export type FormSheetProps = {
  title: string
  formId: string
  isEditing?: boolean
  disabled?: boolean
  isLoading?: boolean
  children: React.ReactNode
  isOpen: boolean
  onOpenChange: (value: boolean) => void
}
