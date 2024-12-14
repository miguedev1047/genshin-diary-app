import GridPattern from '@/components/magicui/grid-pattern'
import { cn } from '@/lib/utils'

export function GridBackground() {
  return (
    <GridPattern
      x={-1}
      y={-1}
      strokeDasharray={'4 4'}
      className={cn(
        '[mask-image:radial-gradient(1280px_circle_at_center,white,transparent)] fixed inset-0 z-0'
      )}
    />
  )
}
