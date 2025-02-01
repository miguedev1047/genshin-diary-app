'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { PasteButtonInputProps } from '@/app/(panel)/_components/paste-button-input/paste-button-input.type'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Clipboard } from 'lucide-react'

export function PasteButtonInput(props: PasteButtonInputProps) {
  const { value, placeholder, disabled, onChange } = props

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      onChange(text)
    } catch (err) {
      console.error('Failed to read clipboard contents: ', err)
    }
  }

  return (
    <div className='relative w-full'>
      <Input
        type='text'
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
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
