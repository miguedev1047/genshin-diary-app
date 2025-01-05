import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const titleVariants = cva('text-balance', {
  variants: {
    size: {
      xs: 'text-xs font-light',
      sm: 'text-sm font-light',
      md: 'text-base font-normal',
      default: 'text-base font-normal',
      lg: 'text-lg font-medium',
      xl: 'text-xl font-semibold',
      '2xl': '!text-2xl font-bold',
      '3xl': '!text-3xl font-bold',
    },
    type: {
      default: '',
      balance: 'text-balance',
      pretty: 'text-pretty',
    },
  },
  defaultVariants: {
    size: 'default',
    type: 'default',
  },
})

export interface TitleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof titleVariants> {}

const Title = React.forwardRef<HTMLHeadingElement, TitleProps>(
  ({ className, size, ...props }, ref) => (
    <h2
      className={cn(titleVariants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Title.displayName = 'Title'

export { Title }
