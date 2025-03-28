import { ViewCard } from '@/app/(index)/_components/view-card'
import { BestCharacterProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/best-characters/best-characters.type'
import { CharacterItem } from '@/app/(index)/(dynamic-routes)/weapon/[id]/best-characters/_components/characters-item'
import { CHARACTER_GRID_LIST } from '@/consts/classes'
import { Title } from '@/components/ui/title'

export function BestCharacter(props: BestCharacterProps) {
  const { data: WEAPON } = props
  const BEST_CHARACTERS = WEAPON.bests_characters ?? []

  if (!BEST_CHARACTERS?.length) {
    return (
      <div className='col-span-2'>
        <ViewCard title='Mejores personajes'>
          <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
            Arma sin sinergias
          </Title>
        </ViewCard>
      </div>
    )
  }

  const MAPPED_CHARACTERS = BEST_CHARACTERS.map((character) => (
    <li key={character.id}>
      <CharacterItem {...character} />
    </li>
  ))

  return (
    <div className='col-span-2'>
      <ViewCard title='Mejores personajes'>
        <ul className={CHARACTER_GRID_LIST}>{MAPPED_CHARACTERS}</ul>
      </ViewCard>
    </div>
  )
}
