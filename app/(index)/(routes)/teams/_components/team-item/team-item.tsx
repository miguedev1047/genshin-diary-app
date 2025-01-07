import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamItemProps } from '@/app/(index)/(routes)/teams/_components/team-item/team-item.type'
import { CharacterItem } from '@/app/(index)/(routes)/teams/_components/character-item'

export function TeamItem(props: TeamItemProps) {
  const { characters, name } = props

  const MAPPED_CHARACTERS = characters.map((character) => (
    <li key={character.id}>
      <CharacterItem {...character} />
    </li>
  ))

  return (
    <Card>
      <CardHeader>
        <CardTitle className='text-lg'>{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className='grid grid-cols-4 gap-4'>{MAPPED_CHARACTERS}</ul>
      </CardContent>
    </Card>
  )
}
