import {
  AnemoBg,
  CryoBg,
  DendroBg,
  ElectroBg,
  GeoBg,
  HydroBg,
  PyroBg,
} from '@/assets/elements'

export type ElementProps =
  | 'PYRO'
  | 'HYDRO'
  | 'ANEMO'
  | 'ELECTRO'
  | 'DENDRO'
  | 'CRYO'
  | 'GEO'

export const GRID_LIST =
  'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-5'

export const COL_SPAN = 'col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-6'

export const ELEMENT_COLOR = {
  PYRO: 'bg-red-500/30',
  HYDRO: 'bg-blue-500/30',
  ANEMO: 'bg-green-400/30',
  ELECTRO: 'bg-purple-500/30',
  DENDRO: 'bg-green-600/30',
  CRYO: 'bg-teal-400/30',
  GEO: 'bg-yellow-500/30',
  NONE: 'bg-gray-400/30',
}

export const BORDER_ELEMENT_COLOR = {
  PYRO: 'border-red-500',
  HYDRO: 'border-blue-500',
  ANEMO: 'border-green-400',
  ELECTRO: 'border-purple-500',
  DENDRO: 'border-green-600',
  CRYO: 'border-teal-400',
  GEO: 'border-yellow-500',
}

export const SHADOW_ELEMENT_COLOR = {
  PYRO: 'shadow-red-500/15',
  HYDRO: 'shadow-blue-500/15',
  ANEMO: 'shadow-green-400/15',
  ELECTRO: 'shadow-purple-500/15',
  DENDRO: 'shadow-green-600/15',
  CRYO: 'shadow-teal-400/15',
  GEO: 'shadow-yellow-500/15',
}

export const BG_ELEMENT = {
  PYRO: PyroBg.src,
  HYDRO: HydroBg.src,
  ANEMO: AnemoBg.src,
  ELECTRO: ElectroBg.src,
  DENDRO: DendroBg.src,
  CRYO: CryoBg.src,
  GEO: GeoBg.src,
}

export const TIER_ROW_COLORS = {
  S: 'bg-yellow-400',
  A: 'bg-green-400',
  B: 'bg-blue-400',
  C: 'bg-purple-400',
  D: 'bg-red-400',
}


