import { cn } from '@/lib/utils'
import { EmptyListProps } from '@/components/empty-list/empty-list.props'
import HyperText from '@/components/magicui/hyper-text'
import { Title } from '../ui/title'

export function EmptyList(props: EmptyListProps) {
  const { text, className } = props
  return (
    <div
      className={cn(
        className,
        'flex items-center justify-center h-[calc(100vh_-_30rem)] select-none pointer-events-none'
      )}
    >
      <Title className='text-5xl font-bold uppercase opacity-50'>{text}</Title>
    </div>
  )
}
