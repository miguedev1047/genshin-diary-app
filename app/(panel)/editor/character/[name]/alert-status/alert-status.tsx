'use client'

import { useGetCharacter } from '@/app/(panel)/editor/character/[name]/provider'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { AlertOctagon, CheckCircle } from 'lucide-react'

export function AlertStatus() {
  const { data: CHARACTER } = useGetCharacter()
  const CHARACTER_STATUS = CHARACTER?.is_public

  if (!CHARACTER_STATUS)
    return (
      <Alert variant='warning'>
        <AlertOctagon className='size-4' />
        <AlertTitle>Advertencia</AlertTitle>
        <AlertDescription>
          Actualmente, este personaje no es visible para todos los usuarios.
          Puedes cambiar esta configuración en la sección de información del
          personaje.
        </AlertDescription>
      </Alert>
    )

  return (
    <Alert variant='success'>
      <CheckCircle className='size-4' />
      <AlertTitle>Información</AlertTitle>
      <AlertDescription>
        El personaje ahora es visible para todos los usuarios. Puedes modificar
        esta configuración en su información.
      </AlertDescription>
    </Alert>
  )
}
