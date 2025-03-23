import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ArtifactItemProps } from '@/app/(panel)/editor/character/[id]/artifacts/_components/artifact-set-item/artifact-set-item.type'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { SquareBox } from '@/components/square-box'
import { useGetData } from '@/features/providers/data-provider'
import Image from 'next/image'

export function ArtifactSetItem(props: ArtifactItemProps) {
  const { artifact_id } = props
  const { data } = useGetData()

  const { artifacts } = data
  const ARTIFACT = artifacts?.find((artifact) => artifact.id === artifact_id)

  if (!ARTIFACT) return null

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SquareBox size='lg'>
            <Image
              src={ARTIFACT.image_url ?? DEFAULT_IMAGE}
              alt={ARTIFACT.name}
              width={1080}
              height={1080}
              className='object-contain size-full'
            />
          </SquareBox>
        </TooltipTrigger>
        <TooltipContent side='bottom'>
          <p>{ARTIFACT.name}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
