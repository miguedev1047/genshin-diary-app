'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { WeaponForm } from '@/editor/character/[name]/weapons/_components/weapon-form'
import { WeaponList } from '@/editor/character/[name]/weapons/_components/weapon-list'

export function Weapons() {
  return (
    <EditorCard
      title='Mejores armas'
      renderForm={<WeaponForm />}
    >
      <WeaponList />
    </EditorCard>
  )
}
