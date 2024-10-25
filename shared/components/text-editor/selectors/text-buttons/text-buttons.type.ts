import { useEditor } from '@tiptap/react'
import { LucideIcon } from 'lucide-react'

export type TextButtonsProps = {
  name: string
  icon: LucideIcon
  command: (editor: ReturnType<typeof useEditor>['editor']) => void
  isActive: (editor: ReturnType<typeof useEditor>['editor']) => boolean
}
