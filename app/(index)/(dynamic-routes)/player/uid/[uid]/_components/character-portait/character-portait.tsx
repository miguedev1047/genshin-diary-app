import { CharacterPortaitProps } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/character-portait/character-portait.type'
import { LockKeyholeOpenIcon } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BORDER_ELEMENT_COLOR } from '@/consts/classes'
import { ElementProps } from '@/types/classes.type'
import { cn } from '@/lib/utils'
import Image from 'next/image'

export function CharacterPortrait(props: CharacterPortaitProps) {
  const {
    name,
    skillLevels,
    elementType,
    constellations,
    currentCostume,
  } = props

  const MAPPED_CONSTELLATIONS = constellations.map((constellation) => (
    <li
      key={constellation.id}
      className='relative'
    >
      <div className='absolute z-20 inset-0 grid place-items-center'>
        {!constellation.isUnlocked && (
          <LockKeyholeOpenIcon className='size-4 text-white' />
        )}
      </div>
      <Avatar
        className={cn(
          'border size-10 p-1 bg-black/50 backdrop-blur-lg',
          !constellation.isUnlocked && 'opacity-50',
          BORDER_ELEMENT_COLOR[elementType as ElementProps]
        )}
      >
        <AvatarImage src={constellation.iconUrl} />
        <AvatarFallback>{constellation.name[0]}</AvatarFallback>
      </Avatar>
    </li>
  ))

  const MAPPED_SKILLS = skillLevels.map((skill) => (
    <li
      key={skill.id}
      className='relative space-y-1 flex flex-col'
    >
      <Avatar
        className={cn(
          'border size-10 p-1 bg-black/50 backdrop-blur-lg',
          BORDER_ELEMENT_COLOR[elementType as ElementProps]
        )}
      >
        <AvatarImage src={skill.skill.iconUrl} />
        <AvatarFallback>{skill.skill.name[0]}</AvatarFallback>
      </Avatar>
      <h3 className='bg-black text-white bottom-0 -right-1 px-2 py-0.5 grid place-items-center absolute rounded-full text-xs'>
        {skill.level.level}
      </h3>
    </li>
  ))

  return (
    <div className='relative size-[480px] text-end overflow-hidden'>
      <figure className='size-full [mask-image:radial-gradient(circle,rgba(0,0,0,1)_50%,rgba(0,0,0,0)_70%)]'>
        <Image
          src={currentCostume.splashImageUrl}
          width={1980}
          height={1080}
          alt={`Arte: ${name}`}
          className='size-full scale object-cover'
        />
      </figure>

      <ul className='absolute top-1/2 -translate-y-1/2 right-0 grid grid-cols-1 gap-2'>
        {MAPPED_CONSTELLATIONS}
      </ul>

      <ul className='absolute top-1/2 -translate-y-1/2 left-0 grid grid-cols-1 gap-2'>
        {MAPPED_SKILLS}
      </ul>
    </div>
  )
}
