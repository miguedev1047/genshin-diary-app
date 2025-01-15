import { ArtifactItemProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-item/artifact-item.type'
import { Card, CardContent } from '@/components/ui/card'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { SortableList } from '@/app/(panel)/_components/sortable-list'
import { DeleteButton } from '@/app/(panel)/_components/delete-button'
import { deleteArtifact } from '@/app/(panel)/editor/character/[id]/artifacts/_services/delete'
import { useGetArtifact } from '@/features/queries/use-artifacts'
import { Trash2 } from 'lucide-react'
import { SpinLoaderCard } from '@/components/spin-loaders'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'

export function ArtifactItem(props: ArtifactItemProps) {
  const { artifact_id, id } = props

  const { data: ARTIFACT, status } = useGetArtifact(artifact_id)
  if (status === 'pending') return <SpinLoaderCard />
  if (status === 'error') return <SpinLoaderCard />

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <SquareBox size='sm'>
            <Image
              src={ARTIFACT?.image_url ?? DEFAULT_IMAGE}
              alt={ARTIFACT?.name ?? 'Artifact Image'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </SquareBox>
          <p className='text-sm text-center'>{ARTIFACT?.name}</p>
        </div>

        <div className='flex items-center gap-2'>
          <DeleteButton
            itemId={id}
            onDelete={deleteArtifact}
          >
            <Trash2 />
          </DeleteButton>

          <SortableList.DragHandle />
        </div>
      </CardContent>
    </Card>
  )
}
