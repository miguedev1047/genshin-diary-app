import { Tittle } from '@/components/ui/tittle'
import { TierRowProps } from '@/app/(panel)/panel/tierlist/_components/tier-rows/tier-rows.type'
import { sortedTierItems } from '@/features/helpers/sorted-tier-items'
import { SquareBox } from '@/components/square-box'
import { Card } from '@/components/ui/card'
import { CharacterForm } from '@/app/(panel)/panel/tierlist/_components/character-form'
import { TierCharacterList } from '@/app/(panel)/panel/tierlist/_components/tier-character-list'
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
            'col-span-2 grid place-items-center aspect-[2/3] size-full',
            TIER_ROW_COLORS[row.tier_rank as 'S' | 'A' | 'B' | 'C' | 'D']
          )}
        >
          <Tittle size='3xl'>{row.tier_rank}</Tittle>
        </SquareBox>

        <Card className='p-6 col-span-8'>
          <ul  className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 h-full'>
            <TierCharacterList characters={row.characters} />
            <CharacterForm
              data={row.characters}
              tierId={row.id}
            />
          </ul>
        </Card>
      </article>
    </li>
  ))

  return <ul className='space-y-4'>{MAPPED_ROWS}</ul>
}
