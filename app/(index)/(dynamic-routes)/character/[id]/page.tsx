import BlurFade from '@/components/magicui/blur-fade'
import { redirect } from 'next/navigation'
import { getCharacters } from '@/app/(index)/(dynamic-routes)/character/[id]/_services/fetch'
import { PageProps } from '@/app/(index)/(dynamic-routes)/character/[id]/_types'
import { PAGE_NAME } from '@/consts/misc'
import { TracingBeam } from '@/components/ui/tracing-beam'
import { CharacterInfo } from '@/app/(index)/(dynamic-routes)/character/[id]/character-info'
import { Ascensions } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/ascensions'
import { AscensionTalents } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent'
import { Artifacts } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts'
import { Weapons } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons'
import { StatsPriority } from '@/app/(index)/(dynamic-routes)/character/[id]/stats-priority'
import { VideoGuide } from '@/app/(index)/(dynamic-routes)/character/[id]/video-guide'
import { Teams } from '@/app/(index)/(dynamic-routes)/character/[id]/teams'
import { Skills } from '@/app/(index)/(dynamic-routes)/character/[id]/skills'

export async function generateMetadata(props: PageProps) {
  const { params } = props

  const CHARACTER_ID = params.id
  const CHARACTER = await getCharacters(CHARACTER_ID)

  if (!CHARACTER) return { title: `${PAGE_NAME} - Indefinido` }

  return {
    title: `${PAGE_NAME} - ${CHARACTER.name}`,
    description: `Guia informativa de ${CHARACTER.name}`,
  }
}

export default async function CharacterPage(props: PageProps) {
  const { params } = props

  const CHARACTER_ID = params.id
  const CHARACTER = await getCharacters(CHARACTER_ID)

  if (!CHARACTER) return redirect('/')

  return (
    <BlurFade delay={0.2}>
      <TracingBeam className='px-6 max-w-full'>
        <section className='space-y-16 gap-x-5 grid grid-cols-2 relative'>
          <CharacterInfo data={CHARACTER} />
          <Ascensions data={CHARACTER} />
          <AscensionTalents data={CHARACTER} />
          <Artifacts data={CHARACTER} />
          <Weapons data={CHARACTER} />
          <StatsPriority data={CHARACTER} />
          <Teams data={CHARACTER} />
          <Skills data={CHARACTER} />
          <VideoGuide data={CHARACTER} />
        </section>
      </TracingBeam>
    </BlurFade>
  )
}
