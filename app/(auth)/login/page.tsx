import { Back } from '@/app/(auth)/login/_components/back'
import { LoginForm } from '@/app/(auth)/login/_components/login-form'
import { PAGE_NAME } from '@/consts/misc'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: `${PAGE_NAME} - Login`,
  description: 'Accede al panel de administrador con tus credenciales.',
}

export default function PageLogin() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center space-y-5 relative'>
      <Back />

      <div className='text-center'>
        <h2 className='text-xl font-extrabold'>Admin Panel</h2>
        <p className='opacity-50'>Ingresa al panel con tus credenciales.</p>
      </div>

      <LoginForm />
    </main>
  )
}
