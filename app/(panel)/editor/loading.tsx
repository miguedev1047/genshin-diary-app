
import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { SpinLoaderContent } from '@/components/spin-loaders'

export default function EditarWeaponLoading() {
  return (
    <ContentLayout title='Cargando...'>
      <SpinLoaderContent />
    </ContentLayout>
  )
}
