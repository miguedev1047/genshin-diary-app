import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { BestCharactersForm } from '@/editor/weapon/[name]/best-characters/_components/best-characters-form'
import { CharacterList } from '@/editor/weapon/[name]/best-characters/_components/character-list'

export function BestCharacters() {
  return (
    <EditorCard
      title='Mejores personajes'
      renderForm={<BestCharactersForm />}
    >
      <CharacterList />
    </EditorCard>
  )
}
