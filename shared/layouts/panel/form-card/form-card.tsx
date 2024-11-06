import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { FormCardProps } from '@/shared/layouts/panel/form-card/form-card.type'

export function FormCard(props: FormCardProps) {
  const {
    title,
    description,
    formId,
    isEditing,
    disabled,
    isLoading,
    children,
  } = props

  return (
    <Card className='relative'>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <Separator />
      <CardContent className='p-6'>{children}</CardContent>
      <Separator />
      <CardFooter className='w-full p-6'>
        <Button
          type='submit'
          form={formId}
          disabled={isLoading || disabled}
          className='w-full'
        >
          {isEditing ? 'Guardar' : 'Crear'}
        </Button>
      </CardFooter>
    </Card>
  )
}
