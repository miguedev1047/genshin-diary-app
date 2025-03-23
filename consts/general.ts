import {
  Anemo,
  Cryo,
  Dendro,
  Electro,
  Geo,
  Hydro,
  Pyro,
} from '@/assets/elements'
import { Star1, Star2, Star3, Star4, Star5 } from '@/assets/stars'
import { Sword, Bow, Catalyst, Claymore, Polearm } from '@/assets/weapon-types'

export const ROLE = [
  { value: 'DPS', label: 'Main DPS' },
  { value: 'SUBDPS', label: 'Sub DPS' },
  { value: 'ENABLER', label: 'Habilitador' },
  { value: 'SUPPORT', label: 'Soporte' },
  { value: 'NOT_DETERMINED', label: 'Sin determinar' },
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

export const STARS = [
  {
    label: '5 Estrellas',
    value: 'STAR_5',
    stars: '5_stars',
    src: Star5.src,
  },
  {
    label: '4 Estrellas',
    value: 'STAR_4',
    stars: '4_stars',
    src: Star4.src,
  },
  {
    label: '3 Estrellas',
    value: 'STAR_3',
    stars: '3_stars',
    src: Star3.src,
  },
  {
    label: '2 Estrellas',
    value: 'STAR_2',
    stars: '2_stars',
    src: Star2.src,
  },
  {
    label: '1 Estrella',
    value: 'STAR_1',
    stars: '1_star',
    src: Star1.src,
  },
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

export const ITEM_FILTERS = {
  star_filters: STARS,
  element_filters: ELEMENTS,
  weapon_filters: WEAPON_TYPE,
}

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

export const ARTIFACTS_STATS = {
  sands: [
    { value: 'ELEMENTAL_MASTERY', label: 'Maestría Elemental' },
    { value: 'ATQ', label: 'Ataque Porcentual' },
    { value: 'ER', label: 'Recarga de Energia' },
    { value: 'DEF', label: 'Defensa Porcentual' },
    { value: 'HP', label: 'Vida Porcentual' },
  ],
  globet: [
    { value: 'ATQ', label: 'Ataque Porcentual' },
    { value: 'DEF', label: 'Defensa Porcentual' },
    { value: 'HP', label: 'Vida Porcentual' },
    { value: 'ELEMENTAL_MASTERY', label: 'Maestría Elemental' },
    { value: 'PHYSICAL_DMG', label: 'Bono de Daño Físico' },
    { value: 'PYRO_DMG', label: 'Bono de Daño Pyro' },
    { value: 'HYDRO_DMG', label: 'Bono de Daño Hydro' },
    { value: 'ELECTRO_DMG', label: 'Bono de Daño Electro' },
    { value: 'DENDRO_DMG', label: 'Bono de Daño Dendro' },
    { value: 'CRYO_DMG', label: 'Bono de Daño Cryo' },
    { value: 'ANEMO_DMG', label: 'Bono de Daño Anemo' },
    { value: 'GEO_DMG', label: 'Bono de Daño Geo' },
  ],
  circlet: [
    { value: 'ELEMENTAL_MASTERY', label: 'Maestría Elemental' },
    { value: 'DEF', label: 'Defensa Porcentual' },
    { value: 'HP', label: 'Vida Porcentual' },
    { value: 'ATQ', label: 'Ataque Porcentual' },
    { value: 'HEAL_BONUS', label: 'Bono de Curación' },
    { value: 'DMG_CRIT', label: 'Daño Crit.' },
    { value: 'CRIT_RATE', label: 'Prob. Crit.' },
    { value: 'CRIT_RATE/DMG_CRIT', label: 'Prob. Crit. / Daño Crit.' },
  ],
}

export const ACCOUNT_ROLE = [
  { value: 'OWNER', label: 'Owner' },
  { value: 'ADMIN', label: 'Administrador' },
  { value: 'EDITOR', label: 'Editor' },
]

export const ASCENSION_LEVEL = [
  { value: 'ASCENSION_1', label: 'Ascensión 1', name: 'ascension_1' },
  { value: 'ASCENSION_2', label: 'Ascensión 2', name: 'ascension_2' },
  { value: 'ASCENSION_3', label: 'Ascensión 3', name: 'ascension_3' },
  { value: 'ASCENSION_4', label: 'Ascensión 4', name: 'ascension_4' },
  { value: 'ASCENSION_5', label: 'Ascensión 5', name: 'ascension_5' },
  { value: 'ASCENSION_6', label: 'Ascensión 6', name: 'ascension_6' },
  { value: 'ASCENSION_7', label: 'Ascensión 7', name: 'ascension_7' },
  { value: 'ASCENSION_8', label: 'Ascensión 8', name: 'ascension_8' },
  { value: 'ASCENSION_9', label: 'Ascensión 9', name: 'ascension_9' },
]

export const ASCENSION_CHARACTER = [
  {
    ascension: 'ASCENSION_1',
    cost: 20000,
    level: '20-40',
    order: 1,
    materialQuatities: [1, 3, 3],
  },
  {
    ascension: 'ASCENSION_2',
    cost: 40000,
    level: '40-50',
    order: 2,
    materialQuatities: [3, 2, 10, 15],
  },
  {
    ascension: 'ASCENSION_3',
    cost: 60000,
    level: '50-60',
    order: 3,
    materialQuatities: [6, 4, 20, 12],
  },
  {
    ascension: 'ASCENSION_4',
    cost: 80000,
    level: '60-70',
    order: 4,
    materialQuatities: [3, 8, 30, 18],
  },
  {
    ascension: 'ASCENSION_5',
    cost: 100000,
    level: '70-80',
    order: 5,
    materialQuatities: [6, 12, 45, 12],
  },
  {
    ascension: 'ASCENSION_6',
    cost: 120000,
    level: '80-90',
    order: 6,
    materialQuatities: [6, 20, 60, 24],
  },
]

export const ASCENSION_TALENT = [
  {
    ascension: 'ASCENSION_1',
    cost: 12500,
    level: '1-2',
    order: 1,
    materialQuatities: [3, 6],
  },
  {
    ascension: 'ASCENSION_2',
    cost: 17500,
    level: '2-3',
    order: 2,
    materialQuatities: [2, 3],
  },
  {
    ascension: 'ASCENSION_3',
    cost: 25000,
    level: '3-4',
    order: 3,
    materialQuatities: [4, 4],
  },
  {
    ascension: 'ASCENSION_4',
    cost: 30000,
    level: '4-5',
    order: 4,
    materialQuatities: [6, 6],
  },
  {
    ascension: 'ASCENSION_5',
    cost: 37500,
    level: '5-6',
    order: 5,
    materialQuatities: [9, 9],
  },
  {
    ascension: 'ASCENSION_6',
    cost: 120000,
    level: '6-7',
    order: 6,
    materialQuatities: [4, 4, 1],
  },
  {
    ascension: 'ASCENSION_7',
    cost: 260000,
    level: '7-8',
    order: 7,
    materialQuatities: [6, 6, 1],
  },
  {
    ascension: 'ASCENSION_8',
    cost: 450000,
    level: '8-9',
    order: 8,
    materialQuatities: [12, 9, 2],
  },
  {
    ascension: 'ASCENSION_9',
    cost: 700000,
    level: '9-10',
    order: 9,
    materialQuatities: [16, 12, 2, 1],
  },
]

export const ASCENSION_WEAPON_FIVE_STARS = [
  {
    ascension_level: 'ASCENSION_1',
    cost: 10000,
    level: '20-40',
    order: 1,
    materialQuantities: [5, 5, 3],
  },
  {
    ascension_level: 'ASCENSION_2',
    cost: 20000,
    level: '40-50',
    order: 2,
    materialQuantities: [5, 18, 12],
  },
  {
    ascension_level: 'ASCENSION_3',
    cost: 30000,
    level: '50-60',
    order: 3,
    materialQuantities: [9, 9, 9],
  },
  {
    ascension_level: 'ASCENSION_4',
    cost: 45000,
    level: '60-70',
    order: 4,
    materialQuantities: [5, 18, 14],
  },
  {
    ascension_level: 'ASCENSION_5',
    cost: 55000,
    level: '70-80',
    order: 5,
    materialQuantities: [9, 14, 9],
  },
  {
    ascension_level: 'ASCENSION_6',
    cost: 65000,
    level: '80-90',
    order: 6,
    materialQuantities: [6, 27, 18],
  },
]

export const ASCENSION_WEAPON_FOUR_STARS = [
  {
    ascension_level: 'ASCENSION_1',
    cost: 5000,
    level: '20-40',
    order: 1,
    materialQuantities: [3, 3, 2],
  },
  {
    ascension_level: 'ASCENSION_2',
    cost: 15000,
    level: '40-50',
    order: 2,
    materialQuantities: [3, 12, 8],
  },
  {
    ascension_level: 'ASCENSION_3',
    cost: 20000,
    level: '50-60',
    order: 3,
    materialQuantities: [6, 6, 6],
  },
  {
    ascension_level: 'ASCENSION_4',
    cost: 30000,
    level: '60-70',
    order: 4,
    materialQuantities: [3, 12, 9],
  },
  {
    ascension_level: 'ASCENSION_5',
    cost: 35000,
    level: '70-80',
    order: 5,
    materialQuantities: [6, 9, 6],
  },
  {
    ascension_level: 'ASCENSION_6',
    cost: 45000,
    level: '80-90',
    order: 6,
    materialQuantities: [4, 18, 12],
  },
]

export const ASCENSION_WEAPON_THREE_STARS = [
  {
    ascension_level: 'ASCENSION_1',
    cost: 5000,
    level: '20-40',
    order: 1,
    materialQuantities: [2, 2, 1],
  },
  {
    ascension_level: 'ASCENSION_2',
    cost: 10000,
    level: '40-50',
    order: 2,
    materialQuantities: [2, 8, 3],
  },
  {
    ascension_level: 'ASCENSION_3',
    cost: 15000,
    level: '50-60',
    order: 3,
    materialQuantities: [4, 4, 4],
  },
  {
    ascension_level: 'ASCENSION_4',
    cost: 20000,
    level: '60-70',
    order: 4,
    materialQuantities: [2, 8, 6],
  },
  {
    ascension_level: 'ASCENSION_5',
    cost: 25000,
    level: '70-80',
    order: 5,
    materialQuantities: [4, 6, 4],
  },
  {
    ascension_level: 'ASCENSION_6',
    cost: 30000,
    level: '80-90',
    order: 6,
    materialQuantities: [34, 12, 8],
  },
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
    value: 'WEAPON_MATERIAL',
    label: 'Material de arma',
    name: 'weapon_material',
  },
  {
    value: 'UPGRADE_MATERIAL',
    label: 'Material de mejora',
    name: 'upgrade_material',
  },
]

export const SKILL_TYPE = [
  { value: 'TALENT', label: 'Talento', skill: 'talent' },
  { value: 'PASSIVE', label: 'Pasiva', skill: 'passive' },
  { value: 'CONSTELLATION', label: 'Constelacion', skill: 'constellation' },
]

export const CONSTELLATION_TYPE = [
  { value: '0', label: 'Por defecto' },
  { value: '1', label: 'Constelación 1' },
  { value: '2', label: 'Constelación 2' },
  { value: '3', label: 'Constelación 3' },
  { value: '4', label: 'Constelación 4' },
  { value: '5', label: 'Constelación 5' },
  { value: '6', label: 'Constelación 6' },
]

export const FIGHT_ENUMS_ATTRIBUTES = [
  'FIGHT_PROP_BASE_ATTACK',
  'FIGHT_PROP_HP',
  'FIGHT_PROP_ATTACK',
  'FIGHT_PROP_DEFENSE',
  'FIGHT_PROP_HP_PERCENT',
  'FIGHT_PROP_ATTACK_PERCENT',
  'FIGHT_PROP_DEFENSE_PERCENT',
  'FIGHT_PROP_CRITICAL',
  'FIGHT_PROP_CRITICAL_HURT',
  'FIGHT_PROP_CHARGE_EFFICIENCY',
  'FIGHT_PROP_HEAL_ADD',
  'FIGHT_PROP_ELEMENT_MASTERY',
  'FIGHT_PROP_PHYSICAL_ADD_HURT',
  'FIGHT_PROP_FIRE_ADD_HURT',
  'FIGHT_PROP_ELEC_ADD_HURT',
  'FIGHT_PROP_WATER_ADD_HURT',
  'FIGHT_PROP_WIND_ADD_HURT',
  'FIGHT_PROP_ICE_ADD_HURT',
  'FIGHT_PROP_ROCK_ADD_HURT',
  'FIGHT_PROP_GRASS_ADD_HURT',
]
