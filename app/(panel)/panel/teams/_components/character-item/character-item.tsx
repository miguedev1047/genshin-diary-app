import { CharacterItemProps } from '@/app/(panel)/panel/teams/_components/character-item/character-item.type'
import { useGetCharacter } from '@/features/queries/use-characters'
import { Card, CardContent } from '@/components/ui/card'
import { SquareBox } from '@/components/square-box'
import { ConstellationForm } from '@/app/(panel)/panel/teams/_components/constellation-form'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { Badge } from '@/components/ui/badge'
import { SpinLoaderCard } from '@/components/spin-loaders'

export function CharacterItem(props: CharacterItemProps) {
  const { character_id, constellation, id, team_id } = props
  
  const { data: CHARACTER, status } = useGetCharacter(character_id)
  if (status === 'pending') return <SpinLoaderCard />
  if (status === 'error') return <SpinLoaderCard />

  const DATA = {
    character: CHARACTER,
    itemId: id,
    teamId: team_id,
    constellation,
  }

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <Badge>C{constellation}</Badge>

          <div className='flex items-center gap-4'>
            <SquareBox
              size='sm'
              className='hover:scale-110 transition-transform ease-in-out duration-200 cursor-pointer'
            >
              <ConstellationForm {...DATA} />
            </SquareBox>

            <p className='text-sm text-center'>{CHARACTER?.name}</p>
          </div>
        </div>

        <SortableList.DragHandle />
      </CardContent>
    </Card>
  )
}
