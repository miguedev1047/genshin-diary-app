'use client'

import {
  Form,
  FormLabel,
  FormControl,
  FormField,
  FormItem,
} from '@/components/ui/form'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { LoginSchema } from '@/schemas'
import { login } from '@/app/(auth)/login/_services/login'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function LoginForm() {
  const [isPending, startTransition] = useTransition()
  const { refresh } = useRouter()

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await login(values)

      if (status === 201) {
        toast.success(message)
        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit}
        className='w-full max-w-[400px] grid gap-4'
      >
        <FormField
          name='email'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input
                  disabled={isPending}
                  placeholder='Ingresa tu correo'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name='password'
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input
                  type='password'
                  disabled={isPending}
                  placeholder='*************'
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <Button
          disabled={isPending}
          type='submit'
        >
          {isPending ? 'Ingresando...' : 'Entrar al panel'}
        </Button>
      </form>
    </Form>
  )
}
