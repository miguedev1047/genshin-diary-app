import { Back } from './_components/back'
import { LoginForm } from './_components/login-form'

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
