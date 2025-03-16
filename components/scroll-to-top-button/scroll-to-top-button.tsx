'use client'

import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollToTop } from '@/features/hooks/use-scroll-top'
import { ScrollToTopButtonProps } from '@/components/scroll-to-top-button/scroll-to-top-button.type'
import { cn } from '@/lib/utils'
import { DEV_MODE } from '@/consts/misc'

export function ScrollToTopButton(props: ScrollToTopButtonProps) {
  const { threshold = 0, className } = props

  const topRef = useRef<HTMLDivElement>(null)
  const { showButton, scrollToTop } = useScrollToTop({
    threshold,
    targetRef: topRef,
  })

  return (
    <>
      <div
        ref={topRef}
        className='absolute top-0 h-1 w-1'
      />

      <Button
        size='icon'
        variant='secondary'
        className={cn(
          DEV_MODE ? 'right-20' : 'right-8',
          'fixed bottom-8 z-50 rounded-full shadow-md transition-all duration-300',
          showButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none',
          className
        )}
        onClick={scrollToTop}
        aria-label='Deslizar hacia arriba'
      >
        <ArrowUp className='h-5 w-5' />
      </Button>
    </>
  )
}
