import { VideoGuideProps } from '@/app/(index)/(dynamic-routes)/character/[id]/video-guide/video-guide.type'
import { VideoGuideCard } from '@/app/(index)/(dynamic-routes)/character/[id]/video-guide/_components/video-guide-card'
import { ViewCard } from '@/app/(index)/_components/view-card'
import { Title } from '@/components/ui/title'

export function VideoGuide(props: VideoGuideProps) {
  const { data } = props
  const VIDEO_GUIDE = data?.video_guide

  if (!VIDEO_GUIDE)
    return (
      <div className='col-span-2'>
        <ViewCard title='Video guía'>
          <Title className='text-center py-20 text-2xl opacity-70 font-extrabold uppercase'>
            No hay elementos para mostrar
          </Title>
        </ViewCard>
      </div>
    )

  return (
    <div className='col-span-2'>
      <VideoGuideCard {...VIDEO_GUIDE} />
    </div>
  )
}
