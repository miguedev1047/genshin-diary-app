import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import {
  getAttributesText,
  getRarityStars,
  getWeaponIcon,
  getWeaponText,
} from '@/features/utils/character-texts'
import { WeaponInfoProps } from '@/app/(index)/(dynamic-routes)/weapon/[id]/weapon-info/weapon-info.type'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { TiptapPreview } from '@/components/tiptap'
import { WeaponStats } from './_components/weapon-name'
import Image from 'next/image'
import { BlurImage } from '@/components/blur-image'
import { Title } from '@/components/ui/title'

export function WeaponInfo(props: WeaponInfoProps) {
  const { data: WEAPON } = props

  const { image_url, name, passive_description, rarity, secondary_stat, type } =
    WEAPON

  const STARS = getRarityStars(rarity)
  const SECONDARY_STAT = getAttributesText(secondary_stat)
  const WEAPON_TYPE = getWeaponText(type)
  const WEAPON_ICON = getWeaponIcon(type)

  return (
    <div className='flex items-start justify-between col-span-2'>
      <div className='space-y-4 w-full'>
        <Breadcrumb className='mb-5 md:mb-10'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/weapons'>Armas</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{WEAPON.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='flex items-center space-x-4'>
          <SquareBox
            size='lg'
            className='bg-secondary'
          >
            <Image
              priority
              src={image_url ?? DEFAULT_IMAGE}
              alt={name ?? 'Personaje'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </SquareBox>

          <div className='space-y-3'>
            <div className='flex items-center gap-4'>
              <Title size='2xl'>{name}</Title>

              <SquareBox className='size-8 p-1 rounded-sm'>
                <BlurImage
                  width={32}
                  height={32}
                  src={WEAPON_ICON ?? DEFAULT_IMAGE}
                  alt={WEAPON_TYPE ?? ''}
                  className='size-full object-cover'
                />
              </SquareBox>
            </div>

            <ul className='flex items-center md:gap-1'>
              {STARS.map((_, index) => (
                <li key={index}>
                  <Star className='text-amber-500 size-4 md:size-5' />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='space-y-4'>
          <div className='flex flex-wrap items-center gap-1 md:gap-2'>
            <Badge>{WEAPON_TYPE}</Badge>
            <Badge>{SECONDARY_STAT}</Badge>
          </div>

          <WeaponStats data={WEAPON} />
        </div>

        <TiptapPreview
          content={passive_description}
          className='w-full max-w-[720px]'
        />
      </div>
    </div>
  )
}
