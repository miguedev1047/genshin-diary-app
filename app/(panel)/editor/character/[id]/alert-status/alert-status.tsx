'use client'

import { useGetCharacter } from '@/features/providers/character-provider'
import { Eclipse } from 'lucide-react'
// import { useGetCharacter } from '@/features/providers/character-provider'

export function AlertStatus() {
  const { data: CHARACTER } = useGetCharacter()
  const CHARACTER_STATUS = CHARACTER?.is_public

  if (!CHARACTER_STATUS)
    return (
      <div className='dark bg-muted px-4 py-3 text-foreground rounded-[1rem]'>
        <div className='flex flex-col justify-between gap-2 md:flex-row'>
          <div className='flex grow gap-3'>
            <Eclipse
              className='mt-0.5 shrink-0 opacity-60'
              size={16}
              strokeWidth={2}
              aria-hidden='true'
            />
            <div className='flex grow flex-col justify-between gap-2 md:flex-row md:items-center'>
              <p className='text-sm'>
                Actualmente, este personaje no es visible para todos los
                usuarios. Puedes cambiar esta configuración en la sección de
                información del personaje.
              </p>
            </div>
          </div>
        </div>
      </div>
    )

  return (
    <div className='dark bg-muted px-4 py-3 text-foreground rounded-[1rem]'>
      <div className='flex flex-col justify-between gap-2 md:flex-row'>
        <div className='flex grow gap-3'>
          <Eclipse
            className='mt-0.5 shrink-0 opacity-60'
            size={16}
            strokeWidth={2}
            aria-hidden='true'
          />
          <div className='flex grow flex-col justify-between gap-2 md:flex-row md:items-center'>
            <p className='text-sm'>
              El personaje ahora es visible para todos los usuarios. Puedes
              modificar esta configuración en su información.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

// Dependencies: pnpm install lucide-react
