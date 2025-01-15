import {
  ARTIFACTS_STATS,
  ATTRIBUTES,
  ELEMENTS,
  MATERIAL_TYPES,
  REGIONS,
  ROLE,
  SKILL_TYPE,
  STARS,
  WEAPON_TYPE,
} from '@/consts/general'

export function getWeaponText(weapon: string | undefined) {
  const WEAPON = WEAPON_TYPE.find((item) => item.value === weapon)
  if (WEAPON) return WEAPON.label

  return 'Indefinido'
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

export function getAttributesText(attribute: string | undefined) {
  const ATTRIBUTE = ATTRIBUTES.find((item) => item.value === attribute)
  if (ATTRIBUTE) return ATTRIBUTE.label

  return 'Indefinido'
}

export function getRarityStars(rarity: string | undefined) {
  const STAR = STARS.find((item) => item.value === rarity)

  if (STAR) {
    const [_, STAR_NUMBER] = STAR.value.split('_')
    return Array.from({ length: Number(STAR_NUMBER) }, (_, i) => i + 1)
  }

  return []
}

export function getElementIcon(element: string | undefined) {
  const ELEMENT = ELEMENTS.find((item) => item.value === element)
  if (ELEMENT) return ELEMENT

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

export function getCharacterName(name: string) {
  return name
    .split('-')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')
}
