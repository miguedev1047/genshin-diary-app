export function getColorByRarity(rarity: string | undefined) {
  if (!rarity) return 'text-gray-600'

  switch (rarity) {
    case 'STAR_5':
      return 'text-amber-400'
    case 'STAR_4':
      return 'text-purple-600'
    case 'STAR_3':
      return 'text-blue-500'
    case 'STAR_2':
      return 'text-green-500'
    case 'STAR_1':
      return 'text-gray-500'
    default:
      return 'text-gray-600'
  }
}

export function getBgColorByRarity(rarity: string | undefined) {
  if (!rarity) return 'bg-gray-600'

  switch (rarity) {
    case 'STAR_5':
      return 'bg-amber-400'
    case 'STAR_4':
      return 'bg-purple-600'
    case 'STAR_3':
      return 'bg-blue-500'
    case 'STAR_2':
      return 'bg-green-500'
    case 'STAR_1':
      return 'bg-gray-500'
    default:
      return 'bg-gray-600'
  }
}

export function getBorderColorByRarityHover(rarity: string | undefined) {
  if (!rarity) return 'hover:border-gray-600'

  switch (rarity) {
    case 'STAR_5':
      return 'hover:border-amber-400'
    case 'STAR_4':
      return 'hover:border-purple-600'
    case 'STAR_3':
      return 'hover:border-blue-500'
    case 'STAR_2':
      return 'hover:border-green-500'
    case 'STAR_1':
      return 'hover:border-gray-500'
    default:
      return 'hover:border-gray-600'
  }
}

export function getBorderColorByRarity(rarity: string | undefined) {
  if (!rarity) return 'border-gray-600'

  switch (rarity) {
    case 'STAR_5':
      return 'border-amber-400'
    case 'STAR_4':
      return 'border-purple-600'
    case 'STAR_3':
      return 'border-blue-500'
    case 'STAR_2':
      return 'border-green-500'
    case 'STAR_1':
      return 'border-gray-500'
    default:
      return 'border-gray-600'
  }
}
