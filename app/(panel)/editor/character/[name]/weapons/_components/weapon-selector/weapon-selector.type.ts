import { ControllerRenderProps } from 'react-hook-form'

export type WeaponSelectorProps = ControllerRenderProps<
  {
    weapons: [string, ...string[]]
  },
  'weapons'
>
