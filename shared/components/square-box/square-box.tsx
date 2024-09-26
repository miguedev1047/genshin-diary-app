import { SquareBoxProps } from '@/shared/components/square-box/square-box.type'
import { AspectRatio } from '@/components/ui/aspect-ratio'

export function SquareBox(props: SquareBoxProps) {
  const { children } = props
  return (
    <AspectRatio
      ratio={1 / 1}
      className='bg-secondary rounded-lg'
    >
      {children}
    </AspectRatio>
  )
}
