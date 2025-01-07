import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import { ITEM_FILTERS } from '@/consts/general'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { SearchBar } from '@/components/search-bar'
import { QueryToggle } from '@/components/query-toggle'
import { Title } from '@/components/ui/title'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { HeaderProps } from '@/components/headers/_types'
import Link from 'next/link'
import Image from 'next/image'

export function CharacterHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <Title
          size='2xl'
          className='font-extrabold uppercase'
        >
          Personajes
        </Title>

        <div className='flex items-center gap-2'>
          <SearchBar
            queryParam='name'
            placeholder='Buscar personaje'
            className='w-[350px]'
          />

          {isCreator && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    size='icon'
                    asChild
                  >
                    <Link href='/creator/character'>
                      <Plus />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Crear personaje</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <Card className='p-4 flex flex-wrap max-xl:flex-col justify-center items-center gap-6'>
        <ul className='flex space-x-2'>
          {ITEM_FILTERS.star_filters.slice(0, 2).map((filter) => (
            <QueryToggle
              key={filter.value}
              queryKey='stars'
              queryValue={filter.value.at(-1)!}
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
          className='h-8 max-xl:hidden'
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
          className='h-8 max-xl:hidden'
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
