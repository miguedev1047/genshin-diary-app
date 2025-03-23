'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { WeaponNameProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/_components/weapon-name/weapon-name.type'
import { getAttributesText } from '@/features/utils/character-texts'

export function WeaponStats(props: WeaponNameProps) {
  const { data: WEAPON } = props
  const [isMaxView, setIsMaxView] = useState(false)

  const SECONDARY_STAT = getAttributesText(WEAPON?.secondary_stat)
  const IS_ELEM_MASTERY = WEAPON?.secondary_stat !== 'ELEMENTAL_MASTERY'

  const ATTACK_BASE = isMaxView
    ? WEAPON?.max_base_attack
    : WEAPON?.min_base_attack

  const SECONDARY_STAT_BASE = isMaxView
    ? WEAPON?.max_secondary_stat_base
    : WEAPON?.min_secondary_stat_base

  return (
    <div className='flex w-full justify-between items-start'>
      <div className='space-y-2'>
        <h2 className='text-lg md:text-xl font-medium leading-none'>
          ATQ Base: <span className='font-bold'>{ATTACK_BASE}</span>
        </h2>

        <h2 className='text-lg md:text-xl font-medium leading-none'>
          {SECONDARY_STAT}:{' '}
          <span className='font-bold'>
            {SECONDARY_STAT_BASE}
            {IS_ELEM_MASTERY && '%'}
          </span>
        </h2>
      </div>

      <div className='flex items-center gap-2'>
        <p className='text-sm md:text-base text-center'>
          {isMaxView ? 'Stats máximas' : 'Stats minimas'}
        </p>
        <Switch
          checked={isMaxView}
          onCheckedChange={setIsMaxView}
        />
      </div>
    </div>
  )
}
