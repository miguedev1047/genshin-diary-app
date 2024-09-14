import { GRID_LIST } from '@/consts/classes'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { getCharacters } from '@/app/(panel)/panel/characters/_services/fetch'
import { CharacterItem } from '@/app/(panel)/panel/characters/_components/character-item'
import { CharacterFilter } from '@/shared/filters/character-filter'
import { Card } from '@/components/ui/card'

export default async function PanelCharactersPage(props: any) {
  const { searchParams: PARAMS } = props
  const CHARACTERS = await getCharacters(PARAMS)

  const ITEMS = CHARACTERS?.map((item) => (
    <li key={item.id}>
      <CharacterItem {...item} />
    </li>
  ))

  return (
    <ContentLayout
      title='Personajes'
      className='space-y-6'
    >
      <Card className='p-6 space-y-4'>
        <CharacterFilter />
      </Card>

      <ul className={GRID_LIST}>{ITEMS}</ul>
    </ContentLayout>
  )
}
