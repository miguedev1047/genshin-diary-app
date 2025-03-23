import { getCharacterById } from '@/app/(index)/(dynamic-routes)/character/[id]/_services/fetch'
import { redirect } from 'next/navigation'
import { PageProps } from '@/app/(index)/(dynamic-routes)/character/[id]/_types'
import { DEFAULT_IMAGE, PAGE_NAME } from '@/consts/misc'
import { CharacterInfo } from '@/app/(index)/(dynamic-routes)/character/[id]/character-info'
import { Ascensions } from '@/app/(index)/(dynamic-routes)/character/[id]/ascensions/ascensions'
import { AscensionTalents } from '@/app/(index)/(dynamic-routes)/character/[id]/ascension-talent'
import { Artifacts } from '@/app/(index)/(dynamic-routes)/character/[id]/artifacts'
import { Weapons } from '@/app/(index)/(dynamic-routes)/character/[id]/weapons'
import { StatsPriority } from '@/app/(index)/(dynamic-routes)/character/[id]/stats-priority'
import { VideoGuide } from '@/app/(index)/(dynamic-routes)/character/[id]/video-guide'
import { Teams } from '@/app/(index)/(dynamic-routes)/character/[id]/teams'
import { Skills } from '@/app/(index)/(dynamic-routes)/character/[id]/skills'
import { AlertError } from '@/app/(index)/(dynamic-routes)/character/[id]/alert-error'
import { Metadata } from 'next'
import { getElementText, getRoleText } from '@/features/utils/character-texts'
import { ScrollToTop } from '@/components/scroll-to-top'
import BlurFade from '@/components/magicui/blur-fade'

export async function generateMetadata(props: PageProps): Promise<Metadata> {
  const { params } = props

  const CHARACTER_ID = params.id
  const CHARACTER = await getCharacterById(CHARACTER_ID)

  if (!CHARACTER) return { title: `${PAGE_NAME} - Indefinido` }

  const RARITY = CHARACTER.rarity.split('_')[1]
  const ELEMENT = getElementText(CHARACTER.element)
  const ROLE = getRoleText(CHARACTER.role)

  const DESC = `Guia informativa de ${CHARACTER.name}, el personaje ${RARITY} estrellas de ${ELEMENT} en Genshin Diary. Descubre las mejores builds, armas, artefactos y equipos para maximizar su potencial como ${ROLE}`

  return {
    title: `${PAGE_NAME} - ${CHARACTER.name}`,
    description: DESC,
    openGraph: {
      images: [
        {
          url: CHARACTER.images?.splash_art_url ?? DEFAULT_IMAGE,
          width: 800,
          height: 600,
          alt: `Imagen de ${CHARACTER.name}`,
        },
      ],
    },
  }
}

export default async function CharacterPage(props: PageProps) {
  const { params } = props

  const CHARACTER_ID = params.id
  const CHARACTER = await getCharacterById(CHARACTER_ID)

  const IS_PUBLIC = CHARACTER?.is_public
  if (!CHARACTER || !IS_PUBLIC) return redirect('/')

  return (
    <BlurFade delay={0.2}>
      <section className='space-y-8 md:space-y-16 gap-2 md:gap-x-4 grid grid-cols-2 relative pb-24'>
        <ScrollToTop />
        <CharacterInfo data={CHARACTER} />
        <Ascensions data={CHARACTER} />
        <AscensionTalents data={CHARACTER} />
        <Weapons data={CHARACTER} />
        <Artifacts data={CHARACTER} />
        <StatsPriority data={CHARACTER} />
        <Teams data={CHARACTER} />
        <Skills data={CHARACTER} />
        <VideoGuide data={CHARACTER} />
        <AlertError />
      </section>
    </BlurFade>
  )
}
