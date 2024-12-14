'use client'

import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import { updateTeams } from '@/editor/character/[name]/teams/_services/update'
import { TeamItem } from '@/editor/character/[name]/teams/_components/team-item'
import { useDrag } from '@/features/hooks/use-drag'

export function TeamSortableList() {
  const { data: CHARACTER } = useGetCharacter()
  const TEAMS = CHARACTER?.teams ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: TEAMS,
    updateFn: updateTeams,
  })

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      className='grid lg:grid-cols-2 gap-6'
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <TeamItem {...item} />
        </SortableList.Item>
      )}
    />
  )
}
