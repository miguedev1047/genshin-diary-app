import { AttackIcon } from '@/assets/svg/AttackIcon'
import { AttackPercentIcon } from '@/assets/svg/AttackPercentIcon'
import { CryoIcon } from '@/assets/svg/CryoIcon'
import { HealIcon } from '@/assets/svg/HealIcon'
import { HpIcon } from '@/assets/svg/HpIcon'
import { DefenseIcon } from '@/assets/svg/DefenseIcon'
import { HpPercentIcon } from '@/assets/svg/HpPercentIcon'
import { DefensePercentIcon } from '@/assets/svg/DefensePercentIcon'
import { ProbRateIcon } from '@/assets/svg/ProbRateIcon'
import { DmgCritIcon } from '@/assets/svg/DmgCritIcon'
import { EnergyRecharge } from '@/assets/svg/EnergyRecharge'
import { ElementalMastery } from '@/assets/svg/ElementalMastery'
import { PhysicalIcon } from '@/assets/svg/PhysicalIcon'
import { PyroIcon } from '@/assets/svg/PyroIcon'
import { ElectroIcon } from '@/assets/svg/ElectroIcon'
import { HydroIcon } from '@/assets/svg/HydroIcon'
import { AnemoIcon } from '@/assets/svg/AnemoIcon'
import { GeoIcon } from '@/assets/svg/GeoIcon'
import { DendroIcon } from '@/assets/svg/DendroIcon'

export const FIGHT_ATTRIBUTES = {
  FIGHT_PROP_BASE_ATTACK: <AttackIcon />,
  FIGHT_PROP_HP: <HpIcon />,
  FIGHT_PROP_MAX_HP: <HpIcon />,
  FIGHT_PROP_CUR_HP: <HpIcon />,
  FIGHT_PROP_CUR_DEFENSE: <DefenseIcon />,
  FIGHT_PROP_CUR_ATTACK: <AttackIcon />,
  FIGHT_PROP_ATTACK: <AttackIcon />,
  FIGHT_PROP_DEFENSE: <DefenseIcon />,
  FIGHT_PROP_HP_PERCENT: <HpPercentIcon />,
  FIGHT_PROP_ATTACK_PERCENT: <AttackPercentIcon />,
  FIGHT_PROP_DEFENSE_PERCENT: <DefensePercentIcon />,
  FIGHT_PROP_CRITICAL: <ProbRateIcon />,
  FIGHT_PROP_CRITICAL_HURT: <DmgCritIcon />,
  FIGHT_PROP_CHARGE_EFFICIENCY: <EnergyRecharge />,
  FIGHT_PROP_HEAL_ADD: <HealIcon />,
  FIGHT_PROP_ELEMENT_MASTERY: <ElementalMastery />,
  FIGHT_PROP_PHYSICAL_ADD_HURT: <PhysicalIcon />,
  FIGHT_PROP_FIRE_ADD_HURT: <PyroIcon />,
  FIGHT_PROP_ELEC_ADD_HURT: <ElectroIcon />,
  FIGHT_PROP_WATER_ADD_HURT: <HydroIcon />,
  FIGHT_PROP_WIND_ADD_HURT: <AnemoIcon />,
  FIGHT_PROP_ICE_ADD_HURT: <CryoIcon />,
  FIGHT_PROP_ROCK_ADD_HURT: <GeoIcon />,
  FIGHT_PROP_GRASS_ADD_HURT: <DendroIcon />,
}

export const AttributeIcon = ({ attribute }: { attribute: string }) => (
  <span className='!size-4'>
    {FIGHT_ATTRIBUTES[attribute as FightAttributesProps]}
  </span>
)

export type FightAttributesProps =
  | 'FIGHT_PROP_BASE_ATTACK'
  | 'FIGHT_PROP_HP'
  | 'FIGHT_PROP_ATTACK'
  | 'FIGHT_PROP_DEFENSE'
  | 'FIGHT_PROP_HP_PERCENT'
  | 'FIGHT_PROP_DEFENSE_PERCENT'
  | 'FIGHT_PROP_ATTACK_PERCENT'
  | 'FIGHT_PROP_CRITICAL'
  | 'FIGHT_PROP_CRITICAL_HURT'
  | 'FIGHT_PROP_CHARGE_EFFICIENCY'
  | 'FIGHT_PROP_PHYSICAL_ADD_HURT'
  | 'FIGHT_PROP_HEAL_ADD'
  | 'FIGHT_PROP_ELEMENT_MASTERY'
  | 'FIGHT_PROP_FIRE_ADD_HURT'
  | 'FIGHT_PROP_ELEC_ADD_HURT'
  | 'FIGHT_PROP_WATER_ADD_HURT'
  | 'FIGHT_PROP_WIND_ADD_HURT'
  | 'FIGHT_PROP_ICE_ADD_HURT'
  | 'FIGHT_PROP_ROCK_ADD_HURT'
  | 'FIGHT_PROP_GRASS_ADD_HURT'
