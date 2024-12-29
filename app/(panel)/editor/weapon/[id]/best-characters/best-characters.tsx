import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { BestCharactersForm } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/best-characters-form'
import { CharacterList } from '@/app/(panel)/editor/weapon/[id]/best-characters/_components/character-list'

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
