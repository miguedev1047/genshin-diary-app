import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { HeaderProps } from '@/components/headers/_types' 
import { QuerySearch } from '@/components/query-search'
import { Plus } from 'lucide-react'
import { Title } from '@/components/ui/title'
import Link from 'next/link'

export function ArtifactHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <div className='flex flex-wrap items-center justify-between w-full gap-2'>
      <Title
        size='2xl'
        className='font-extrabold uppercase'
      >
        Artefactos
      </Title>

      <TooltipProvider>
        <div className='flex items-center gap-2 max-md:hidden'>
          <QuerySearch
            queryParam='name'
            placeholder='Buscar artefacto'
          />

          {isCreator && (
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
          )}
        </div>

        <div className='flex items-center gap-2 md:hidden w-full'>
          <QuerySearch
            queryParam='name'
            placeholder='Buscar artefacto'
          />

          {isCreator && (
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
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}
