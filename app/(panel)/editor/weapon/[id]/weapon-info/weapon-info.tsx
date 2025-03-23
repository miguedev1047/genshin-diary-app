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
import { DEFAULT_IMAGE, NONE } from '@/consts/misc'
import { useGetWeapon } from '@/features/providers/weapon-provider'
import { SquareBox } from '@/components/square-box'
import { WeaponName } from '@/app/(panel)/editor/weapon/[id]/weapon-info/_components/weapon-name'
import { TiptapPreview } from '@/components/tiptap'
import Image from 'next/image'

export function WeaponInfo() {
  const { data: WEAPON } = useGetWeapon()

  const STARS = getRarityStars(WEAPON?.rarity)
  const WEAPON_TYPE = getWeaponText(WEAPON?.type)
  const SECONDARY_STAT = getAttributesText(WEAPON?.secondary_stat)

  return (
    <EditorCard
      title='Información del arma'
      className='grid grid-cols-5 w-full gap-4'
      renderForm={<WeaponInfoForm />}
    >
      <div className='col-span-1 flex items-center flex-col gap-4'>
        <SquareBox
          size='full'
          className='aspect-square bg-secondary size-[200px]'
        >
          <Image
            priority
            src={WEAPON?.image_url ?? DEFAULT_IMAGE}
            alt={WEAPON?.name ?? NONE}
            width={1080}
            height={720}
            className='size-full object-contain'
          />
        </SquareBox>
        <ul className='flex items-center gap-1'>
          {STARS.map((_, index) => (
            <li key={index}>
              <Star className='text-amber-500 size-8' />
            </li>
          ))}
        </ul>
      </div>
      <div className='col-span-4 space-y-5'>
        <WeaponName />

        <div className='space-y-4'>
          {WEAPON?.passive_description && (
            <TiptapPreview content={WEAPON.passive_description} />
          )}

          <div className='space-x-2'>
            <Badge>{WEAPON_TYPE}</Badge>
            <Badge>{SECONDARY_STAT}</Badge>
          </div>
        </div>
      </div>
    </EditorCard>
  )
}
