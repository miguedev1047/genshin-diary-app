import { BlurImageProps } from '@/components/blur-image/blur-image.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function BlurImage(props: BlurImageProps) {
  const { alt, height, src, width, className } = props

  return (
    <div className={cn('relative z-0', className)}>
      <Image
        {...props}
        priority
        alt={alt}
        height={height}
        width={width}
        src={src}
        className='relative z-10'
      />

      <Image
        {...props}
        priority
        alt={alt}
        height={height}
        width={width}
        src={src}
        className='absolute top-0 left-0 blur-xl scale-110 opacity-40'
      />
    </div>
  )
}
