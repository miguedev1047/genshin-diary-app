import { Card } from '@/components/ui/card'
import { currentUser } from '@/data/auth'
import HyperText from '@/components/magicui/hyper-text'

export async function Welcome() {
  const user = await currentUser()

  return (
    <Card className='p-6 col-span-8'>
      <HyperText
        className='text-lg md:text-2xl uppercase font-extrabold'
        text={`Bienvenido ${user?.name}!`}
      />
    </Card>
  )
}
