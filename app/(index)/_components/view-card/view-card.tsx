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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Info } from 'lucide-react'

export function ViewCard(props: ViewCardProps) {
  const { title, description, children, className, helper = false } = props

  return (
    <Card className='relative overflow-clip'>
      <CardHeader className='max-md:p-4'>
        <div className='flex items-center justify-between gap-3'>
          <CardTitle className='h-8 md:h-10 flex items-center text-[17.5px] md:text-lg uppercase'>
            {title}
          </CardTitle>
          {helper && (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  size='icon'
                  variant='outline'
                >
                  <Info />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <p>
                  Esta configuración se basa en los artefactos y armas más
                  utilizados por la comunidad.
                </p>
              </PopoverContent>
            </Popover>
          )}
        </div>
        {description && <CardDescription>{description}</CardDescription>}
      </CardHeader>
      <Separator />
      <CardContent className={cn('p-4 md:p-6', className)}>
        {children}
      </CardContent>
    </Card>
  )
}
