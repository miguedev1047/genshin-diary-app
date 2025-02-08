import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Stars } from 'lucide-react'
import { ChatForm } from '@/app/(panel)/_components/chat-ai/chat-ai.form'

export function ChatAI() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size='icon'>
          <Stars />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side='left'
        className='w-[720px]'
        align='start'
      >
        <ChatForm className='size-full' />
      </PopoverContent>
    </Popover>
  )
}
