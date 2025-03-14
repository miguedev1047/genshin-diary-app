import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TeamForm } from '@/app/(panel)/panel/teams/_components/team-form'
import { QuerySearch } from '@/components/query-search'
import { Title } from '@/components/ui/title'

export function TeamHeader() {
  return (
    <div className='flex items-center justify-between gap-4 flex-wrap'>
      <Title
        size='2xl'
        className='font-extrabold uppercase'
      >
        Equipos
      </Title>

      <div className='flex items-center gap-2'>
        <QuerySearch
          queryParam='name'
          placeholder='Buscar equipo'
          className='w-[350px]'
        />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <TeamForm />
            </TooltipTrigger>
            <TooltipContent side='bottom'>
              <p>Crear equipo</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  )
}
