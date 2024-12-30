import {
  getAttributesText,
  getElementIcon,
  getRarityStars,
  getRegionText,
  getRoleText,
  getWeaponText,
} from '@/features/utils/character-texts'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb'
import { CharacterInfoProps } from './character-info.type'
import { Tittle } from '@/components/ui/tittle'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Star } from 'lucide-react'
import Image from 'next/image'
import parse from 'html-react-parser'

export function CharacterInfo(props: CharacterInfoProps) {
  const { data: CHARACTER } = props
  const { rarity, attribute, role, weapon, element, region } = CHARACTER

  const STARS = getRarityStars(rarity)
  const ATTRIBUTE = getAttributesText(attribute)
  const ROLE = getRoleText(role)
  const WEAPON = getWeaponText(weapon)
  const ELEMENT = getElementIcon(element)
  const REGION = getRegionText(region)

  return (
    <article className='flex items-start justify-between'>
      <div className='space-y-4 w-[540px]'>
        <Breadcrumb className='mb-10'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{CHARACTER.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className='space-y-3'>
          <div className='flex items-center gap-4'>
            <Tittle size='3xl'>{CHARACTER.name}</Tittle>

            <Image
              width={32}
              height={32}
              src={ELEMENT?.src ?? DEFAULT_IMAGE}
              alt={ELEMENT?.label ?? ''}
            />
          </div>

          <ul className='flex items-center gap-1'>
            {STARS.map((_, index) => (
              <li key={index}>
                <Star className='text-amber-500 size-5' />
              </li>
            ))}
          </ul>
        </div>

        <div className='space-x-2'>
          <Badge>{REGION}</Badge>
          <Badge>{ATTRIBUTE}</Badge>
          <Badge>{WEAPON}</Badge>
          <Badge>{ROLE}</Badge>
        </div>

        <div className='tiptap'>{parse(CHARACTER.description)}</div>
      </div>

      <figure className='w-[540px] h-auto'>
        <Image
          src={CHARACTER.images?.splash_art_url ?? DEFAULT_IMAGE}
          alt={CHARACTER.name}
          width={1600}
          height={900}
          className='size-full object-cover'
        />
      </figure>
    </article>
  )
}
