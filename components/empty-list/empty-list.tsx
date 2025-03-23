import { EmptyListProps } from '@/components/empty-list/empty-list.props'
import { cn } from '@/lib/utils'

export function EmptyList(props: EmptyListProps) {
  const { text, className } = props
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center h-[calc(100dvh_-_15rem)] md:h-[calc(100dvh_-_30rem)] select-none pointer-events-none px-2 md:px-4'
      )}
    >
      <h3 className='text-2xl md:text-5xl font-bold uppercase text-center text-balance opacity-50'>{text}</h3>
    </div>
  )
}
