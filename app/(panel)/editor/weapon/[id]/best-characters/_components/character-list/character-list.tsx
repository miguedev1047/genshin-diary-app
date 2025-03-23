'use client'

import { useGetWeapon } from '@/features/providers/weapon-provider'
import { CharacterItem } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-item/character-item'
import { GENERAL_GRID_LIST } from '@/consts/classes'

export function CharacterList() {
  const { data: WEAPON } = useGetWeapon()
  const CHARACTER_LIST = WEAPON?.bests_characters

  if (!CHARACTER_LIST?.length) {
    return (
      <div className='p-20 h-20'>
        <p className='text-2xl uppercase font-bold text-center opacity-50'>
          Agrega un personaje
        </p>
      </div>
    )
  }

  const MAPPED_BEST_CHARACTERS = CHARACTER_LIST.map((character) => (
    <li
      key={character.id}
      className='relative'
    >
      <CharacterItem {...character} />
    </li>
  ))

  return <ul className={GENERAL_GRID_LIST}>{MAPPED_BEST_CHARACTERS}</ul>
}
