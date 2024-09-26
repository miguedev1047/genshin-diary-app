import {
  getAttributesText,
  getRarityStars,
  getWeaponText,
} from '@/features/utils/character-texts'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { WeaponInfoProps } from '@/app/(panel)/editor/weapon/[name]/weapon-info/weapon-info.type'
import { EditorWeaponForm } from '@/app/(panel)/editor/weapon/[name]/weapon-info/_components/editor-weapon-form'
import { SquareBox } from '@/shared/components/square-box'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { NONE } from '@/consts/general'
import Image from 'next/image'

export function WeaponInfo(props: WeaponInfoProps) {
  const { data: WEAPON } = props

  const STARS = getRarityStars(WEAPON?.rarity)
  const MAIN_STAT = getAttributesText(WEAPON?.main_stat)
  const WEAPON_TYPE = getWeaponText(WEAPON?.type)

  return (
    <EditorCard
      title='Información del arma'
      className='grid grid-cols-5 gap-4'
      renderForm={<EditorWeaponForm data={WEAPON} />}
    >
      <div className='col-span-1'>
        <SquareBox>
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
          <ul className='flex items-center gap-2'>
            <Badge>{MAIN_STAT}</Badge>
            <Badge>{WEAPON_TYPE}</Badge>
          </ul>

          <p className='text-pretty text-sm opacity-70'>
            {WEAPON?.passive_description}
          </p>
        </div>
      </div>
    </EditorCard>
  )
}
