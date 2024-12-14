import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { ArtifactForm } from '@/editor/character/[name]/artifacts/_components/artifact-form'
import { ArtifactList } from '@/editor/character/[name]/artifacts/_components/artifact-list/artifact-list'

export function Artifacts() {
  return (
    <EditorCard
      title='Mejores artefactos'
      renderForm={<ArtifactForm />}
    >
      <ArtifactList />
    </EditorCard>
  )
}
