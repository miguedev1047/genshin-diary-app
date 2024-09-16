'use client'

import { Loader } from '@/shared/components/loader'
import { useGetWeapon } from './_queries/use-get-weapon'
import { EditorWeaponInfo } from './_components/editor-weapon-info'

export function EditorContent() {
  const { status, error } = useGetWeapon()

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'error' || error) {
    return <Loader />
  }

  return (
    <section className='space-y-4'>
      <EditorWeaponInfo />
    </section>
  )
}
