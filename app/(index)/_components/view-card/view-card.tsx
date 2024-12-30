import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import { ViewCardProps } from '@/app/(index)/_components/view-card/view-card.type'

export function ViewCard(props: ViewCardProps) {
  const { title, description, children, className } = props

  return (
    <Card className='relative overflow-clip'>
      <CardHeader>
        <div className='flex items-center justify-between gap-3'>
          <CardTitle className='h-10 flex items-center'>{title}</CardTitle>
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <Separator />
      <CardContent className={cn('p-6', className)}>{children}</CardContent>
    </Card>
  )
}
