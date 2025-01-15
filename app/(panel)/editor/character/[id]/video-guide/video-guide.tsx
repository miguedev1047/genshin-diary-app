'use client'

import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { useGetCharacter } from '@/features/providers/character-provider'
import { VideoGuideForm } from '@/app/(panel)/editor/character/[id]/video-guide/_components/video-guide-form'
import { NONE } from '@/consts/misc'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'
import Link from 'next/link'

export function VideoGuide() {
  const { data: CHARACTER } = useGetCharacter()
  const VIDEO_GUIDE = CHARACTER?.video_guide

  const VIDEO_ID = VIDEO_GUIDE?.embed_video_url?.split('=')[1] ?? NONE
  const YOUTUBE_URL = `https://www.youtube.com/${VIDEO_GUIDE?.youtuber_channel}`

  return (
    <EditorCard
      title='Video guia'
      renderForm={<VideoGuideForm />}
    >
      {!VIDEO_GUIDE && (
        <h2 className='text-2xl font-bold uppercase py-20 opacity-70 mx-auto text-center'>
          No hay video guia para mostrar
        </h2>
      )}

      {VIDEO_GUIDE && (
        <article className='space-y-8'>
          <h2>
            {CHARACTER.name} Video Guia por{' '}
            <Link
              href={YOUTUBE_URL}
              className='text-sky-600 dark:text-sky-300 underline'
              target='_blank'
              rel='noreferrer'
            >
              {VIDEO_GUIDE.youtuber_name}
            </Link>
          </h2>

          <div className='rounded-xl overflow-hidden'>
            <LiteYouTubeEmbed
              id={VIDEO_ID}
              title={`Video guia: ${CHARACTER?.name}`}
            />
          </div>
        </article>
      )}
    </EditorCard>
  )
}
