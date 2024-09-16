export type FormCardProps = {
  title?: string
  description?: string
  formId: string
  isEditing?: boolean
  disabled?: boolean
  isLoading?: boolean
  children: React.ReactNode
}
