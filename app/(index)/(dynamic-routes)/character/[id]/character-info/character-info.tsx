import {
  getAttributesText,
  getElementIcon,
  getElementText,
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
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Star } from 'lucide-react'
import { BlurImage } from '@/components/blur-image'
import { TiptapPreview } from '@/components/tiptap'
import { SquareBox } from '@/components/square-box'
import Image from 'next/image'

export function CharacterInfo(props: CharacterInfoProps) {
  const { data: CHARACTER } = props
  const {
    rarity,
    attribute,
    role,
    weapon,
    element,
    region,
    description,
  } = CHARACTER

  const STARS = getRarityStars(rarity)
  const ATTRIBUTE = getAttributesText(attribute)
  const ROLE = getRoleText(role)
  const WEAPON = getWeaponText(weapon)
  const ELEMENT_ICON = getElementIcon(element)
  const ELEMENT_TEXT = getElementText(element)
  const REGION = getRegionText(region)

  return (
    <div className='flex items-start justify-between col-span-2'>
      <div className='space-y-4 w-[640px]'>
        <Breadcrumb className='mb-10'>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href='/'>Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href='/characters'>Personajes</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{CHARACTER.name}</BreadcrumbPage>
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
              src={CHARACTER?.images?.profile_image_url ?? DEFAULT_IMAGE}
              alt={CHARACTER?.name ?? 'Personaje'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </SquareBox>

          <div className='space-y-3'>
            <div className='flex items-center gap-4'>
              <Title size='3xl'>{CHARACTER.name}</Title>

              <figure className='size-8'>
                <BlurImage
                  width={32}
                  height={32}
                  src={ELEMENT_ICON ?? DEFAULT_IMAGE}
                  alt={ELEMENT_TEXT ?? ''}
                  className='size-full object-cover'
                />
              </figure>
            </div>

            <ul className='flex items-center gap-1'>
              {STARS.map((_, index) => (
                <li key={index}>
                  <Star className='text-amber-500 size-5' />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className='space-x-2'>
          <Badge>{REGION}</Badge>
          <Badge>{ATTRIBUTE}</Badge>
          <Badge>{WEAPON}</Badge>
          <Badge>{ROLE}</Badge>
        </div>

        <div className='tiptap opacity-70'>
          <TiptapPreview content={description} />
        </div>
      </div>
    </div>
  )
}
