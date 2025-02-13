'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TeamItemProps } from '@/app/(panel)/editor/character/[id]/teams/_components/team-item/team-item.type'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { updateTeamCharacters } from '@/app/(panel)/editor/character/[id]/teams/_services/update'
import { deleteTeamCharacter } from '@/app/(panel)/editor/character/[id]/teams/_services/delete'
import { CharacterItem } from '@/app/(panel)/editor/character/[id]/teams/_components/character-item'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { TeamNameForm } from '@/app/(panel)/editor/character/[id]/teams/_components/team-name-form'
import { useDrag } from '@/features/hooks/use-drag'
import { Trash2 } from 'lucide-react'
import { SpinLoaderCard } from '@/components/spin-loaders'
import { Suspense } from 'react'

export function TeamItem(props: TeamItemProps) {
  const { characters, id } = props

  const { orderedItems, handleDragEnd } = useDrag({
    items: characters,
    updateFn: updateTeamCharacters,
  })

  return (
    <Card>
      <CardHeader>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex items-center gap-3'>
            <DeleteButton
              itemId={id}
              onDelete={deleteTeamCharacter}
            >
              <Trash2 />
            </DeleteButton>
            <CardTitle className='text-lg'>
              <TeamNameForm {...props} />
            </CardTitle>
          </div>
          <SortableList.DragHandle />
        </div>
      </CardHeader>
      <CardContent>
        <SortableList
          items={orderedItems}
          onDragEnd={handleDragEnd}
          renderItem={(item) => (
            <SortableList.Item id={item.id}>
              <Suspense fallback={<SpinLoaderCard />}>
                <CharacterItem {...item} />
              </Suspense>
            </SortableList.Item>
          )}
        />
      </CardContent>
    </Card>
  )
}
