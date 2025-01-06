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
      <CardHeader>
        <CardTitle className='text-lg'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {MAPPED_CHARACTERS}
        </ul>
      </CardContent>
    </Card>
  )
}
