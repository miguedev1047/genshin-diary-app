import { Bold, Italic, Strikethrough } from 'lucide-react'
import { useTiptap } from '../../_context'
import { Toggle } from '@/components/ui/toggle'

export function MarksButton() {
  const { editor } = useTiptap()

  const TEXT_OPTIONS = [
    {
      icon: Bold,
      onClick: () => editor?.chain().focus().toggleBold().run(),
      pressed: editor?.isActive('bold'),
      id: 'bold',
    },
    {
      icon: Italic,
      onClick: () => editor?.chain().focus().toggleItalic().run(),
      pressed: editor?.isActive('italic'),
      id: 'italic',
    },
    {
      icon: Strikethrough,
      onClick: () => editor?.chain().focus().toggleStrike().run(),
      pressed: editor?.isActive('strike'),
      id: 'strike',
    },
  ]

  return (
    <div className='flex items-center'>
      {TEXT_OPTIONS.map(({ icon: Icon, id, pressed, onClick }) => (
        <Toggle
          key={id}
          size='sm'
          pressed={pressed}
          onPressedChange={onClick}
        >
          <Icon className='w-4 h-4' />
        </Toggle>
      ))}
    </div>
  )
}
