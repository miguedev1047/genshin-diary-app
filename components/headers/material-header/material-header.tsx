import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MATERIAL_TYPES } from '@/consts/general'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { QueryToggle } from '@/components/query-toggle'
import { QuerySearch } from '@/components/query-search'
import { HeaderProps } from '@/components/headers/_types'
import { Title } from '@/components/ui/title'
import Link from 'next/link'

export function MaterialHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <>
      <div className='flex flex-wrap items-center justify-between w-full gap-2'>
        <Title
          size='2xl'
          className='font-extrabold uppercase'
        >
          Materiales
        </Title>

        <TooltipProvider>
          <div className='flex items-center gap-2 max-md:hidden'>
            <QuerySearch
              queryParam='name'
              placeholder='Buscar material'
            />

            {isCreator && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='icon'
                    asChild
                  >
                    <Link href='/creator/material'>
                      <Plus />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p>Crear material</p>
                </TooltipContent>
              </Tooltip>
            )}
          </div>

          <div className='flex items-center gap-2 md:hidden w-full'>
            <QuerySearch
              queryParam='name'
              placeholder='Buscar material'
            />

            {isCreator && (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size='icon'
                    asChild
                  >
                    <Link href='/creator/material'>
                      <Plus />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p>Crear material</p>
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
                  Filtro de tipo
                </Title>
                <ul className='grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 w-full'>
                  {MATERIAL_TYPES.map((filter) => (
                    <QueryToggle
                      key={filter.value}
                      queryKey='type'
                      queryValue={filter.value}
                      className='w-full'
                    >
                      {filter.label}
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
