import { cn } from '@/lib/utils'
import { AttackIcon } from '@/assets/svg/AttackIcon'
import { HpIcon } from '@/assets/svg/HpIcon'
import { DefenseIcon } from '@/assets/svg/DefenseIcon'
import { HpPercentIcon } from '@/assets/svg/HpPercentIcon'
import { AttackPercentIcon } from '@/assets/svg/AttackPercentIcon'
import { DefensePercentIcon } from '@/assets/svg/DefensePercentIcon'
import { ProbRateIcon } from '@/assets/svg/ProbRateIcon'
import { DmgCritIcon } from '@/assets/svg/DmgCritIcon'
import { EnergyRecharge } from '@/assets/svg/EnergyRecharge'
import { HealIcon } from '@/assets/svg/HealIcon'
import { ElementalMastery } from '@/assets/svg/ElementalMastery'
import { PhysicalIcon } from '@/assets/svg/PhysicalIcon'
import { PyroIcon } from '@/assets/svg/PyroIcon'
import { ElectroIcon } from '@/assets/svg/ElectroIcon'
import { HydroIcon } from '@/assets/svg/HydroIcon'
import { AnemoIcon } from '@/assets/svg/AnemoIcon'
import { CryoIcon } from '@/assets/svg/CryoIcon'
import { GeoIcon } from '@/assets/svg/GeoIcon'
import { DendroIcon } from '@/assets/svg/DendroIcon'

// Define attribute groups for better organization
const ATTRIBUTE_GROUPS = {
  BASE: [
    'FIGHT_PROP_BASE_ATTACK',
    'FIGHT_PROP_HP',
    'FIGHT_PROP_ATTACK',
    'FIGHT_PROP_DEFENSE',
  ],
  PERCENTAGE: [
    'FIGHT_PROP_HP_PERCENT',
    'FIGHT_PROP_DEFENSE_PERCENT',
    'FIGHT_PROP_ATTACK_PERCENT',
  ],
  STATS: [
    'FIGHT_PROP_CRITICAL',
    'FIGHT_PROP_CRITICAL_HURT',
    'FIGHT_PROP_CHARGE_EFFICIENCY',
    'FIGHT_PROP_HEAL_ADD',
    'FIGHT_PROP_ELEMENT_MASTERY',
  ],
  DAMAGE: [
    'FIGHT_PROP_PHYSICAL_ADD_HURT',
    'FIGHT_PROP_FIRE_ADD_HURT',
    'FIGHT_PROP_ELEC_ADD_HURT',
    'FIGHT_PROP_WATER_ADD_HURT',
    'FIGHT_PROP_WIND_ADD_HURT',
    'FIGHT_PROP_ICE_ADD_HURT',
    'FIGHT_PROP_ROCK_ADD_HURT',
    'FIGHT_PROP_GRASS_ADD_HURT',
  ],
  CURRENT: [
    'FIGHT_PROP_MAX_HP',
    'FIGHT_PROP_CUR_HP',
    'FIGHT_PROP_CUR_DEFENSE',
    'FIGHT_PROP_CUR_ATTACK',
  ],
} as const

// Use a more structured mapping approach with type safety
const ATTRIBUTE_ICON_MAP = {
  // Base stats
  FIGHT_PROP_BASE_ATTACK: AttackIcon,
  FIGHT_PROP_HP: HpIcon,
  FIGHT_PROP_ATTACK: AttackIcon,
  FIGHT_PROP_DEFENSE: DefenseIcon,

  // Current stats (same icons as base)
  FIGHT_PROP_MAX_HP: HpIcon,
  FIGHT_PROP_CUR_HP: HpIcon,
  FIGHT_PROP_CUR_DEFENSE: DefenseIcon,
  FIGHT_PROP_CUR_ATTACK: AttackIcon,

  // Percentage stats
  FIGHT_PROP_HP_PERCENT: HpPercentIcon,
  FIGHT_PROP_ATTACK_PERCENT: AttackPercentIcon,
  FIGHT_PROP_DEFENSE_PERCENT: DefensePercentIcon,

  // Advanced stats
  FIGHT_PROP_CRITICAL: ProbRateIcon,
  FIGHT_PROP_CRITICAL_HURT: DmgCritIcon,
  FIGHT_PROP_CHARGE_EFFICIENCY: EnergyRecharge,
  FIGHT_PROP_HEAL_ADD: HealIcon,
  FIGHT_PROP_ELEMENT_MASTERY: ElementalMastery,

  // Damage bonus stats
  FIGHT_PROP_PHYSICAL_ADD_HURT: PhysicalIcon,
  FIGHT_PROP_FIRE_ADD_HURT: PyroIcon,
  FIGHT_PROP_ELEC_ADD_HURT: ElectroIcon,
  FIGHT_PROP_WATER_ADD_HURT: HydroIcon,
  FIGHT_PROP_WIND_ADD_HURT: AnemoIcon,
  FIGHT_PROP_ICE_ADD_HURT: CryoIcon,
  FIGHT_PROP_ROCK_ADD_HURT: GeoIcon,
  FIGHT_PROP_GRASS_ADD_HURT: DendroIcon,
} as const

// Create a type from the keys of the icon map
export type FightAttributesProps = keyof typeof ATTRIBUTE_ICON_MAP

// Improve component props with better typing
interface AttributeIconProps {
  attribute: string
  className?: string
}

export const AttributeIcon = ({ attribute, className }: AttributeIconProps) => {
  const IconComponent = ATTRIBUTE_ICON_MAP[attribute as FightAttributesProps]

  // Return null if the attribute is not found
  if (!IconComponent) return null

  return (
    <div className={cn('size-4', className)}>
      <IconComponent className='size-full' />
    </div>
  )
}

// Export both the component and the constant for use elsewhere
export { ATTRIBUTE_ICON_MAP as FIGHT_ATTRIBUTES, ATTRIBUTE_GROUPS }
