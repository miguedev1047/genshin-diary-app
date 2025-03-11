import { Title } from '@/components/ui/title'
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
            TIER_ROW_COLORS[row.tier_rank as 'SS' | 'S' | 'A' | 'B' | 'C' | 'D']
          )}
        >
          <Title size='3xl'>{row.tier_rank}</Title>
        </SquareBox>

        <Card className='p-6 col-span-8 space-y-4'>
          <article className='flex items-center justify-end flex-1 gap-4'>
            <CharacterForm
              data={row.characters}
              tierId={row.id}
            />
          </article>

          <TierCharacterList characters={row.characters} />
        </Card>
      </article>
    </li>
  ))

  return <ul className='space-y-4'>{MAPPED_ROWS}</ul>
}
