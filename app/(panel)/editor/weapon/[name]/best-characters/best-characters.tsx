'use client'

import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { GRID_LIST } from '@/consts/classes'
import { BestCharactersForm } from '@/editor/weapon/[name]/best-characters/_components/best-characters-form'
import { useGetWeapon } from '@/editor/weapon/[name]/provider'
import { CharacterItem } from '@/editor/weapon/[name]/best-characters/_components/character-item'

const MIN_ITEMS = 0

export function BestCharacters() {
  const { data: WEAPON } = useGetWeapon()

  const NO_ITEMS = WEAPON?.bests_characters.length === MIN_ITEMS && (
    <p className='text-2xl uppercase font-extrabold text-center py-20 opacity-70 col-span-6'>
      Agrega un personaje
    </p>
  )

  const BEST_CHARACTERS = WEAPON?.bests_characters.map((character) => (
    <li
      key={character.id}
      className='relative'
    >
      <CharacterItem {...character} />
    </li>
  ))

  return (
    <EditorCard
      title='Mejores personajes'
      renderForm={<BestCharactersForm />}
    >
      <ul className={GRID_LIST}>
        {BEST_CHARACTERS}
        {NO_ITEMS}
      </ul>
    </EditorCard>
  )
}
