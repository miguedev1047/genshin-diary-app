'use client'

import '@/components/tiptap/tiptap.style.css'

import {
  TiptapPreviewProps,
  TiptapEditorProps,
} from '@/components/tiptap/tiptap.props'
import { cn } from '@/lib/utils'
import { useEditor, EditorContent } from '@tiptap/react'
import { BubbleMenu } from '@/components/tiptap/_components/bubble-menu'
import { Color } from '@tiptap/extension-color'
import { TipTapProvider } from '@/components/tiptap/_context'
import { sanitizeContent } from '@/features/helpers/sanitized-html'
import { Skeleton } from '@/components/ui/skeleton'

import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import BulletList from '@tiptap/extension-bullet-list'
import Heading from '@tiptap/extension-heading'
import OrderedList from '@tiptap/extension-ordered-list'
import TextStyle from '@tiptap/extension-text-style'
import Text from '@tiptap/extension-text'

export function TiptapEditor(props: TiptapEditorProps) {
  const {
    onChange,
    content,
    mode = 'edit',
    className,
    disabled,
    placeholder,
  } = props

  const isEditable = mode === 'edit'
  const isLoading = disabled && isEditable

  const CLASSES = cn(
    className,
    isEditable && 'min-h-[150px]',
    isLoading && 'pointer-events-none cursor-not-allowed opacity-50',
    'prose prose-sm sm:prose-base dark:prose-invert focus:outline-hidden max-w-full'
  )

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Text,
      Color.configure({ types: ['textStyle', 'highlight'] }),
      Placeholder.configure({ placeholder }),
      Heading.configure({ levels: [1, 2, 3] }),
      OrderedList.configure({
        HTMLAttributes: {
          class: 'list-decimal ml-3',
        },
      }),
      BulletList.configure({
        HTMLAttributes: {
          class: 'list-disc ml-3',
        },
      }),
    ],
    immediatelyRender: false,
    editable: isEditable,
    content: sanitizeContent(content),
    onUpdate: ({ editor }) => {
      onChange?.(sanitizeContent(editor.getHTML()))
    },
    editorProps: {
      attributes: { class: CLASSES },
    },
  })

  if (!editor)
    return (
      <Skeleton className='w-full h-[184px] border border-input rounded-[var(--radius)] p-4' />
    )

  return (
    <TipTapProvider editor={editor}>
      <BubbleMenu />

      <div
        className={cn(
          isEditable && 'border border-input rounded-[var(--radius)]',
          'tiptap bg-background p-4 focus-within:outline-hidden focus-within:ring-1 focus-within:ring-ring focus-within:ring-offset-1'
        )}
      >
        <EditorContent editor={editor} />
      </div>
    </TipTapProvider>
  )
}

export function TiptapPreview(props: TiptapPreviewProps) {
  const { content } = props
  const sanitizedContent = sanitizeContent(content)

  return (
    <div
      key={sanitizedContent}
      className='text-sm text-pretty opacity-90 tiptap'
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    />
  )
}
