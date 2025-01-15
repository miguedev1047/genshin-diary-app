import {
  getAttributesText,
  getRarityStars,
  getWeaponText,
} from '@/features/utils/character-texts'
import { WeaponInfoCardProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/_components/weapon-info-card/weapon-info-card.type'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE, NONE } from '@/consts/misc'
import { WeaponName } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/_components/weapon-name'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import Image from 'next/image'
import parse from 'html-react-parser'

export function WeaponInfoCard(props: WeaponInfoCardProps) {
  const { image_url, name, rarity, passive_description, secondary_stat, type } =
    props

  const STARS = getRarityStars(rarity)
  const WEAPON_TYPE = getWeaponText(type)
  const SECONDARY_STAT = getAttributesText(secondary_stat)

  return (
    <div className='grid grid-cols-5 w-full gap-4'>
      <div className='col-span-1 flex items-center flex-col gap-4'>
        <SquareBox
          size='full'
          className='aspect-square bg-secondary size-[200px]'
        >
          <Image
            priority
            src={image_url ?? DEFAULT_IMAGE}
            alt={name ?? NONE}
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
        <WeaponName data={props} />

        <div className='space-y-4'>
          <div className='[&>p]:text-pretty text-sm opacity-70 tiptap'>
            {parse(passive_description ?? '')}
          </div>

          <div className='space-x-2'>
            <Badge>{WEAPON_TYPE}</Badge>
            <Badge>{SECONDARY_STAT}</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
