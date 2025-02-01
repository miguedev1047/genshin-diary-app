import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { ViewImageInputProps } from './view-image-input.type'
import { Clipboard } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ViewImageInput(props: ViewImageInputProps) {
  const { disabled, onChange, value, placeholder } = props

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }

  return (
    <div className='relative'>
      <Input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className='peer pe-9'
      />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              type='button'
              onClick={handlePaste}
              variant='ghost'
              disabled={disabled}
              size='icon'
              className='absolute right-0 top-0 mx-1 hover:bg-transparent'
            >
              <Clipboard className='h-4 w-4' />
              <span className='sr-only'>Pegar</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side='bottom'>
            <p>Pegar</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
