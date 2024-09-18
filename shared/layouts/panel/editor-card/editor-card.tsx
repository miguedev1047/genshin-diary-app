import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { EditorCardProps } from '@/shared/layouts/panel/editor-card/editor-card.type'

export function EditorCard(props: EditorCardProps) {
  const { title, description, renderForm, children } = props

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
      <CardContent className='p-6'>{children}</CardContent>
      <Separator />
    </Card>
  )
}
