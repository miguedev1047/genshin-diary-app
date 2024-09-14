import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ITEM_FILTERS } from '@/consts/general'
import { Card, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { QueryToggle } from '@/shared/components/query-toggle'
import { SearchBar } from '@/shared/components/search-bar'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

export function CharacterFilter() {
  return (
    <>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <CardTitle className='uppercase font-extrabold op'>
          Personajes
        </CardTitle>

        <div className='flex items-center gap-2'>
          <SearchBar
            queryParam='name'
            placeholder='Buscar personaje'
            className='w-[350px]'
          />

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size='icon'
                  asChild
                >
                  <Link href='/creator/character'>
                    <Plus />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent side='bottom'>
                <p>Crear personaje</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
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
