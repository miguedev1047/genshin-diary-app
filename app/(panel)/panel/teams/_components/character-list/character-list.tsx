import { useDrag } from '@/features/hooks/use-drag'
import { CharacterListProps } from '@/app/(panel)/panel/teams/_components/character-list/character-list.type'
import { updateOrderCharacters } from '@/app/(panel)/panel/teams/_services/update'
import { CharacterItem } from '@/app/(panel)/panel/teams/_components/character-item'
import { SortableList } from '@/app/(panel)/_components/sortable-list'

export function CharacterList(props: CharacterListProps) {
  const { characters } = props

  const ITEMS = characters ?? []

  const { orderedItems, handleDragEnd } = useDrag({
    items: ITEMS,
    updateFn: updateOrderCharacters,
  })

  return (
    <SortableList
      items={orderedItems}
      onDragEnd={handleDragEnd}
      className='grid gap-4'
      renderItem={(item) => (
        <SortableList.Item id={item.id}>
          <CharacterItem {...item} />
        </SortableList.Item>
      )}
    />
  )
}
