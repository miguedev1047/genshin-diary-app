import { cn } from '@/lib/utils'
import { EmptyListProps } from '@/components/empty-list/empty-list.props'
import HyperText from '@/components/magicui/hyper-text'

export function EmptyList(props: EmptyListProps) {
  const { text, className } = props
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center h-[calc(100vh_-_30rem)] select-none pointer-events-none'
      )}
    >
      <HyperText
        className='text-5xl font-bold uppercase opacity-50'
        text={text}
      />
    </div>
  )
}
