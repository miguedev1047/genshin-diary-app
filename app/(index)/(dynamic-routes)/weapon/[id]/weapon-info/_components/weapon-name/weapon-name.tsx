'use client'

import { useState } from 'react'
import { Switch } from '@/components/ui/switch'
import { WeaponNameProps } from './weapon-name.type'

export function WeaponName(props: WeaponNameProps) {
  const { data: WEAPON } = props

  const [isMaxView, setIsMaxView] = useState(false)

  const ATTACK_BASE = isMaxView
    ? WEAPON?.max_base_attack
    : WEAPON?.min_base_attack

  const SECONDARY_STAT = isMaxView
    ? WEAPON?.max_secondary_stat_base
    : WEAPON?.min_secondary_stat_base

  return (
    <div className='space-y-2'>
      <div className='flex items-center justify-between mb-5 gap-8'>
        <h2 className='text-[40px] text-balance font-extrabold uppercase leading-none '>
          {WEAPON?.name}
        </h2>

        <div className='flex items-center gap-2'>
          <p className='text-center'>
            {isMaxView ? 'Stats máximas' : 'Stats minimas'}
          </p>
          <Switch
            checked={isMaxView}
            onCheckedChange={setIsMaxView}
          />
        </div>
      </div>

      <h2 className='text-2xl leading-none'>
        ATQ: <span className='font-bold'>{ATTACK_BASE}</span>
      </h2>

      <h2 className='text-xl leading-none'>
        Substat secundaria: <span className='font-bold'>{SECONDARY_STAT}%</span>
      </h2>
    </div>
  )
}
