import { Loader } from '@/shared/components/loader'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'

export default function EditarWeaponLoading() {
  return (
    <ContentLayout title='Cargando...'>
      <Loader />
    </ContentLayout>
  )
}
