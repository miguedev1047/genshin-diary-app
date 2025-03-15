'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { WeaponForm } from '@/app/(panel)/editor/character/[id]/weapons/_components/weapon-form'
import { WeaponList } from '@/app/(panel)/editor/character/[id]/weapons/_components/weapon-list'

export function Weapons() {
  return (
    <div className='col-span-1'>
      <EditorCard
        title='Mejores armas'
        renderForm={<WeaponForm />}
      >
        <WeaponList />
      </EditorCard>
    </div>
  )
}
