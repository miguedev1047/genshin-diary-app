'use client'

import { useDrag } from '@/features/hooks/use-drag'
import { updateOrderTeams } from '@/app/(panel)/panel/teams/_services/update'
import { TeamItem } from '@/app/(panel)/panel/teams/_components/team-item'
import { TeamListProps } from '@/app/(panel)/panel/teams/_components/team-list/team-list.type'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { EMPTY_LIST } from '@/consts/misc'
import { EmptyList } from '@/components/empty-list'

export function TeamList(props: TeamListProps) {
  const { data: TEAMS } = props

  const ITEMS = TEAMS ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ITEMS,
    updateFn: updateOrderTeams,
  })

  if (!TEAMS || TEAMS.length === EMPTY_LIST) {
    return <EmptyList text='No hay equipos disponibles' />
  }

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      className='grid grid-cols-1 md:grid-cols-2 gap-4'
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <TeamItem {...item} />
        </SortableList.Item>
      )}
    />
  )
}
