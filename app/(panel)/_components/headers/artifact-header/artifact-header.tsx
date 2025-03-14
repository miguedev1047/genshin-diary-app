import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { QuerySearch } from '@/components/query-search'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export function ArtifactHeader() {
  return (
    <div className='flex items-center justify-between gap-4 flex-wrap'>
      <CardTitle className='uppercase font-extrabold'>Artefactos</CardTitle>

      <div className='flex items-center gap-2'>
        <QuerySearch
          queryParam='name'
          placeholder='Buscar artefacto'
          className='w-[350px]'
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <Button
                size='icon'
                asChild
              >
                <Link href='/creator/artifact'>
                  <Plus />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Crear artefacto</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
