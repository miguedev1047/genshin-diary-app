import { BubbleMenu as BubbleMenuTiptap } from '@tiptap/react'
import { useTiptap } from '../../_context'
import { MarksButton } from '../marks-button'
import { ColorSelector } from '../color-selector'
import { Separator } from '@/components/ui/separator'

export function BubbleMenu() {
  const { editor } = useTiptap()

  return (
    <BubbleMenuTiptap
      editor={editor}
      tippyOptions={{ duration: 100 }}
      className='shadow-lg bg-card rounded-[var(--radius)] p-1 border border-input flex items-center gap-2'
    >
      <MarksButton />
      <Separator orientation='vertical' className='h-5'/>
      <ColorSelector/>
    </BubbleMenuTiptap>
  )
}
