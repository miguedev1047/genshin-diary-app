import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Input } from '@/components/ui/input'
import { ViewImageInputProps } from './view-image-input.type'
import { Check, Clipboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { toast } from 'sonner'

const TIME_CLEAR = 1500
const URL_START = ['https://', 'http://']

export function ViewImageInput(props: ViewImageInputProps) {
  const { disabled, onChange, value, placeholder } = props
  const [successPaste, setSuccessPaste] = useState(false)

  const VALID_LINK = URL_START.some((star) => value.startsWith(star))

  const onSuccessPaste = (time: number) => {
    const successPasteTimout = setTimeout(() => {
      setSuccessPaste(false)
    }, time)
    return () => clearTimeout(successPasteTimout)
  }

  const handlePaste = async () => {
    if (VALID_LINK) return toast.error('Link inválido')

    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
      onSuccessPaste(TIME_CLEAR)
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
        className='peer pe-10'
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
              {successPaste ? (
                <Check className='h-4 w-4 text-lime-400' />
              ) : (
                <Clipboard className='h-4 w-4' />
              )}
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
