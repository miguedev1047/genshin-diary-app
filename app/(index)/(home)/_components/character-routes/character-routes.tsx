import { GRID_LIST } from '@/consts/classes'
import { CharacterItem } from '@/app/(index)/(home)/_components/character-item'
import { CharacterRoutesProps } from '@/app/(index)/(home)/_components/character-routes/character-routes.type'

export function CharacterRoutes(props: CharacterRoutesProps) {
  const { data: CHARACTERS } = props

  if (!CHARACTERS?.length)
    return (
      <div className='p-20 h-20'>
        <p className='text-center text-2xl opacity-50 font-bold'>
          No hay personajes para mostrar
        </p>
      </div>
    )

  const MAPPED_CHARACTERS = CHARACTERS?.map((item) => (
    <li key={item.id}>
      <CharacterItem {...item} />
    </li>
  ))

  return <ul className={GRID_LIST}>{MAPPED_CHARACTERS}</ul>
}
