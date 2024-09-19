'use client'

import { Loader } from '@/shared/components/loader'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { WeaponInfo } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-info'
import { BestCharacters } from '@/app/(panel)/editor/weapon/[name]/_components/best-characters'
import { Ascension } from '@/app/(panel)/editor/weapon/[name]/_components/weapon-ascension'
import { useRouter } from 'next/navigation'

export function EditorContent() {
  const { push } = useRouter()
  const { status } = useGetWeaponByName()

  if (status === 'pending') {
    return <Loader />
  }

  if (status === 'error') {
    return push('/panel/weapons')
  }

  return (
    <section className='space-y-4'>
      <WeaponInfo />
      <BestCharacters />
      <Ascension />
    </section>
  )
}
