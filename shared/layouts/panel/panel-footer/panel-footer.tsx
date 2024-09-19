import { PAGE_NAME } from '@/consts/site'

export function PanelFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <div className='z-20 border-t border-border w-full bg-background/95 shadow backdrop-blur supports-[backdrop-filter]:bg-background/60'>
      <div className='mx-4 md:mx-8 flex h-14 items-center'>
        <p className='text-xs md:text-sm leading-loose text-muted-foreground text-left'>
          Admin Panel - {PAGE_NAME} {currentYear}
        </p>
      </div>
    </div>
  )
}
