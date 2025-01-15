import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ITEM_FILTERS } from '@/consts/general'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { QueryToggle } from '@/components/query-toggle'
import { SearchBar } from '@/components/search-bar'
import { Button } from '@/components/ui/button'
import { HeaderProps } from '@/components/headers/_types'
import { Title } from '@/components/ui/title'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export function WeaponHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <Title
          size='2xl'
          className='font-extrabold uppercase'
        >
          Armas
        </Title>

        <div className='flex items-center gap-2'>
          <SearchBar
            queryParam='name'
            placeholder='Buscar arma'
            className='w-[350px]'
          />

          {isCreator && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='icon'
                    asChild
                  >
                    <Link href='/creator/weapon'>
                      <Plus />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p>Crear arma</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>

      <Card className='p-4 flex justify-center items-center gap-6'>
        <ul className='flex space-x-2'>
          {ITEM_FILTERS.star_filters.slice(0, 3).map((filter) => (
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
