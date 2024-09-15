import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import { CardTitle } from '@/components/ui/card'
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
    </>
  )
}
