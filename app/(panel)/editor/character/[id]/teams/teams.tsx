import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { TeamSortableList } from '@/app/(panel)/editor/character/[id]/teams/_components/team-sortable-list'
import { TeamForm } from '@/app/(panel)/editor/character/[id]/teams/_components/team-form'

export function Teams() {
  return (
    <div className='col-span-2'>
      <EditorCard
        title='Mejores equipos'
        renderForm={<TeamForm />}
      >
        <TeamSortableList />
      </EditorCard>
    </div>
  )
}
