'use client'

import { PlaceholdersAndVanishInput } from '@/components/ui/placeholder-vanish-and-input'
import { useSearchPlayer } from '@/app/(index)/(routes)/(home)/_hooks/use-search-player'
import { Loader2 } from 'lucide-react'

const placeholders = [
  'Ingresa tu UID',
  'Busca a tus amigos',
  'Busca a tus personajes',
]

export function SearchPlayerInput() {
  const { isLoading, handleChange, onSubmit } = useSearchPlayer()

  return (
    <div className='flex flex-col justify-center items-center px-4 space-y-4'>
      <PlaceholdersAndVanishInput
        placeholders={placeholders}
        onChange={handleChange}
        onSubmit={onSubmit}
      />

      {isLoading && (
        <div className='flex items-center gap-2'>
          <Loader2 className='animate-spin size-4' />
          <p className='text-lg`'>Buscando...</p>
        </div>
      )}
    </div>
  )
}
