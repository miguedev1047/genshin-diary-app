import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamItemProps } from '@/app/(panel)/panel/teams/_components/team-item/team-item.type'
import { CharacterList } from '@/app/(panel)/panel/teams/_components/character-list'
import { TeamNameForm } from '@/app/(panel)/panel/teams/_components/team-name-form'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteTeam } from '@/app/(panel)/panel/teams/_services/delete'
import { Trash2 } from 'lucide-react'

export function TeamItem(props: TeamItemProps) {
  const { characters, id } = props

  return (
    <Card>
      <CardHeader className='flex flex-row items-center justify-between gap-4'>
        <CardTitle>
          <TeamNameForm {...props} />
        </CardTitle>
        <div className='flex items-center gap-2'>
          <SortableList.DragHandle />

          <DeleteButton
            itemId={id}
            onDelete={deleteTeam}
          >
            <Trash2 />
          </DeleteButton>
        </div>
      </CardHeader>
      <CardContent>
        <CharacterList characters={characters} />
      </CardContent>
    </Card>
  )
}
