import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { EditorCardProps } from '@/shared/layouts/panel/editor-card/editor-card.type'
import { cn } from '@/lib/utils'

export function EditorCard(props: EditorCardProps) {
  const { title, description, renderForm, children, className } = props

  return (
    <Card className='relative overflow-clip'>
      <CardHeader>
        <div className='flex items-center justify-between gap-3'>
          <CardTitle>{title}</CardTitle>
          {renderForm}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className={cn('p-6', className)}>{children}</CardContent>
      <Separator />
    </Card>
  )
}
