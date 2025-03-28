import { ArtifactsProps } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/artifacts.type'
import { ViewCard } from '@/app/(index)/_components/view-card'
import { ArtifactSetList } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts/_components/artifact-set-list'
import { Title } from '@/components/ui/title'

export function Artifacts(props: ArtifactsProps) {
  const { data } = props
  const ARTIFACTS = data.artifacts ?? []

  if (!ARTIFACTS.length) {
    return (
      <ViewCard title='Mejores artefactos'>
        <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
          No hay elementos para mostrar
        </Title>
      </ViewCard>
    )
  }

  const MAPPED_ARTIFACTS = ARTIFACTS.map((artifact) => (
    <li key={artifact.id}>
      <ArtifactSetList {...artifact} />
    </li>
  ))

  return (
    <div className='col-span-2'>
      <ViewCard
        title='Mejores artefactos'
        helper
      >
        <ul className='grid gap-4'>{MAPPED_ARTIFACTS}</ul>
      </ViewCard>
    </div>
  )
}
