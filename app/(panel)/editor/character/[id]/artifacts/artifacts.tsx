import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { ArtifactForm } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-form'
import { ArtifactList } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-list/artifact-list'

export function Artifacts() {
  return (
    <div className='col-span-2'>
      <EditorCard
        title='Mejores artefactos'
        renderForm={<ArtifactForm />}
      >
        <ArtifactList />
      </EditorCard>
    </div>
  )
}
