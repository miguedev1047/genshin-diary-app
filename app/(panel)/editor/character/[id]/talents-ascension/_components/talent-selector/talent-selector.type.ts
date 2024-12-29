import { ControllerRenderProps } from 'react-hook-form'

export type TalentSelectorProps = ControllerRenderProps<
  {
    materials: [string, ...string[]]
    ascension_level: string
  },
  'materials'
>
