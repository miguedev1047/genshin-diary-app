import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { Title } from '@/components/ui/title'
import { DEFAULT_IMAGE } from '@/consts/misc'
import { useGetPlayerData } from '@/features/queries/use-player-data'
import { Badge } from '@/components/ui/badge'
import { useParams } from 'next/navigation'
import { CopyField } from '@/components/copy-field'
import Image from 'next/image'

export function PlayerHeader() {
  const { uid } = useParams<{ uid: string }>()
  const { data: PLAYER_DATA } = useGetPlayerData(uid)

  return (
    <Card className='relative w-full p-2 overflow-hidden'>
      <div className='relative w-full p-5 bg-card/70 backdrop-blur-lg z-20 flex justify-between items-start gap-4 rounded-(--radius) border-border/20'>
        <div className='flex items-center gap-4'>
          <SquareBox
            size='sm'
            className='bg-transparent rounded-full'
          >
            <Image
              fill
              src={PLAYER_DATA?.infoUser.profileAvatar || DEFAULT_IMAGE}
              alt={`${PLAYER_DATA?.infoUser.nickname} profile picture`}
              className='inset-0 absolute object-cover'
            />
          </SquareBox>
          <div className='space-y-1'>
            <Title size='xl'>{PLAYER_DATA?.infoUser.nickname}</Title>
            <p>{PLAYER_DATA?.infoUser.signature}</p>
          </div>
        </div>

        <div className='space-y-2'>
          <div className='flex items-center gap-3'>
            <p className='flex items-center gap-2'>
              <span>AR:</span>
              <Badge>{PLAYER_DATA?.infoUser.level}</Badge>
            </p>
            <p className='flex items-center gap-2'>
              <span>WL:</span>
              <Badge>{PLAYER_DATA?.infoUser.worldlevel}</Badge>
            </p>
            <p className='flex items-center gap-2'>
              <span>Logros:</span>
              <Badge>{PLAYER_DATA?.infoUser.achievements}</Badge>
            </p>
          </div>

          <div className='flex grow-0 justify-end'>
            <CopyField label={uid} />
          </div>
        </div>
      </div>

      <Image
        fill
        src={PLAYER_DATA?.infoUser.profilePicture || DEFAULT_IMAGE}
        alt={`${PLAYER_DATA?.infoUser.nickname} profile picture`}
        className='inset-0 absolute object-cover'
      />
    </Card>
  )
}
