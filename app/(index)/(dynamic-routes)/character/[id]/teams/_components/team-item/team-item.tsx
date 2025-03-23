import { TeamItemProps } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/team-item/team-item.type'
import { CharacterItem } from '@/app/(index)/(dynamic-routes)/character/[id]/teams/_components/character-item'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function TeamItem(props: TeamItemProps) {
  const { characters, name } = props

  const MAPPED_CHARACTERS = characters.map((character) => (
    <li
      key={character.id}
      className='space-y-2'
    >
      <CharacterItem {...character} />
    </li>
  ))

  return (
    <Card>
      <CardHeader className='max-md:p-3'>
        <CardTitle className='text-base md:text-lg'>{name}</CardTitle>
      </CardHeader>
      <CardContent className='max-md:px-3 max-md:pb-3'>
        <ul className='grid grid-cols-4 gap-2 md:gap-4'>{MAPPED_CHARACTERS}</ul>
      </CardContent>
    </Card>
  )
}
