import { CardTitle } from '@/components/ui/card'
import { SearchBar } from '@/shared/components/search-bar'

export function MaterialFilter() {
  return (
    <>
      <div className='flex items-center justify-between gap-4 flex-wrap'>
        <CardTitle className='uppercase font-extrabold'>Material</CardTitle>

        <SearchBar
          queryParam='name'
          placeholder='Buscar material'
          className='w-[350px]'
        />
      </div>
    </>
  )
}
