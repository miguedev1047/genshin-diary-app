import { DEFAULT_IMAGE } from '@/consts/misc'
import { useToPng } from '@hugocxl/react-to-image'
import { toast } from 'sonner'

export function useExportImage({
  filename = 'image-card',
}: {
  filename?: string
}) {
  const [{ isLoading }, convert, ref] = useToPng({
    onSuccess: async (data) => {
      try {
        const response = await fetch(data || DEFAULT_IMAGE)
        const blob = await response.blob()

        const url = URL.createObjectURL(blob)

        const link = document.createElement('a')
        link.href = url
        link.download = `${filename}.png`

        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)

        URL.revokeObjectURL(url)
        toast.success('Imagen descargada!')
      } catch (error) {
        toast.error('Ocurrio un error al exportar la imagen!')
        console.error('Error exportando imagen:', error)
      }
    },
  })

  return {
    isLoading,
    ref,
    convert,
  }
}
