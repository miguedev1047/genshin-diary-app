import { CardTitle, } from '@/components/ui/card'
import { SearchBar } from '@/shared/components/search-bar'

export function ArtifactFilter() {
    return (
      <>
        <div className='flex items-center justify-between gap-4 flex-wrap'>
          <CardTitle className='uppercase font-extrabold'>
            Artefactos
          </CardTitle>
  
          <SearchBar
            queryParam='name'
            placeholder='Buscar artefacto'
            className='w-[350px]'
          />
        </div>
      </>
    )
  }