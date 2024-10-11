import { ControllerRenderProps } from 'react-hook-form'

export type CharacterSelectorProps = ControllerRenderProps<
  {
    characters: [string, ...string[]]
  },
  'characters'
>
