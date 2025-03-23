'use client'

import { useGetWeapon } from '@/features/providers/weapon-provider'
import { cn } from '@/lib/utils'
import { Eclipse } from 'lucide-react'

export function AlertStatus() {
  const { data: WEAPON } = useGetWeapon()
  const CHARACTER_STATUS = WEAPON?.is_public

  const message = CHARACTER_STATUS
    ? 'El arma ahora es visible para todos los usuarios. Puedes modificar esta configuración en su información.'
    : 'Actualmente, esta arma no es visible para todos los usuarios. Puedes cambiar esta configuración en la sección de información del arma.'

  const styleStatus = CHARACTER_STATUS
    ? 'bg-success dark:bg-success/50 text-success-foreground'
    : 'bg-warning dark:bg-warning/50 text-warning-foreground'

  return (
    <div
      className={cn(
        'col-span-2 relative px-4 py-3 rounded-[1rem]',
        styleStatus
      )}
    >
      <div className='flex flex-col justify-between gap-2 md:flex-row'>
        <div className='flex grow gap-3'>
          <Eclipse
            className='mt-0.5 shrink-0 opacity-60'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          <div className='flex grow flex-col justify-between gap-2 md:flex-row md:items-center'>
            <p className='text-sm font-bold'>{message}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
