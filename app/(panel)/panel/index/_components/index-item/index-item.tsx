import { Card, CardContent } from '@/components/ui/card'
import { IndexItemProps } from '@/app/(panel)/panel/index/_components/index-item/index-item.type'
import Image from 'next/image'
import Link from 'next/link'

export function IndexItem(props: IndexItemProps) {
  const { href, src, title } = props

  return (
    <Link
      href={href}
      className='w-full h-[240px] relative group duration-300 ease-out transition overflow-hidden group/image'
    >
      <Card className='size-full relative'>
        <CardContent className='size-full z-50 p-5 flex justify-start items-end'>
          <h2 className='whitespace-pre-wrap line-clamp-1 text-foreground text-lg xl:text-2xl font-bold leading-none uppercase'>
            {title}
          </h2>
        </CardContent>

        <div className='absolute right-0 top-0 z-0 w-full max-w-[220px] h-auto'>
          <Image
            priority
            src={src}
            alt={title}
            width={720}
            height={1080}
            className='object-cover w-full h-full transition-all duration-300 ease-in-out [mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/image:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/image:scale-110'
          />
        </div>
      </Card>
    </Link>
  )
}
