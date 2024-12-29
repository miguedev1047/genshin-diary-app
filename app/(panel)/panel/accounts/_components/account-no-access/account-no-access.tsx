import { ContentLayout } from '@/app/(panel)/_components/content-layout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function AccountNoAccess() {
  return (
    <ContentLayout title='Sin acceso'>
      <div className='w-full h-[calc(100dvh_-_20rem)] grid place-items-center'>
        <article className='space-y-4 flex flex-col justify-center'>
          <h2 className='text-5xl font-extrabold opacity-70 uppercase'>
            No tienes acceso
          </h2>

          <Button asChild>
            <Link
              href='/panel'
              className='mx-auto'
            >
              Volver
            </Link>
          </Button>
        </article>
      </div>
    </ContentLayout>
  )
}
