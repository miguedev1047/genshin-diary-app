import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TeamForm } from '@/app/(panel)/panel/teams/_components/team-form'
import { SearchBar } from '@/components/search-bar'

export function TeamFilter() {
  return (
    <div className='flex items-center justify-between gap-4 flex-wrap'>
      <h2 className='uppercase font-extrabold'>Equipos</h2>

      <div className='flex items-center gap-2'>
        <SearchBar
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
