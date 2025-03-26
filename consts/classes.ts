import {
  AnemoBg,
  CryoBg,
  DendroBg,
  ElectroBg,
  GeoBg,
  HydroBg,
  PyroBg,
} from '@/assets/elements/_index'

export const COL_SPAN = 'col-span-1 sm:col-span-2 md:col-span-4 xl:col-span-6'

export const BG_ELEMENT_COLOR = {
  PYRO: 'bg-red-500/40',
  HYDRO: 'bg-blue-500/40',
  ANEMO: 'bg-green-400/40',
  ELECTRO: 'bg-purple-500/40',
  DENDRO: 'bg-green-600/40',
  CRYO: 'bg-teal-400/40',
  GEO: 'bg-yellow-500/40',
  NONE: 'bg-gray-400/40',
}

export const BORDER_ELEMENT_COLOR = {
  PYRO: 'border-red-500/20',
  HYDRO: 'border-blue-500/20',
  ANEMO: 'border-green-400/20',
  ELECTRO: 'border-purple-500/20',
  DENDRO: 'border-green-600/20',
  CRYO: 'border-teal-400/20',
  GEO: 'border-yellow-500/20',
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
  SS: 'bg-pink-400',
  S: 'bg-yellow-400',
  A: 'bg-green-400',
  B: 'bg-blue-400',
  C: 'bg-purple-400',
  D: 'bg-red-400',
}

export const CHARACTER_GRID_LIST =
  'grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-2 md:gap-5'

export const ITEMS_GRID_LIST =
  'grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-2 md:gap-5'

export const GENERAL_GRID_LIST =
  'grid grid-cols-3 md:grid-cols-5 xl:grid-cols-6 gap-2 md:gap-5'
