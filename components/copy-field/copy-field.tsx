import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Check, Copy } from 'lucide-react'
import { toast } from 'sonner'
import { CopyFieldProps } from '@/components/copy-field/copy-field.type'

export function CopyField(props: CopyFieldProps) {
  const { label } = props
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(label)
      setCopied(true)
      toast.success('Copiado al portapapeles.')

      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('No se pudo copiar el valor.')
    }
  }

  return (
    <div className='flex items-center gap-2'>
      <span>{label}</span>
      <Button
        variant='ghost'
        size='icon'
        onClick={handleCopy}
        aria-label={`Copiar ${label}`}
      >
        {copied ? <Check className='size-4' /> : <Copy className='size-4' />}
      </Button>
    </div>
  )
}
