import { IndexItem } from '@/app/(panel)/panel/index/_components/index-item'
import { PANEL_ROUTES } from '@/consts/general'

export function IndexRoutes() {
  return (
    <ol className='col-span-8 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-4'>
      {PANEL_ROUTES.map((data) => (
        <IndexItem key={data.title} {...data} />
      ))}
    </ol>
  )
}
