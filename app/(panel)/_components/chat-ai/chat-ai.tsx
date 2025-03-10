import { ChatForm } from '@/app/(panel)/_components/chat-ai/chat-ai.form'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { RainbowButton } from '@/components/ui/rainbow-button'

export function ChatAI() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <RainbowButton>IA Chat</RainbowButton>
      </DialogTrigger>
      <DialogContent className='max-w-[840px]'>
        <ChatForm className='size-full' />
      </DialogContent>
    </Dialog>
  )
}
