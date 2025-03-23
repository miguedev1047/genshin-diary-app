import { cn } from '@/lib/utils'
import GridPattern from '@/components/magicui/grid-pattern'

export function GridBackground() {
  return (
    <GridPattern
      x={-1}
      y={-1}
      strokeDasharray={'4 4'}
      className={cn(
        'opacity-40 inset-0 absolute size-full pointer-events-none'
      )}
    />
  )
}
