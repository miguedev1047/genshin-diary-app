import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ITEM_FILTERS } from '@/consts/general'
import { QueryToggle } from '@/components/query-toggle'
import { QuerySearch } from '@/components/query-search'
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
      <div className='flex flex-wrap items-center justify-between w-full gap-2'>
        <Title
          size='2xl'
          className='font-extrabold uppercase'
        >
          Armas
        </Title>

        <TooltipProvider>
          <div className='flex items-center gap-2 max-md:hidden'>
            <QuerySearch
              queryParam='name'
              placeholder='Buscar arma'
            />

            {isCreator && (
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
            )}
          </div>

          <div className='flex items-center gap-2 md:hidden w-full'>
            <QuerySearch
              queryParam='name'
              placeholder='Buscar arma'
            />

            {isCreator && (
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
            )}
          </div>
        </TooltipProvider>
      </div>

      <Accordion
        type='single'
        collapsible
        className='w-full space-y-2'
      >
        <AccordionItem
          value='1'
          className='bg-background has-focus-visible:border-ring has-focus-visible:ring-ring/50 rounded-md border px-4 py-1 outline-none last:border-b has-focus-visible:ring-[3px]'
        >
          <AccordionTrigger className='py-2 font-bold leading-6 hover:no-underline focus-visible:ring-0'>
            Ver filtros
          </AccordionTrigger>
          <AccordionContent>
            <div className='mt-4 flex flex-col space-y-3'>
              <div className='space-y-3'>
                <Title
                  size='sm'
                  className='font-bold'
                >
                  Filtro de rareza
                </Title>
                <ul className='flex flex-wrap gap-2'>
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
              </div>

              <div className='space-y-3'>
                <Title
                  size='sm'
                  className='font-bold'
                >
                  Filtro de tipo
                </Title>
                <ul className='flex flex-wrap gap-2'>
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
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
