'use client'

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SpinLoaderContent } from '@/components/spin-loaders'
import { useGetPlayerData } from '@/features/queries/use-player-data'
import { useParams } from 'next/navigation'
import { PlayerHeader } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/player-header/player-header'
import { PlayerTabs } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/player-tabs'
import { PlayerError } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/player-error'
import { WorkingByEnka } from '@/app/(index)/(dynamic-routes)/player/uid/[uid]/_components/working-enka'

export function PlayerCard() {
  const { uid } = useParams<{ uid: string }>()
  const { data: PLAYER_INFO, status } = useGetPlayerData(uid)

  if (!PLAYER_INFO) return <PlayerError />
  if (status === 'pending') return <SpinLoaderContent />

  return (
    <div className='w-full space-y-6 select-none relative z-40'>
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href='/player/search'>Volver</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink>{PLAYER_INFO?.infoUser?.nickname}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <PlayerHeader />
      <PlayerTabs />

      <WorkingByEnka />
    </div>
  )
}
