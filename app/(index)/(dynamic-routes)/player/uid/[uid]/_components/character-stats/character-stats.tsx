import {
  getCharacterStats,
  getElementIcon,
} from '@/features/utils/character-texts'
import { CharacterStatsProps } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/character-stats/character-stats.type'
import { SquareBox } from '@/components/square-box'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { Title } from '@/components/ui/title'
import { Star } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { AttributeIcon } from '@/assets/svg/_index'
import Image from 'next/image'

export function CharacterStats(props: CharacterStatsProps) {
  const {
    statsList,
    playerUid,
    playerName,
    stars,
    weapon,
    level,
    name,
    elementType,
  } = props

  const ELEMENT_ICON = getElementIcon(elementType)
  const STATS = getCharacterStats(statsList)

  return (
    <div className='space-y-2 flex flex-col flex-1 justify-between text-white'>
      <div className='flex items-center gap-3'>
        <SquareBox
          size='sm'
          className='bg-transparent'
        >
          <Image
            fill
            src={ELEMENT_ICON || DEFAULT_IMAGE}
            alt={elementType}
          />
        </SquareBox>

        <div className='space-y-1 w-full'>
          <div className='flex items-start justify-between gap-4'>
            <div className='flex items-center gap-3'>
              <Title size='2xl'>{name}</Title>
              <Badge className='bg-white text-black'>Lv. {level}</Badge>
            </div>
            <div className='flex gap-3'>
              <Title className='text-white font-bold'>{playerName}</Title>
              <p>-</p>
              <Title className='text-white font-bold'>{playerUid}</Title>
            </div>
          </div>

          <ul className='flex items-center gap-1'>
            {Array.from({ length: stars }).map((_, index) => (
              <li key={index}>
                <Star className='size-4 text-yellow-500' />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <div className='col-span-2 py-3 px-4 bg-black/15 backdrop-blur-lg rounded-lg'>
          <Title size='lg'>Estadisticas del personaje</Title>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.totalHealth.itemType} />
              <p>{STATS.totalHealth.name}</p>
            </div>
            <div className='w-[100px] flex items-center justify-between gap-4'>
              <div className='text-[9px]'>
                <p>{STATS.baseHealth.value}</p>
                <p className='text-sky-300'>+{STATS.health.value}</p>
              </div>
              <p className='font-bold'>{STATS.totalHealth.value}</p>
            </div>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.totalAtk.itemType} />
              <p>{STATS.totalAtk.name}</p>
            </div>
            <div className='w-[100px] flex items-center justify-between gap-4'>
              <div className='text-[9px]'>
                <p>{STATS.baseAtk.value}</p>
                <p className='text-sky-300'>+{STATS.atk.value}</p>
              </div>
              <p className='font-bold'>{STATS.totalAtk.value}</p>
            </div>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.totalDef.itemType} />
              <p>{STATS.totalDef.name}</p>
            </div>
            <div className='w-[100px] flex items-center justify-between gap-4'>
              <div className='text-[9px]'>
                <p>{STATS.baseDef.value}</p>
                <p className='text-sky-300'>+{STATS.baseDef.value}</p>
              </div>
              <p className='font-bold'>{STATS.totalDef.value}</p>
            </div>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.elementalMastery.itemType} />
              <p>{STATS.elementalMastery.name}</p>
            </div>
            <p className='font-bold'>{STATS.elementalMastery.value}</p>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS?.elementBonus.itemType} />
              <p>{STATS?.elementBonus.name}</p>
            </div>
            <p className='font-bold'>{STATS?.elementBonus.value}</p>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.critRate.itemType} />
              <p>{STATS.critRate.name}</p>
            </div>
            <p className='font-bold'>{STATS.critRate.value}</p>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.dmgCrit.itemType} />
              <p>{STATS.dmgCrit.name}</p>
            </div>
            <p className='font-bold'>{STATS.dmgCrit.value}</p>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.healingBonus.itemType} />
              <p>{STATS.healingBonus.name}</p>
            </div>
            <p className='font-bold'>{STATS.healingBonus.value}</p>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <p>{STATS.incomingHealingBonus.name}</p>
            <p className='font-bold'>{STATS.incomingHealingBonus.value}</p>
          </div>
          <div className='flex justify-between items-center w-full h-8 px-2'>
            <div className='flex items-center gap-2'>
              <AttributeIcon attribute={STATS.energyRecharge.itemType} />
              <p>{STATS.energyRecharge.name}</p>
            </div>
            <p className='font-bold'>{STATS?.energyRecharge.value}</p>
          </div>
        </div>
      </div>

      <div className='grow-0 flex-1 justify-end bg-black/15 backdrop-blur-lg p-4 w-full rounded-(--radius) space-y-2'>
        <div className='flex items-center gap-4'>
          <SquareBox
            size='lg'
            className='bg-black/15 backdrop-blur-lg'
          >
            <Image
              fill
              src={weapon.iconUrl}
              alt={weapon.name}
              className='object-contain size-full'
            />
          </SquareBox>
          <div className='flex flex-col flex-1'>
            <div className='flex items-center justify-between gap-4'>
              <Title
                size='xl'
                className='font-bold'
              >
                {weapon.name}
              </Title>
              <div className='flex items-center space-x-1'>
                <Badge className='bg-white text-black'>
                  R{weapon.refinement}
                </Badge>
                <Badge className='bg-white text-black'>
                  Lv. {weapon.level}
                </Badge>
              </div>
            </div>
            <p>
              ATQ: <span className='font-bold'>{weapon.attack[0]?.value}</span>
            </p>
            <p>
              {weapon.attack[1]?.name}:{' '}
              <span className='font-bold'>{weapon.attack[1]?.value}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
