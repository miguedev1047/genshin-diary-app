import {
  Anemo,
  Cryo,
  Dendro,
  Electro,
  Geo,
  Hydro,
  Pyro,
} from '@/assets/elements'
import {
  ArtifactImg,
  CharacterImg,
  MaterialImg,
  WeaponImg,
} from '@/assets/images'
import { Star4, Star5 } from '@/assets/stars'
import { Sword, Bow, Catalyst, Claymore, Polearm } from '@/assets/weapon-types'

export const NONE = ''

export const STARS = [
  {
    label: '5 Estrellas',
    value: 'STAR_5',
    stars: '5_stars',
  },
  {
    label: '4 Estrellas',
    value: 'STAR_4',
    stars: '4_stars',
  },
  {
    label: '3 Estrellas',
    value: 'STAR_3',
    stars: '3_stars',
  },
  {
    label: '2 Estrellas',
    value: 'STAR_2',
    stars: '2_stars',
  },
  {
    label: '1 Estrella',
    value: 'STAR_1',
    stars: '1_star',
  },
]

export const REGIONS = [
  {
    label: 'Mondstadt',
    value: 'MONDSTADT',
    region: 'mondstadt',
  },
  {
    label: 'Liyue',
    value: 'LIYUE',
    region: 'liyue',
  },
  {
    label: 'Inazuma',
    value: 'INAZUMA',
    region: 'inazuma',
  },
  {
    label: 'Sumeru',
    value: 'SUMERU',
    region: 'sumeru',
  },
  {
    label: 'Fontaine',
    value: 'FONTAINE',
    region: 'fontaine',
  },
  {
    label: 'Natlan',
    value: 'NATLAN',
    region: 'natlan',
  },
  {
    label: 'Snezhnaya',
    value: 'SNEZHNAYA',
    region: 'snezhnaya',
  },
]

export const ELEMENTS = [
  {
    label: 'Anemo',
    value: 'ANEMO',
    src: Anemo.src,
    element: 'anemo',
  },
  {
    label: 'Hydro',
    value: 'HYDRO',
    src: Hydro.src,
    element: 'hydro',
  },
  {
    label: 'Cryo',
    value: 'CRYO',
    src: Cryo.src,
    element: 'cryo',
  },
  {
    label: 'Dendro',
    value: 'DENDRO',
    src: Dendro.src,
    element: 'dendro',
  },
  {
    label: 'Electro',
    value: 'ELECTRO',
    src: Electro.src,
    element: 'electro',
  },
  {
    label: 'Pyro',
    value: 'PYRO',
    src: Pyro.src,
    element: 'pyro',
  },
  {
    label: 'Geo',
    value: 'GEO',
    src: Geo.src,
    element: 'geo',
  },
]

export const ATTRIBUTES = [
  { value: 'DMG_CRIT', label: 'Daño CRIT' },
  { value: 'CRIT_RATE', label: 'Prob. CRIT' },
  { value: 'ELEMENTAL_MASTERY', label: 'Maestría Elemental' },
  { value: 'ENERGY_RECHARGE', label: 'Recarga de Energía' },
  { value: 'HEAL_BONUS', label: 'Bono de Curación' },
  { value: 'PHYSICAL_DMG', label: 'Bono de Daño Físico' },
  { value: 'ATQ', label: 'ATQ' },
  { value: 'DEF', label: 'DEF' },
  { value: 'HP', label: 'Vida' },
  { value: 'PYRO_DMG', label: 'Bono de Daño Pyro' },
  { value: 'HYDRO_DMG', label: 'Bono de Daño Hydro' },
  { value: 'ELECTRO_DMG', label: 'Bono de Daño Electro' },
  { value: 'DENDRO_DMG', label: 'Bono de Daño Dendro' },
  { value: 'CRYO_DMG', label: 'Bono de Daño Cryo' },
  { value: 'ANEMO_DMG', label: 'Bono de Daño Anemo' },
  { value: 'GEO_DMG', label: 'Bono de Daño Geo' },
]

export const WEAPON_TYPE = [
  {
    label: 'Espada',
    value: 'SWORD',
    src: Sword.src,
  },
  {
    label: 'Lanza',
    value: 'POLEARM',
    src: Polearm.src,
  },
  {
    label: 'Mandoble',
    value: 'CLAYMORE',
    src: Claymore.src,
  },
  {
    label: 'Arco',
    value: 'BOW',
    src: Bow.src,
  },
  {
    label: 'Catalizador',
    value: 'CATALYST',
    src: Catalyst.src,
  },
]

export const ROLE = [
  { value: 'DPS', label: 'Main DPS' },
  { value: 'SUBDPS', label: 'Sub DPS' },
  { value: 'SUPPORT', label: 'Soporte' },
]

export const ASCENSION_LEVEL = [
  { value: 'ASCENSION_1', label: 'Ascensión 1', name: 'ascension_1' },
  { value: 'ASCENSION_2', label: 'Ascensión 2', name: 'ascension_2' },
  { value: 'ASCENSION_3', label: 'Ascensión 3', name: 'ascension_3' },
  { value: 'ASCENSION_4', label: 'Ascensión 4', name: 'ascension_4' },
  { value: 'ASCENSION_5', label: 'Ascensión 5', name: 'ascension_5' },
  { value: 'ASCENSION_6', label: 'Ascensión 6', name: 'ascension_6' },
]

export const ASCENSION_CHARACTER = [
  { ascension: 'ASCENSION_1', cost: 20000, level: '20/40', order: 1 },
  { ascension: 'ASCENSION_2', cost: 40000, level: '40/50', order: 2 },
  { ascension: 'ASCENSION_3', cost: 60000, level: '50/60', order: 3 },
  { ascension: 'ASCENSION_4', cost: 80000, level: '60/70', order: 4 },
  { ascension: 'ASCENSION_5', cost: 100000, level: '70/80', order: 5 },
  { ascension: 'ASCENSION_6', cost: 120000, level: '80/90', order: 6 },
]

export const ASCENSION_WEAPON = [
  { ascension_level: 'ASCENSION_1', cost: 20000, level: '20/40', order: 1 },
  { ascension_level: 'ASCENSION_2', cost: 40000, level: '40/50', order: 2 },
  { ascension_level: 'ASCENSION_3', cost: 60000, level: '50/60', order: 3 },
  { ascension_level: 'ASCENSION_4', cost: 80000, level: '60/70', order: 4 },
  { ascension_level: 'ASCENSION_5', cost: 100000, level: '70/80', order: 5 },
  { ascension_level: 'ASCENSION_6', cost: 120000, level: '80/90', order: 6 },
]

export const MATERIAL_TYPES = [
  {
    value: 'MATERIAL_UPGRADE',
    label: 'Material de ascension',
    name: 'material_upgrade',
  },
  {
    value: 'MATERIAL_LOCAL',
    label: 'Material local',
    name: 'material_local',
  },
  {
    value: 'MATERIAL_COMMON',
    label: 'Material comun',
    name: 'material_common',
  },
  {
    value: 'MATERIAL_BOSS',
    label: 'Material de jefe',
    name: 'material_boss',
  },
  {
    value: 'MATERIAL_WEEKLY_BOSS',
    label: 'Material de jefe semanal',
    name: 'material_weekly_boss',
  },
  {
    value: 'MATERIAL_TALENT',
    label: 'Material de talento',
    name: 'material_talent',
  },
  {
    value: 'MATERIAL_UPGRADE_WEAPON',
    label: 'Mejora de arma',
    name: 'material_upgrade_weapon',
  },
  {
    value: 'MATERIAL_UPGRADE_CHARACTER',
    label: 'Mejora de personaje',
    name: 'material_upgrade_character',
  },
]

export const PANEL_ROUTES = [
  {
    title: 'Personajes',
    href: '/panel/characters',
    src: CharacterImg.src,
  },
  {
    title: 'Armas',
    href: '/panel/weapons',
    src: WeaponImg.src,
  },
  {
    title: 'Artefactos',
    href: '/panel/artifacts',
    src: ArtifactImg.src,
  },
  {
    title: 'Materiales',
    href: '/panel/materials',
    src: MaterialImg.src,
  },
]

export const HOME_ITEMS = [
  {
    title: 'Personajes',
    href: '/characters',
  },
  {
    title: 'Armas',
    href: '/weapons',
  },
  {
    title: 'Artefactos',
    href: '/artifacts',
  },
  {
    title: 'Materiales',
    href: '/materials',
  },
  {
    title: 'Equipos',
    href: '/teams',
  },
  {
    title: 'Tier List',
    href: '/tierlist',
  },
]

export const ITEM_FILTERS = {
  star_filters: [
    {
      label: '5',
      value: '5',
      src: Star5.src,
    },
    {
      label: '4',
      value: '4',
      src: Star4.src,
    },
  ],
  element_filters: ELEMENTS,
  weapon_filters: WEAPON_TYPE,
}

export const DEFAULT_IMAGE = 'https://placehold.co/600?text=Hutao+Mains'
