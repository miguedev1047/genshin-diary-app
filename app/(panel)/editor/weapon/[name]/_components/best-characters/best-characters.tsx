import { GRID_LIST } from '@/consts/classes'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { CharacterItem } from '@/app/(panel)/editor/weapon/[name]/_components/best-characters/character-item'
import { CharacterSelector } from '@/app/(panel)/editor/weapon/[name]/_components/best-characters/character-selector'

export function BestCharacters() {
  const { data: WEAPON } = useGetWeaponByName()

  return (
    <EditorCard title='Mejores personajes'>
      <ul className={GRID_LIST}>
        {WEAPON?.bests_characters.map((character) => (
          <li
            key={character.character_id}
            className='relative'
          >
            <CharacterItem
              key={character.character_id}
              {...character}
            />
          </li>
        ))}

        <CharacterSelector />
      </ul>
    </EditorCard>
  )
}
