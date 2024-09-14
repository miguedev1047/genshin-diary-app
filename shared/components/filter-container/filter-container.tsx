import { Card } from '@/components/ui/card'

export function FilterContainer({ ...props }) {
  return (
    <Card
      className='p-6 space-y-4'
      {...props}
    />
  )
}
