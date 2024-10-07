import { ArtifactItemProps } from '@/editor/character/[name]/artifacts/_components/artifact-item/artifact-item.type'
import { Card, CardContent } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { DEFAULT_IMAGE } from '@/consts/general'
import { SortableList } from '@/shared/components/sortable-list'
import { DeleteButton } from '@/shared/layouts/panel/delete-button'
import { deleteArtifact } from '@/editor/character/[name]/artifacts/_services/delete'
import { useGetArtifact } from '@/features/queries/panel/use-artifacts'
import { Trash2 } from 'lucide-react'
import Image from 'next/image'

export function ArtifactItem(props: ArtifactItemProps) {
  const { artifact_id, id } = props
  const { data: ARTIFACT, status } = useGetArtifact(artifact_id)

  if (status !== 'success') return <ItemLoader />

  return (
    <Card className='select-none'>
      <CardContent className='p-5 flex items-center justify-between gap-4'>
        <div className='flex items-center gap-4'>
          <DeleteButton
            itemId={id}
            onDelete={deleteArtifact}
          >
            <Trash2 />
          </DeleteButton>
          <figure className='aspect-square bg-secondary rounded-lg size-16'>
            <Image
              src={ARTIFACT?.image_url ?? DEFAULT_IMAGE}
              alt={ARTIFACT?.name ?? 'Artifact Image'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </figure>
          <p className='text-sm text-center'>{ARTIFACT?.name}</p>
        </div>

        <SortableList.DragHandle />
      </CardContent>
    </Card>
  )
}

function ItemLoader() {
  return (
    <Card className='p-0'>
      <CardContent className='p-5 flex items-center gap-4'>
        <Skeleton className='aspect-square bg-secondary rounded-lg size-16' />
        <Skeleton className='h-5 w-full max-w-[200px]' />
      </CardContent>
    </Card>
  )
}
