export type FormCardProps = {
  title?: string
  description?: string
  formId: string
  borderBeam?: boolean
  isEditing?: boolean
  disabled?: boolean
  isLoading?: boolean
  children: React.ReactNode
}
