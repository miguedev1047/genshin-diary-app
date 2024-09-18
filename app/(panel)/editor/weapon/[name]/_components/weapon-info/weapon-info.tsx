'use client'

import {
  getAttributesText,
  getRarityStars,
  getWeaponText,
} from '@/features/utils/character-texts'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { WeaponForm } from './weapon-form'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Star } from 'lucide-react'
import Image from 'next/image'

export function WeaponInfo() {
  const { data: WEAPON } = useGetWeaponByName()

  const STARS = getRarityStars(WEAPON?.rarity)
  const WEAPON_TYPE = getWeaponText(WEAPON?.type)
  const WEAPON_ATTRIBUTE = getAttributesText(WEAPON?.main_stat)

  return (
    <EditorCard
      title='Información del arma'
      renderForm={<WeaponForm />}
    >
      <div className='grid grid-cols-4 gap-4'>
        <div className='col-span-1'>
          <Card className='aspect-square bg-secondary'>
            <Image
              src={WEAPON?.image_url!}
              alt={WEAPON?.name!}
              width={1024}
              height={1024}
              className='object-contain size-full'
            />
          </Card>
        </div>

        <div className='col-span-3 space-y-4'>
          <div className='space-y-2'>
            <h2 className='text-[64px] font-extrabold uppercase leading-none'>
              {WEAPON?.name}
            </h2>

            <Badge className='flex justify-between items-center w-full bg-secondary hover:bg-accent p-4 rounded-md  '>
              <ul className='flex items-center gap-1'>
                {STARS.map((_, index) => (
                  <li key={index}>
                    <Star className='text-amber-400' />
                  </li>
                ))}
              </ul>

              <p className='text-foreground text-xl font-bold'>
                ATQ MAX.: {WEAPON?.base_attack}
              </p>
            </Badge>
          </div>

          <div className='space-y-2'>
            <div className='flex items-center gap-2'>
              <Badge>{WEAPON_TYPE}</Badge>
              <Badge>{WEAPON_ATTRIBUTE}</Badge>
            </div>

            <p className='text-sm opacity-70 text-pretty'>
              {WEAPON?.passive_description}
            </p>
          </div>
        </div>
      </div>
    </EditorCard>
  )
}
