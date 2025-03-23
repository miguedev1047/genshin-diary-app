import { ControllerRenderProps } from "react-hook-form"

type MaterialFields = ControllerRenderProps<
  {
    materials: [string, ...string[]]
    ascension_level: string
  },
  'materials'
>

export type MaterialSelectorProps = MaterialFields
