import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
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
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <Title
          size='2xl'
          className='font-extrabold uppercase'
        >
          Materiales
        </Title>

        <div className='flex items-center gap-2'>
          <QuerySearch
            queryParam='name'
            placeholder='Buscar material'
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
                    <Link href='/creator/material'>
                      <Plus />
                    </Link>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side='bottom'>
                  <p>Crear material</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </div>
      <ul className='grid sm:grid-cols-2 lg:grid-cols-4 gap-4'>
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
    </>
  )
}
