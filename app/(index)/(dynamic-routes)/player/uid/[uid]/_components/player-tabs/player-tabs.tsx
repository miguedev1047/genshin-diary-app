import { CharacterCardProps, CharacterLayoutProps } from './player-tabs.type'
import { useGetPlayerData } from '@/features/queries/use-player-data'
import { useParams } from 'next/navigation'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BORDER_ELEMENT_COLOR, SHADOW_ELEMENT_COLOR } from '@/consts/classes'
import { getElementBg } from '@/features/helpers/get-element-bg'
import { ElementProps } from '@/types/classes.type'
import { CharacterPortrait } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/character-portait'
import { CharacterStats } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/character-stats'
import { CharacterArtifacts } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/character-artifacts'
import { Button } from '@/components/ui/button'
import { Download, Loader2 } from 'lucide-react'
import { useExportImage } from '@/features/hooks/use-image-export'
import { cn } from '@/lib/utils'

export function PlayerTabs() {
  const { uid } = useParams<{ uid: string }>()
  const { data: PLAYER_DATA } = useGetPlayerData(uid)

  const MAPPED_TABS = PLAYER_DATA?.infoUser.characters.map((character) => {
    return (
      <TabsTrigger
        value={`tab-${character.id}`}
        key={character.id}
        className='relative after:absolute after:inset-x-0 after:bottom-0 after:-mb-1 after:h-0.5 hover:bg-transparent hover:text-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:after:bg-primary data-[state=active]:hover:bg-transparent aspect-square '
      >
        <Avatar className='size-20 border-2'>
          <AvatarImage src={character.currentCostume.icon} />
          <AvatarFallback>{character.name[0]}</AvatarFallback>
        </Avatar>
      </TabsTrigger>
    )
  })

  const MAPPED_CONTENT_CARDS = PLAYER_DATA?.infoUser.characters.map(
    (character) => (
      <CharacterCard
        key={character.id}
        character={character}
      />
    )
  )

  return (
    <Tabs
      defaultValue={`tab-${PLAYER_DATA?.infoUser.characters[0].id}`}
      className='w-full'
    >
      <TabsList className='mx-auto grid grid-cols-12 h-full bg-transparent'>
        {MAPPED_TABS}
      </TabsList>
      {MAPPED_CONTENT_CARDS}
    </Tabs>
  )
}

function CharacterLayout(props: CharacterLayoutProps) {
  const { character, children } = props

  const { ref, isLoading, convert } = useExportImage({
    filename: `character-${character.name}`,
  })

  return (
    <TabsContent
      value={`tab-${character.id}`}
      className='relative'
    >
      <div ref={ref}>{children}</div>

      <Button
        size='icon'
        className='bg-white hover:bg-white/90 text-black absolute top-4 right-4 cursor-pointer'
        disabled={isLoading}
        onClick={convert}
      >
        {isLoading && <Loader2 className='animate-spin' />}
        {!isLoading && <Download />}
      </Button>
    </TabsContent>
  )
}

function CharacterCard(props: CharacterCardProps) {
  const { character } = props

  const ELEMENT_VALUE = character.elementType
  const ELEMENT_BG = getElementBg(ELEMENT_VALUE)

  return (
    <CharacterLayout character={character}>
      <div
        style={ELEMENT_BG}
        className={cn(
          'relative flex-1 flex flex-col gap-4 shadow-2xl rounded-xl border p-5 select-none pointer-events-none',
          BORDER_ELEMENT_COLOR[ELEMENT_VALUE as ElementProps],
          SHADOW_ELEMENT_COLOR[ELEMENT_VALUE as ElementProps]
        )}
      >
        <div className='flex flex-1 gap-6'>
          <CharacterStats {...character} />
          <CharacterPortrait {...character} />
        </div>
        <CharacterArtifacts {...character} />
      </div>
    </CharacterLayout>
  )
}
