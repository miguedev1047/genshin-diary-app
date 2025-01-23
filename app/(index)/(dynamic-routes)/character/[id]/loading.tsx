import { ScrollToTop } from '@/components/scroll-to-top'
import { SpinLoaderContent } from '@/components/spin-loaders'

export default function Loading() {
  return (
    <>
      <SpinLoaderContent />
      <ScrollToTop />
    </>
  )
}
