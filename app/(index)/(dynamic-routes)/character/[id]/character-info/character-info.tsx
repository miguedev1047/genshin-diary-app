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
import { CharacterInfoProps } from '@/app/(index)/(dynamic-routes)/character/[id]/character-info/character-info.type'
import { Title } from '@/components/ui/title'
import { Badge } from '@/components/ui/badge'
import { DEFAULT_IMAGE, PARSE_OPTIONS } from '@/consts/misc'
import { Star } from 'lucide-react'
import { BlurImage } from '@/components/blur-image'
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
    <div className='flex items-start justify-between col-span-2'>
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
            <Title size='3xl'>{CHARACTER.name}</Title>

            <BlurImage
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

        <div className='tiptap opacity-70'>
          {parse(CHARACTER.description, PARSE_OPTIONS)}
        </div>
      </div>

      <figure className='w-[540px] h-[375px]'>
        <BlurImage
          src={CHARACTER.images?.splash_art_url ?? DEFAULT_IMAGE}
          alt={CHARACTER.name}
          width={1600}
          height={900}
          className='size-full object-cover'
        />
      </figure>
    </div>
  )
}
