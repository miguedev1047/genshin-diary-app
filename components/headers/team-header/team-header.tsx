import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TeamForm } from '@/app/(panel)/panel/teams/_components/team-form'
import { QuerySearch } from '@/components/query-search'
import { Title } from '@/components/ui/title'
import { HeaderProps } from '@/components/headers/_types'

export function TeamHeader(props: HeaderProps) {
  const { isCreator = false } = props

  return (
    <div className='flex flex-wrap items-center justify-between w-full gap-2'>
      <Title
        size='2xl'
        className='font-extrabold uppercase'
      >
        Equipos
      </Title>

      <TooltipProvider>
        <div className='flex items-center gap-2 max-md:hidden'>
          <QuerySearch
            queryParam='name'
            placeholder='Buscar equipo'
          />

          {isCreator && (
            <Tooltip>
              <TooltipTrigger asChild>
                <TeamForm />
              </TooltipTrigger>
              <TooltipContent side='bottom'>
                <p>Crear equipo</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>

        <div className='flex items-center gap-2 md:hidden w-full'>
          <QuerySearch
            queryParam='name'
            placeholder='Buscar equipo'
          />

          {isCreator && (
            <Tooltip>
              <TooltipTrigger asChild>
                <TeamForm />
              </TooltipTrigger>
              <TooltipContent side='bottom'>
                <p>Crear equipo</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
      </TooltipProvider>
    </div>
  )
}
