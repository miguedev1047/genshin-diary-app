import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { ChatForm } from '@/app/(panel)/_components/chat-ai/chat-ai.form'
import { RainbowButton } from '@/components/ui/rainbow-button'

export function ChatAI() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <RainbowButton>IA Chat</RainbowButton>
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
