import { ContentLayoutProps } from '@/shared/layouts/panel/content-layout/content-layout.type'
import { PanelNavbar } from '@/shared/layouts/panel/panel-navbar'
import { cn } from '@/lib/utils'

export function ContentLayout(props: ContentLayoutProps) {
  const { title, children, className } = props

  return (
    <div>
      <PanelNavbar title={title} />
      <div
        className={cn('mx-auto container pt-8 pb-8 px-4 sm:px-8', className)}
      >
        {children}
      </div>
    </div>
  )
}
