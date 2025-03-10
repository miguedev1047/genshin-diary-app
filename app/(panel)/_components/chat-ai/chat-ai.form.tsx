'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { useChat } from 'ai/react'
import { ArrowUpIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { AutoResizeTextarea } from '@/components/ui/autoresize-texarea'
import { FormattedResponse } from '@/app/(panel)/_components/chat-ai/chat.formatted'
import { AssistantAvatar } from '@/app/(panel)/_components/chat-ai/chat-ai.avatar'
import { useEffect, useRef, useTransition } from 'react'
import * as ScrollArea from '@radix-ui/react-scroll-area'

const API_URL = '/api/v0/genshin-diary/chat-ai'

export function ChatForm({ className, ...props }: React.ComponentProps<'div'>) {
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const [isPending, startTransition] = useTransition()

  const { messages, input, setInput, append } = useChat({
    api: API_URL,
  })

  const INPUT_EMPTY = input === ''

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (INPUT_EMPTY) return

    void append({ content: input, role: 'user' })
    setInput('')
  }

  useEffect(() => {
    startTransition(() => {
      if (scrollAreaRef.current) {
        scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
      }
    })
  }, [messages])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (INPUT_EMPTY) return
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const header = (
    <header className='m-auto flex max-w-96 mt-20 flex-col gap-4 text-center'>
      <h1 className='text-2xl font-semibold leading-none tracking-tight'>
        Hu Tao AI Bot (Experimental)
      </h1>

      <p className='text-muted-foreground text-sm'>
        Preguntame cualquier cosa y te responderé lo mejor que pueda.
      </p>
    </header>
  )

  const messageList = (
    <div className='my-4 flex h-fit min-h-full flex-col gap-4'>
      {messages.map((message, index) => (
        <div
          key={index}
          className={cn(
            'flex items-start gap-3',
            message.role === 'assistant' ? 'justify-start' : 'justify-end'
          )}
        >
          {message.role === 'assistant' && <AssistantAvatar />}
          <div
            className={cn(
              'max-w-[80%] rounded-xl px-3 py-2 text-sm break-words',
              message.role === 'assistant'
                ? 'bg-gray-100 text-black'
                : 'bg-blue-500 text-white text-right'
            )}
          >
            {message.role === 'assistant' ? (
              <FormattedResponse content={message.content} />
            ) : (
              message.content
            )}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <div
      className={cn(
        'h-[calc(100dvh_-_24rem)] flex justify-between flex-col',
        (className = '')
      )}
      {...props}
    >
      <ScrollArea.Root className='flex-1 overflow-hidden'>
        <ScrollArea.Viewport
          ref={scrollAreaRef}
          className='h-full w-full'
        >
          <div className='flex-1 content-center px-6'>
            {messages.length ? messageList : header}
          </div>
        </ScrollArea.Viewport>
        <ScrollArea.Scrollbar
          className='flex touch-none select-none bg-secondary transition-colors duration-[160ms] ease-out hover:bg-black/20 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5 rounded-full'
          orientation='vertical'
        >
          <ScrollArea.Thumb className="flex-1 bg-black/30 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>

      <form
        onSubmit={handleSubmit}
        className='border-input bg-background focus-within:ring-ring/10 relative mx-6 mb-2 flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0'
      >
        <AutoResizeTextarea
          onKeyDown={handleKeyDown}
          onChange={(v) => setInput(v)}
          value={input}
          placeholder='Escribe un mensaje'
          className='placeholder:text-muted-foreground relative flex-1 bg-transparent focus:outline-none pr-24'
        />

        <div className='absolute h-full right-1 gap-1 flex items-center'>
          <p className='pointer-events-none text-xs text-muted-foreground mr-2'>
            {input.length}/100
          </p>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='sm'
                  className='size-6 p-0 rounded-full'
                  disabled={INPUT_EMPTY || isPending}
                >
                  <ArrowUpIcon size={16} />
                </Button>
              </TooltipTrigger>
              <TooltipContent sideOffset={12}>Enviar</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </form>

      <div className='text-center text-xs text-muted-foreground mb-2'>
        Hu Tao es un bot inteligente y puede cometer errores. Usar a discreción.
      </div>
    </div>
  )
}
