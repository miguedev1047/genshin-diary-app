import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useTiptap } from '@/components/tiptap/_context'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { ChevronDown } from 'lucide-react'

const TEXT_COLORS = [
  {
    name: 'Sin color',
    color: 'var(--text-primary)',
  },
  {
    name: 'Purpura',
    color: '#A48DFF',
  },
  {
    name: 'Rojo',
    color: '#FF6B6B',
  },
  {
    name: 'Dorado',
    color: '#FFAC4D',
  },
  {
    name: 'Azul',
    color: '#42A9FF',
  },
  {
    name: 'Verde',
    color: '#A3FF63',
  },
  {
    name: 'Verde claro',
    color: '#80FFD7',
  },
  {
    name: 'Azul claro',
    color: '#B7F5FF',
  },
  {
    name: 'Gris',
    color: '#A8A29E',
  },
]

const HIGHLIGHT_COLORS = [
  {
    name: 'Default',
    color: 'var(--novel-highlight-default)',
  },
  {
    name: 'Purpura',
    color: '#A48DFF70',
  },
  {
    name: 'Rojo',
    color: '#FF6B6B70',
  },
  {
    name: 'Dorado',
    color: '#FFAC4D70',
  },
  {
    name: 'Azul',
    color: '#42A9FF70',
  },
  {
    name: 'Verde',
    color: '#A3FF6370',
  },
  {
    name: 'Verde claro',
    color: '#80FFD770',
  },
  {
    name: 'Azul claro',
    color: '#B7F5FF70',
  },
  {
    name: 'Gris',
    color: '#A8A29E70',
  },
]

export function ColorSelector() {
  const { editor } = useTiptap()

  const activeColorItem = TEXT_COLORS.find(({ color }) =>
    editor.isActive('textStyle', { color })
  )

  const activeHighlightItem = HIGHLIGHT_COLORS.find(({ color }) =>
    editor.isActive('highlight', { color })
  )

  return (
    <Popover>
      <PopoverTrigger>
        <Button
          className='gap-2'
          variant='ghost'
          type='button'
        >
          <span
            className='rounded-sm px-1'
            style={{
              color: activeColorItem?.color,
              backgroundColor: activeHighlightItem?.color,
            }}
          >
            A
          </span>
          <ChevronDown className='h-4 w-4' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={5}
        className='my-1 flex w-48 flex-col overflow-hidden overflow-y-auto border p-3 shadow-xl'
        align='start'
      >
        <div className='space-y-4'>
          <div className='text-sm font-semibold text-muted-foreground'>
            Colores
          </div>
          <ScrollArea className='h-auto w-full'>
            <ul className='grid grid-cols-4 gap-2'>
              {TEXT_COLORS.map(({ color, name }, index) => (
                <li
                  key={index}
                  className='cursor-pointer p-1 rounded-sm bg-muted grid place-items-center'
                  onClick={() => {
                    editor.commands.unsetColor()
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    name !== 'Default' &&
                      editor
                        .chain()
                        .focus()
                        .setColor(color || '')
                        .run()
                  }}
                >
                  <div
                    className='font-medium'
                    style={{ color }}
                  >
                    A
                  </div>
                </li>
              ))}
            </ul>
          </ScrollArea>
        </div>
      </PopoverContent>
    </Popover>
  )
}
