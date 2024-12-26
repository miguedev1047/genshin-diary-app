import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const tittleVariants = cva('', {
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

export interface TittleProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof tittleVariants> {}

const Tittle = React.forwardRef<HTMLHeadingElement, TittleProps>(
  ({ className, size, ...props }, ref) => (
    <h2
      className={cn(tittleVariants({ size, className }))}
      ref={ref}
      {...props}
    />
  )
)
Tittle.displayName = 'Tittle'

export { Tittle }
