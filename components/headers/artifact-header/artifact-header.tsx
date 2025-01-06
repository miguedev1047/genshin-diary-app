import {
  TooltipProvider,
  TooltipTrigger,
  Tooltip,
  TooltipContent,
} from '@/components/ui/tooltip'
import { Button } from '@/components/ui/button'
import { HeaderProps } from '@/components/headers/_types'
import { SearchBar } from '@/components/search-bar'
import { Plus } from 'lucide-react'
import { Title } from '@/components/ui/title'
import Link from 'next/link'

export function ArtifactHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <div className='flex items-center justify-between gap-4 flex-wrap'>
      <Title
        size='2xl'
        className='font-extrabold uppercase'
      >
        Artefactos
      </Title>

      <div className='flex items-center gap-2'>
        <SearchBar
          queryParam='name'
          placeholder='Buscar artefacto'
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
        )}
      </div>
    </div>
  )
}
