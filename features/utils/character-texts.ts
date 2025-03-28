import {
  ARTIFACTS_STATS,
  ASCENSION_WEAPON_FIVE_STARS,
  ASCENSION_WEAPON_FOUR_STARS,
  ASCENSION_WEAPON_THREE_STARS,
  ATTRIBUTES,
  ELEMENTS,
  MATERIAL_TYPES,
  REGIONS,
  ROLE,
  SKILL_TYPE,
  STARS,
  WEAPON_TYPE,
} from '@/consts/general'
import { StatsList } from '@/types/player-data.type'

export function getWeaponText(weapon: string | undefined) {
  const WEAPON = WEAPON_TYPE.find((item) => item.value === weapon)
  if (WEAPON) return WEAPON.label

  return 'Indefinido'
}

export function getWeaponIcon(weapon: string | undefined) {
  const WEAPON = WEAPON_TYPE.find((item) => item.value === weapon)
  if (WEAPON) return WEAPON.src

  return null
}

export function getRegionText(region: string | undefined) {
  const REGION = REGIONS.find((item) => item.value === region)
  if (REGION) return REGION.label

  return 'Indefinido'
}

export function getRoleText(role: string | undefined) {
  const ROLES = ROLE.find((item) => item.value === role)
  if (ROLES) return ROLES.label

  return 'Indefinido'
}

export function getRarityText(rarity: string | undefined) {
  const RARITY = STARS.find((item) => item.value === rarity)
  if (RARITY) return RARITY.label

  return 'Indefinido'
}

export function getRarityStars(rarity: string | undefined) {
  const STAR = STARS.find((item) => item.value === rarity)

  if (STAR) {
    const STAR_NUMBER = STAR.value.split('_')[1]
    return Array.from({ length: Number(STAR_NUMBER) }, (_, i) => i + 1)
  }

  return []
}

export function getAttributesText(attribute: string | undefined) {
  const ATTRIBUTE = ATTRIBUTES.find((item) => item.value === attribute)
  if (ATTRIBUTE) return ATTRIBUTE.label

  return 'Indefinido'
}

export function getElementIcon(element: string | undefined) {
  const ELEMENT = ELEMENTS.find((item) => item.value === element)
  if (ELEMENT) return ELEMENT.src

  return null
}

export function getElementText(element: string | undefined) {
  const ELEMENT = ELEMENTS.find((item) => item.value === element)
  if (ELEMENT) return ELEMENT.label

  return null
}

export function getSkillTypeText(skillType: string | undefined) {
  const SKILL = SKILL_TYPE.find((item) => item.value === skillType)
  if (SKILL) return SKILL.label

  return 'Indefinido'
}

export function getStatPriorityText(
  type: 'circlet' | 'globet' | 'sands',
  statPriority?: string
) {
  const STAT_PRIORITY = ARTIFACTS_STATS[type].find(
    (item) => item.value === statPriority
  )
  if (STAT_PRIORITY) return STAT_PRIORITY.label

  return 'Indefinido'
}

export function getMaterialTypeText(materialType: string | undefined) {
  const MATERIAL = MATERIAL_TYPES.find((item) => item.value === materialType)
  if (MATERIAL) return MATERIAL.label

  return 'Indefinido'
}

export function getAscensionByRarity(rarity: string | undefined) {
  const RARIRTY = parseInt(rarity?.split('_')[1] || '0')

  switch (RARIRTY) {
    case 5:
      return ASCENSION_WEAPON_FIVE_STARS
    case 4:
      return ASCENSION_WEAPON_FOUR_STARS
    case 3:
      return ASCENSION_WEAPON_THREE_STARS
    default:
      return null
  }
}

export function getCharacterStats (data: StatsList[]) {
  return {
    baseHealth: { ...data[0] },
    health: { ...data[1] },
    totalHealth: { ...data[36] },
    baseAtk: { ...data[3] },
    atk: { ...data[4] },
    totalAtk: { ...data[38] },
    baseDef: { ...data[6] },
    totalDef: { ...data[39] },
    elementalMastery: { ...data[16] },
    elementBonus: { ...data[33] },
    critRate: { ...data[11] },
    dmgCrit: { ...data[12] },
    healingBonus: { ...data[14] },
    incomingHealingBonus: { ...data[15] },
    energyRecharge: { ...data[13] },
  }
}