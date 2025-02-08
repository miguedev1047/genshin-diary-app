import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  TooltipProvider,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Bot } from 'lucide-react'

export function AssistantAvatar() {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Avatar className='flex h-8 w-8 items-center justify-center rounded-full bg-blue-500'>
            <AvatarImage
              className='object-cover'
              src='https://www.korosenai.es/wp-content/uploads/2021/03/hu-tao-genshin-impact.jpg'
            />
            <AvatarFallback>
              <Bot className='h-5 w-5 text-white' />
            </AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent>
          <p>Hu Tao</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
