import { GRID_LIST } from '@/consts/classes'
import { ITEM_FILTERS } from '@/consts/general'
import { Card, CardTitle, CardContent, CardHeader } from '@/components/ui/card'
import { FocalLight } from '@/shared/components/focal-light'
import { BorderBeam } from '@/components/magicui/border-beam'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Separator } from '@/components/ui/separator'
import { CharacterProps } from '@/app/(index)/_components/characters/character.type'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { formattedUrl } from '@/features/utils/formatted-names'
import { QueryToggle } from '@/shared/components/query-toggle'
import { SearchBar } from '@/shared/components/search-bar'
import { getCharacters } from '@/app/(index)/_services/fetch'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { headers } from 'next/headers'

export async function Characters() {
  const header = headers()

  console.log(header)
  
  const CHARACTERS = await getCharacters()

  return (
    <section className='relative mx-auto max-w-[1440px] h-[calc(100dvh-4rem)] px-4 md:px-8'>
      <FocalLight />

      <Card className='relative overflow-hidden'>
        <CardHeader className='space-y-4'>
          <CharacterHeader />
        </CardHeader>

        <CardContent>
          <ul className={cn(GRID_LIST, 'mt-4')}>
            {CHARACTERS?.map((character) => (
              <li key={character.id}>
                <CharacterCard data={character} />
              </li>
            ))}
          </ul>
        </CardContent>
        <BorderBeam />
      </Card>
    </section>
  )
}

function CharacterHeader() {
  return (
    <>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <CardTitle className='uppercase font-extrabold op'>
          Personajes
        </CardTitle>

        <SearchBar
          queryParam='name'
          placeholder='Buscar personaje'
          className='w-[350px]'
        />
      </div>

      <Card className='p-4 flex justify-center items-center gap-6'>
        <ul className='flex space-x-2'>
          {ITEM_FILTERS.star_filters.map((filter) => (
            <QueryToggle
              key={filter.value}
              queryKey='stars'
              queryValue={filter.value}
            >
              <Image
                src={filter.src}
                alt={filter.label}
                width={128}
                height={128}
              />
            </QueryToggle>
          ))}
        </ul>

        <Separator
          className='h-8'
          orientation='vertical'
        />

        <ul className='flex space-x-3'>
          {ITEM_FILTERS.element_filters.map((filter) => (
            <QueryToggle
              key={filter.value}
              queryKey='element'
              queryValue={filter.value}
            >
              <Image
                src={filter.src}
                alt={filter.label}
                width={128}
                height={128}
              />
            </QueryToggle>
          ))}
        </ul>

        <Separator
          className='h-8'
          orientation='vertical'
        />

        <ul className='flex space-x-3'>
          {ITEM_FILTERS.weapon_filters.map((filter) => (
            <QueryToggle
              key={filter.value}
              queryKey='weapon'
              queryValue={filter.value}
            >
              <Image
                src={filter.src}
                alt={filter.label}
                width={128}
                height={128}
              />
            </QueryToggle>
          ))}
        </ul>
      </Card>
    </>
  )
}

function CharacterCard(props: CharacterProps) {
  const { data: CHARACTER } = props

  const FORMATTED_NAME = formattedUrl(CHARACTER?.name)
  const URL = `/character/${FORMATTED_NAME}`

  const CHARACTER_SPLASH_ART = CHARACTER?.images?.splash_art_url
  const RARITY_COLOR = getBorderColorByRarity(CHARACTER?.rarity)

  return (
    <Link
      href={URL}
      className={cn(
        'group/item flex aspect-[2/3] overflow-hidden rounded-[1rem] border bg-background transition relative',
        RARITY_COLOR
      )}
    >
      <Card className='size-full transition duration-200 ease-in-out'>
        {CHARACTER_SPLASH_ART && (
          <AspectRatio
            ratio={2 / 3}
            className='absolute translate-y-[4rem]'
          >
            <Image
              src={CHARACTER_SPLASH_ART}
              alt={CHARACTER?.name}
              width={720}
              height={1080}
              priority
              className='object-cover w-full h-full transition-all duration-300 ease-in-out dark:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,.1))] group-hover/item:[mask-image:linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,1))] group-hover/item:scale-110 group-hover/item:grayscale-0'
            />
          </AspectRatio>
        )}

        <p className='absolute top-0 uppercase text-xl font-extrabold opacity-50 group-hover/item:opacity-100 z-20 w-full m-3 p-1 line-clamp-1'>
          {CHARACTER?.name}
        </p>
      </Card>
    </Link>
  )
}
