import { PageProps } from '@/app/(index)/(dynamic-routes)/character/[id]/_types'
import { redirect } from 'next/navigation'
import { PAGE_NAME } from '@/consts/misc'
import { CharacterInfo } from '@/app/(index)/(dynamic-routes)/character/[id]/_components/character-info'
import { db } from '@/lib/db'

export async function generateMetadata(props: PageProps) {
  const { params } = props
  const CHARACTER_ID = params.id

  const CHARACTER = await db.characters.findUnique({
    where: { id: CHARACTER_ID },
  })

  if (!CHARACTER) return { title: `${PAGE_NAME} - Indefinido` }

  return {
    title: `${PAGE_NAME} - ${CHARACTER.name}`,
    description: `Guia informativa de ${CHARACTER.name}`,
  }
}

export default async function CharacterPage(props: PageProps) {
  const { params } = props
  const CHARACTER_ID = params.id

  const CHARACTER = await db.characters.findUnique({
    where: { id: CHARACTER_ID },
    include: { images: true },
  })

  if (!CHARACTER) return redirect('/')

  return (
    <section className='space-y-5'>
      <CharacterInfo data={CHARACTER} />
    </section>
  )
}
