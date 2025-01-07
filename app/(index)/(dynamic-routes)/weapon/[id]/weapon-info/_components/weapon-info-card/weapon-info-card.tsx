import {
  getAttributesText,
  getRarityStars,
  getWeaponText,
} from '@/features/utils/character-texts'
import { cn } from '@/lib/utils'
import { WeaponInfoCardProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/_components/weapon-info-card/weapon-info-card.type'
import { getBorderColorByRarity } from '@/features/utils/rarity-color'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE, PARSE_OPTIONS } from '@/consts/misc'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { Title } from '@/components/ui/title'
import Image from 'next/image'
import parse from 'html-react-parser'

export function WeaponInfoCard(props: WeaponInfoCardProps) {
  const {
    base_attack,
    image_url,
    name,
    main_stat,
    rarity,
    passive_description,
    type,
  } = props

  const STARS = getRarityStars(rarity)
  const MAIN_STAT = getAttributesText(main_stat)
  const WEAPON_TYPE = getWeaponText(type)
  const RARITY_COLOR = getBorderColorByRarity(rarity)

  return (
    <div className='w-full flex gap-4'>
      <article className='aspect-square size-[200px]'>
        <SquareBox
          size='full'
          className={cn(
            'aspect-square bg-secondary border rounded-lg',
            RARITY_COLOR
          )}
        >
          <Image
            priority
            src={image_url ?? DEFAULT_IMAGE}
            alt={name ?? DEFAULT_IMAGE}
            width={1080}
            height={720}
            className='size-full object-contain'
          />
        </SquareBox>
      </article>
      <div className='col-span-4 space-y-5'>
        <article className='space-y-2'>
          <Title
            size='3xl'
            className='font-extrabold uppercase leading-none'
          >
            {name}
          </Title>

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
              ATQ MAX: {base_attack}
            </p>
          </Badge>
        </article>

        <div className='space-y-2'>
          <ul className='flex items-center gap-2 mb-4'>
            <Badge>{MAIN_STAT}</Badge>
            <Badge>{WEAPON_TYPE}</Badge>
          </ul>

          <div className='tiptap text-pretty text-sm opacity-70 my-20'>
            {parse(passive_description, PARSE_OPTIONS)}
          </div>
        </div>
      </div>
    </div>
  )
}
