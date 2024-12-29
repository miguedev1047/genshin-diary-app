'use client'

import {
  getAttributesText,
  getRarityStars,
  getWeaponText,
} from '@/features/utils/character-texts'
import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { WeaponInfoForm } from '@/app/(panel)/editor/weapon/[id]/weapon-info/_components/weapon-info-form'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { NONE } from '@/consts/misc'
import { useGetWeapon } from '@/app/(panel)/editor/weapon/[id]/provider'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'
import parse from 'html-react-parser'

export function WeaponInfo() {
  const { data: WEAPON } = useGetWeapon()

  const STARS = getRarityStars(WEAPON?.rarity)
  const MAIN_STAT = getAttributesText(WEAPON?.main_stat)
  const WEAPON_TYPE = getWeaponText(WEAPON?.type)

  return (
    <EditorCard
      title='Información del arma'
      className='grid grid-cols-5 gap-4'
      renderForm={<WeaponInfoForm />}
    >
      <div className='col-span-1'>
        <SquareBox
          size='full'
          className='aspect-square bg-secondary'
        >
          <Image
            priority
            src={WEAPON?.image_url ?? NONE}
            alt={WEAPON?.name ?? NONE}
            width={1080}
            height={720}
            className='size-full object-contain'
          />
        </SquareBox>
      </div>
      <div className='col-span-4 space-y-5'>
        <div className='space-y-2'>
          <h2 className='text-6xl font-extrabold uppercase leading-none'>
            {WEAPON?.name}
          </h2>

          <Badge
            variant='secondary'
            className='rounded-lg p-3 flex justify-between items-center gap-2'
          >
            <ul className='flex items-center gap-1'>
              {STARS.map((_, index) => (
                <li key={index}>
                  <Star className='text-amber-500' />
                </li>
              ))}
            </ul>

            <p className='text-xl font-extrabold uppercase'>
              ATQ MAX: {WEAPON?.base_attack}
            </p>
          </Badge>
        </div>

        <div className='space-y-2'>
          <ul className='flex items-center gap-2 mb-4'>
            <Badge>{MAIN_STAT}</Badge>
            <Badge>{WEAPON_TYPE}</Badge>
          </ul>

          <p className='[&>p]:text-pretty text-sm opacity-70 my-20 tiptap'>
            {parse(WEAPON?.passive_description ?? '')}
          </p>
        </div>
      </div>
    </EditorCard>
  )
}
