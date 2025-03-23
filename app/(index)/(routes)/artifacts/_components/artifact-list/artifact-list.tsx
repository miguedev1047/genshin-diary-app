import { EmptyList } from '@/components/empty-list'
import { ArtifactListProps } from '@/app/(index)/(routes)/artifacts/_components/artifact-list/artifact-list.type'
import { ArtifactItem } from '@/app/(index)/(routes)/artifacts/_components/artifact-item'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ITEMS_GRID_LIST } from '@/consts/classes'

export function ArtifactList(props: ArtifactListProps) {
  const { data: ARTIFACTS } = props

  if (!ARTIFACTS || !ARTIFACTS.length) {
    return <EmptyList text='No hay artefactos disponibles' />
  }

  const MAPPED_ARTIFACTS = ARTIFACTS.map((artifact) => (
    <li key={artifact.id}>
      <ArtifactItem {...artifact} />
    </li>
  ))

  return (
    <TooltipProvider>
      <ul className={ITEMS_GRID_LIST}>{MAPPED_ARTIFACTS}</ul>
    </TooltipProvider>
  )
}
