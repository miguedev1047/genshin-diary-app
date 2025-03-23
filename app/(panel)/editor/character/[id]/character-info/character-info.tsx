'use client'

import {
  getAttributesText,
  getElementIcon,
  getElementText,
  getRarityStars,
  getRoleText,
  getWeaponText,
} from '@/features/utils/character-texts'
import { EditorCard } from '@/app/(panel)/_components/editor-card'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { useGetCharacter } from '@/features/providers/character-provider'
import { CharacterInfoForm } from '@/app/(panel)/editor/character/[id]/character-info/_components/character-info-form'
import { SquareBox } from '@/components/square-box'
import { TiptapPreview } from '@/components/tiptap'
import Image from 'next/image'

export function CharacterInfo() {
  const { data: CHARACTER } = useGetCharacter()

  const STARS = getRarityStars(CHARACTER?.rarity)
  const ATTRIBUTE = getAttributesText(CHARACTER?.attribute)
  const ROLE = getRoleText(CHARACTER?.role)
  const WEAPON = getWeaponText(CHARACTER?.weapon)
  const ELEMENT_ICON = getElementIcon(CHARACTER?.element)
  const ELEMENT_TEXT = getElementText(CHARACTER?.element)

  return (
    <div className='col-span-2'>
      <EditorCard
        title='Informacion del personaje'
        className='grid grid-cols-5 gap-4'
        renderForm={<CharacterInfoForm />}
      >
        <div className='col-span-1 flex items-center flex-col gap-4'>
          <SquareBox
            size='full'
            className='aspect-square bg-secondary'
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
          <ul className='flex items-center gap-1'>
            {STARS.map((_, index) => (
              <li key={index}>
                <Star className='text-amber-500' />
              </li>
            ))}
          </ul>
        </div>

        <div className='col-span-4 space-y-5'>
          <div className='flex items-center justify-between gap-4'>
            <h2 className='text-6xl font-bold uppercase leading-none'>
              {CHARACTER?.name}
            </h2>

            <div className='size-12'>
              <Image
                src={ELEMENT_ICON ?? DEFAULT_IMAGE}
                alt={ELEMENT_TEXT ?? ''}
                width={128}
                height={128}
                className='object-cover size-full'
              />
            </div>
          </div>

          <div className='space-y-4'>
            {CHARACTER?.description && (
              <TiptapPreview content={CHARACTER.description} />
            )}

            <div className='space-x-2'>
              <Badge>{ROLE}</Badge>
              <Badge>{ATTRIBUTE}</Badge>
              <Badge>{WEAPON}</Badge>
            </div>
          </div>
        </div>
      </EditorCard>
    </div>
  )
}
