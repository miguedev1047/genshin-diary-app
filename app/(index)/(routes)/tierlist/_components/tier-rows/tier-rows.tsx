import { Title } from '@/components/ui/title'
import { TierRowProps } from '@/app/(index)/(routes)/tierlist/_components/tier-rows/tier-rows.type'
import { sortedTierItems } from '@/features/helpers/sorted-tier-items'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { TierCharacterList } from '@/app/(index)/(routes)/tierlist/_components/tier-character-list'
import { TIER_ROW_COLORS } from '@/consts/classes'
import { cn } from '@/lib/utils'

export function TierRows(props: TierRowProps) {
  const { rows } = props
  const ROWS = sortedTierItems({ rows })

  const MAPPED_ROWS = ROWS.map((row) => (
    <li key={row.id}>
      <article className='grid grid-cols-10 gap-4'>
        <SquareBox
          size='xl'
          className={cn(
            'col-span-2 grid place-items-center aspect-2/3 size-full',
            TIER_ROW_COLORS[row.tier_rank as 'S' | 'A' | 'B' | 'C' | 'D']
          )}
        >
          <Title size='3xl'>{row.tier_rank}</Title>
        </SquareBox>

        <Card className='p-6 col-span-8'>
          <ul className='grid sm:grid-cols-2 md:grid-cols-4 gap-4 h-full'>
            <TierCharacterList characters={row.characters} />
          </ul>
        </Card> 
      </article>
    </li>
  ))

  return <ul className='space-y-4'>{MAPPED_ROWS}</ul>
}
