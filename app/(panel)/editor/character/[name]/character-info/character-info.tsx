'use client'

import {
  getAttributesText,
  getElementIcon,
  getRarityStars,
  getRoleText,
  getWeaponText,
} from '@/features/utils/character-texts'
import { EditorCard } from '@/shared/layouts/panel/editor-card'
import { EditorCharacterForm } from './_components/editor_character-form'
import { Badge } from '@/components/ui/badge'
import { Star } from 'lucide-react'
import { DEFAULT_IMAGE } from '@/consts/general'
import { useGetCharacter } from '@/editor/character/[name]/provider'
import Image from 'next/image'

export async function CharacterInfo() {
  const { data: CHARACTER } = useGetCharacter()

  const STARS = getRarityStars(CHARACTER?.rarity)
  const ATTRIBUTE = getAttributesText(CHARACTER?.attribute)
  const ROLE = getRoleText(CHARACTER?.role)
  const WEAPON = getWeaponText(CHARACTER?.weapon)
  const ELEMENT = getElementIcon(CHARACTER?.element)

  return (
    <EditorCard
      title='Informacion del personaje'
      renderForm={<EditorCharacterForm data={CHARACTER} />}
    >
      <div className='grid grid-cols-5 gap-4'>
        <div className='col-span-1'>
          <figure className='aspect-square bg-secondary rounded-lg'>
            <Image
              priority
              src={CHARACTER?.images?.splash_art_url ?? DEFAULT_IMAGE}
              alt={CHARACTER?.name ?? 'Personaje'}
              width={1080}
              height={1080}
              className='object-cover size-full'
            />
          </figure>
        </div>

        <div className='col-span-4 space-y-5'>
          <div className='space-y-2'>
            <h2 className='text-6xl font-bold uppercase leading-none'>
              {CHARACTER?.name}
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

              <div className='size-12'>
                <Image
                  src={ELEMENT?.src ?? DEFAULT_IMAGE}
                  alt={ELEMENT?.label ?? 'Elemento'}
                  width={128}
                  height={128}
                  className='object-cover size-full'
                />
              </div>
            </Badge>
          </div>

          <div className='space-y-2'>
            <ul className='flex items-center gap-2'>
              <Badge>{ROLE}</Badge>
              <Badge>{ATTRIBUTE}</Badge>
              <Badge>{WEAPON}</Badge>
            </ul>

            <p className='text-pretty text-sm opacity-70'>
              {CHARACTER?.description}
            </p>
          </div>
        </div>
      </div>
    </EditorCard>
  )
}
