import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export function Back() {
  return (
    <Button
      variant='gooeyLeft'
      asChild
      className='absolute top-8 left-8'
    >
      <Link href={'/'}>Volver</Link>
    </Button>
  )
}
