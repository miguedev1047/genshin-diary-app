import { ControllerRenderProps } from 'react-hook-form'

export type MaterialSelectorProps = ControllerRenderProps<
  {
    materials: [string, ...string[]]
    ascension_level: string
  },
  'materials'
>
