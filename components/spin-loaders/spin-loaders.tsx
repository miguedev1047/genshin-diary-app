'use client'

import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { Loader } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { useTheme } from 'next-themes'
import { Bars } from 'react-loader-spinner'

export function SpinLoaderCard() {
  return (
    <Card className='p-5 w-full h-24 flex items-center'>
      <Loader className='animate-spin' />
    </Card>
  )
}

export function SpinLoaderSquareCard() {
  return (
    <Card className='size-20 aspect-square grid place-items-center'>
      <Loader className='animate-spin' />
    </Card>
  )
}

export function SpinAspectRatio() {
  return (
    <Card className='size-full aspect-[2/3] grid place-items-center'>
      <Loader className='animate-spin' />
    </Card>
  )
}

export function SpinLoaderInput() {
  return (
    <Card className='h-10 px-4 py-2'>
      <Loader className='animate-spin' />
    </Card>
  )
}

export function SpinLoaderButton() {
  return (
    <Button
      disabled
      size='icon'
    >
      <LoaderCircle
        className='animate-spin'
        size={16}
        strokeWidth={2}
        aria-hidden='true'
      />
    </Button>
  )
}

export function SpinLoaderContent() {
  const { theme } = useTheme()

  return (
    <div className='w-full h-[calc(100dvh_-_20rem)] grid place-items-center'>
      <Bars
        height='120'
        width='120'
        color={theme === 'dark' ? '#FFFFFF' : '#000000'}
        ariaLabel='bars-loading'
        wrapperStyle={{}}
        wrapperClass=''
        visible={true}
      />
    </div>
  )
}
