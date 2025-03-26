import { PlayerInfo } from '@/app/(index)/(routes)/(home)/_components/player-info'

export function PlayerSection() {
  return (
    <section id='#search-player' className='relative mx-auto my-10 max-w-7xl grid place-items-center space-y-6 pb-16'>
      <PlayerInfo />
    </section>
  )
}
