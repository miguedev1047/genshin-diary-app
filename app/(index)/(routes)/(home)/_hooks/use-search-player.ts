import { useRouter } from 'next/navigation'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

const MAX_NUMBERS = 9

export function useSearchPlayer() {
  const [uid, setUid] = useState('')
  const { push } = useRouter()
  const [isLoading, startTransition] = useTransition()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUid(e.target.value.trim())
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    startTransition(() => {
      if (uid === '') return

      if (!uid.match(/^\d+$/)) {
        toast.error('El uid debe ser un numero')
        return
      }

      if (uid.length < MAX_NUMBERS) {
        toast.error(`El uid debe ser de ${MAX_NUMBERS} numeros`)
        return
      }

      if (uid.length > MAX_NUMBERS) {
        toast.error(`El uid no debe superar los ${MAX_NUMBERS} numeros`)
        return
      }

      push(`/player/uid/${uid}`)
    })
  }

  return { isLoading,handleChange, onSubmit }
}
