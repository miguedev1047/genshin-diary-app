'use client'

import { VideoGuideCardProps } from '@/app/(index)/(dynamic-routes)/character/[id]/video-guide/_components/video-guide-card/video-guide-card.type'
import { NONE } from '@/consts/misc'
import { ViewCard } from '@/app/(index)/_components/view-card'
import { Title } from '@radix-ui/react-toast'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import Link from 'next/link'

import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export function VideoGuideCard(props: VideoGuideCardProps) {
  const { embed_video_url, youtuber_channel, youtuber_name } = props

  const VIDEO_ID = embed_video_url?.split('=')[1] ?? NONE
  const YOUTUBE_URL = youtuber_channel

  return (
    <ViewCard title='Video guia'>
      <article className='space-y-8'>
        <Title>
          {youtuber_name} Video Guía por{' '}
          <Link
            href={YOUTUBE_URL}
            className='text-sky-600 dark:text-sky-300 underline'
            target='_blank'
            rel='noreferrer'
          >
            {youtuber_name}
          </Link>
        </Title>

        <div className='rounded-xl overflow-hidden'>
          <LiteYouTubeEmbed
            id={VIDEO_ID}
            title={`Video guía: ${youtuber_name}`}
          />
        </div>
      </article>
    </ViewCard>
  )
}
