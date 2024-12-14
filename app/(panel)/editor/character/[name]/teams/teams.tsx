import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { TeamSortableList } from '@/editor/character/[name]/teams/_components/team-sortable-list'
import { TeamForm } from '@/editor/character/[name]/teams/_components/team-form'

export function Teams() {
  return (
    <EditorCard
      title='Mejores equipos'
      renderForm={<TeamForm />}
    >
      <TeamSortableList />
    </EditorCard>
  )
}
