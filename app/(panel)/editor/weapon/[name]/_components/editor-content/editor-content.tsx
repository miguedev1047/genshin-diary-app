'use client'

import { Loader } from '@/shared/components/loader'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { WeaponInfo } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-info'
import { BestWeaponCharacters } from '@/app/(panel)/editor/weapon/[name]/_components/best-characters'


export function EditorContent() {
  const { status } = useGetWeaponByName()

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'error') {
    return <Loader />
  }

  return (
    <section className='space-y-4'>
      <WeaponInfo />
      <BestWeaponCharacters />
    </section>
  )
}
