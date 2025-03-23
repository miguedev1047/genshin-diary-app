import { ControllerRenderProps } from 'react-hook-form'

export type ArtifactSelectorProps = ControllerRenderProps<
  {
    artifacts: [string, ...string[]]
  },
  'artifacts'
>
