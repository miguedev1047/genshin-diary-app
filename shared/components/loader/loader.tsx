'use client'

import { useTheme } from 'next-themes'
import { Bars } from 'react-loader-spinner'

export function Loader() {
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
