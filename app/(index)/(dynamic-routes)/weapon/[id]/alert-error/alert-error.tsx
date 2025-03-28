import { DISCORD_USER } from '@/consts/misc'
import { AlertCircle } from 'lucide-react'

export function AlertError() {
  return (
    <div className='col-span-2 bg-warning text-warning-foreground px-4 py-3 rounded-(--radius)'>
      <div className='flex flex-col justify-between gap-2 md:flex-row'>
        <div className='flex grow gap-3'>
          <AlertCircle
            className='mt-0.5 shrink-0 opacity-60'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          <div className='flex grow flex-col justify-between gap-2 md:flex-row md:items-center'>
            <p className='text-sm'>
              Si esta guía presenta un error enviame mensaje a mi discord{' '}
              <span className='font-bold'>{DISCORD_USER}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
