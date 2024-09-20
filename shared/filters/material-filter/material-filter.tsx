import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Card, CardTitle } from '@/components/ui/card'
import { QueryToggle } from '@/shared/components/query-toggle'
import { MATERIAL_TYPES } from '@/consts/general'
import { SearchBar } from '@/shared/components/search-bar'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export function MaterialFilter() {
  return (
    <>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <CardTitle className='uppercase font-extrabold'>Materiales</CardTitle>

        <div className='flex items-center gap-2'>
          <SearchBar
            queryParam='name'
            placeholder='Buscar material'
            className='w-[350px]'
          />

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
        </div>
      </div>

      <Card className='p-4 w-full'>
        <ul className='grid grid-cols-4 gap-4'>
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
      </Card>
    </>
  )
}
