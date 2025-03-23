export type TiptapEditorProps = {
  content: string
  onChange?: (
    value?: string,
    event?: React.ChangeEvent<HTMLTextAreaElement>
  ) => void
  disabled?: boolean
  className?: string
  placeholder?: string
  mode?: 'edit' | 'view'
}

export type TiptapPreviewProps = {
  content: string
  className?: string
}
