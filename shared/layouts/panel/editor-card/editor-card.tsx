import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { EditorCardProps } from '@/shared/layouts/panel/editor-card/editor-card.type'

export function EditorCard(props: EditorCardProps) {
  const { title, description, formId, disabled, isLoading, children } = props

  return (
    <Card className='relative overflow-clip'>
      <CardHeader>
        <div className='flex items-center justify-between gap-4'>
          <CardTitle>{title}</CardTitle>

          <Button
            type='submit'
            form={formId}
            disabled={isLoading || disabled}
            className='space-x-4'
          >
            Guardar
          </Button>
        </div>

        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='p-6'>{children}</CardContent>
      <Separator />
    </Card>
  )
}
