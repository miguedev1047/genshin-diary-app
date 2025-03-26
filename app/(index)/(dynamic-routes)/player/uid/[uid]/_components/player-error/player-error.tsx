import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FrownIcon, HomeIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { BorderBeam } from '@/components/magicui/border-beam'

export function PlayerError() {
  const { back } = useRouter()

  return (
    <div className='flex h-[40rem] items-center justify-center bg-background p-4 relative'>
      <Card className='w-full max-w-md text-center relative'>
        <BorderBeam />

        <CardHeader>
          <CardTitle className='flex items-center justify-center gap-2 text-3xl font-bold'>
            <FrownIcon className='h-8 w-8' />
            Perfil no disponible
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className='text-muted-foreground'>
            La visualizacion de este perfil no esta disponible.
          </p>
        </CardContent>
        <CardFooter className='flex justify-center'>
          <Button
            onClick={back}
            className='flex items-center gap-2'
          >
            <HomeIcon className='h-4 w-4' />
            Volver
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
