import { ATTRIBUTES, MATERIAL_TYPES, ROLE, STARS, WEAPON_TYPE } from '@/consts/general'

export function getWeaponText(weapon: string | undefined) {
  const WEAPON = WEAPON_TYPE.find((item) => item.value === weapon)
  if (WEAPON) return WEAPON.label

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
