import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { TablePaginationProps } from '@/app/(index)/_components/table-pagination/table-pagination.type'

const ITEMS_PER_PAGE = [5, 10, 15, 20, 25, 50]

export function TablePagination<TData>(props: TablePaginationProps<TData>) {
  const { table, title } = props
  const CURRENT_PAGE = table.getState().pagination.pageIndex + 1

  return (
    <div className='flex items-center justify-between w-full space-x-4 py-2'>
      <div className='flex items-center gap-2'>
        <Select
          
          value={table.getState().pagination.pageSize.toString()}
          onValueChange={(value) => {
            table.setPageSize(Number(value))
          }}
        >
          <SelectTrigger className='w-[70px] h-8'>
            <SelectValue placeholder='10' />
          </SelectTrigger>
          <SelectContent>
            {ITEMS_PER_PAGE.map((pageSize) => (
              <SelectItem
                key={pageSize}
                value={pageSize.toString()}
              >
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <h4>{title ? title : 'Elementos'} por página</h4>
      </div>

      <div className='flex items-center gap-1'>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Atras
        </Button>
        <Button
          variant='outline'
          size='sm'
        >
          <p>{CURRENT_PAGE}</p>
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Siguiente
        </Button>
      </div>
    </div>
  )
}
