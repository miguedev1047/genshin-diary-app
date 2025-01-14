import { Input } from '@/components/ui/input'
import { ViewImageInputProps } from './view-image-input.type'
import { Check, Eye, ImageIcon, X } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import { SquareBox } from '@/components/square-box'
import { cn } from '@/lib/utils'
import { DEFAULT_IMAGE } from '@/consts/misc'
import Image from 'next/image'

export function ViewImageInput(props: ViewImageInputProps) {
  const { disabled, onChange, value, placeholder } = props
  const VALID_URL = value.startsWith('https://gensh.honeyhunterworld.com/img/')

  return (
    <div className='relative'>
      <Input
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className='peer pe-9'
      />
      <div
        className={cn(
          VALID_URL
            ? 'text-success'
            : 'pointer-events-none text-muted-foreground/80',
          'absolute inset-y-0 end-0 flex items-center justify-center pe-3  peer-disabled:opacity-50'
        )}
      >
        <HoverCard>
          <HoverCardTrigger asChild>
            {VALID_URL && <ImageIcon />}
          </HoverCardTrigger>
          <HoverCardContent className='size-32'>
            <SquareBox size='full'>
              {VALID_URL && (
                <Image
                  src={value ?? DEFAULT_IMAGE}
                  width={256}
                  height={256}
                  loading='lazy'
                  alt='View Image Input'
                  className='size-full object-contain'
                />
              )}
            </SquareBox>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  )
}
