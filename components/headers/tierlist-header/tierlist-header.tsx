import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TierlistForm } from '@/app/(panel)/panel/tierlist/_components/tierlist-form'
import { Title } from '@/components/ui/title'
import { HeaderProps } from '@/components/headers/_types'

export function TierlistHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <div className='flex items-center justify-between gap-4'>
      <Title
        size='2xl'
        className='font-extrabold uppercase'
      >
        Tierlists
      </Title>

      {isCreator && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TierlistForm />
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Crear tierlist</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  )
}
