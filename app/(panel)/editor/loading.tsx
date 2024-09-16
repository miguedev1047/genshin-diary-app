import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { Loader2 } from 'lucide-react'

export default function EditarWeaponLoading() {
  return (
    <ContentLayout title='Cargando...'>
      <div className='h-[calc(100vh_-_20rem)] grid place-items-center'>
        <Loader2 className='w-16 h-16 animate-spin' />
      </div>
    </ContentLayout>
  )
}
