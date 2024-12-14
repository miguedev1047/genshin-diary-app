'use client'

import { useGetWeapon } from '@/editor/weapon/[name]/provider'
import { CharacterItem } from '@/editor/weapon/[name]/best-characters/_components/character-item/character-item'
import { GRID_LIST } from '@/consts/classes'

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

  return <ul className={GRID_LIST}>{MAPPED_BEST_CHARACTERS}</ul>
}
