'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { z } from 'zod'
import { AccountsFormProps } from '@/app/(panel)/panel/accounts/_components/accounts-form/accounts-form.type'
import { FormSheet } from '@/app/(panel)/_components/form-sheet'
import { useEffect, useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { AccountSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { createAccount } from '@/app/(panel)/panel/accounts/_services/create'
import { updateAccount } from '@/app/(panel)/panel/accounts/_services/update'
import { ACCOUNT_ROLE } from '@/consts/general'
import { useGetAccount } from '@/features/queries/use-accounts'

export function AccountsForm(props: AccountsFormProps) {
  const { id } = props

  const [isPending, startTransition] = useTransition()
  const [isOpen, setIsOpen] = useState(false)
  const { refresh } = useRouter()

  const IS_EDITING = !!id
  const { data: ACCOUNT } = useGetAccount(id!)

  const form = useForm<z.infer<typeof AccountSchema>>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
  })

  useEffect(() => {
    if (ACCOUNT) {
      startTransition(() => {
        form.setValue('name', ACCOUNT.name)
        form.setValue('email', ACCOUNT.email)
        form.setValue('role', ACCOUNT.role)
      })
    }
  }, [ACCOUNT, form])

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      if (IS_EDITING) {
        const { status, message } = await updateAccount(values, id)

        if (status === 201) {
          toast.success(message)
          setIsOpen(false)
          refresh()
          return
        }

        toast.error(message)
        return
      }

      const { status, message } = await createAccount(values)

      if (status === 201) {
        toast.success(message)
        form.reset()
        setIsOpen(false)
        refresh()
        return
      }

      toast.error(message)
    })
  })

  return (
    <FormSheet
      title='Cuenta'
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isEditing={IS_EDITING}
      isLoading={isPending}
      formId='stats-priority-form'
    >
      <Form {...form}>
        <form
          id='stats-priority-form'
          onSubmit={handleSubmit}
          className='grid gap-4'
        >
          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nombre</FormLabel>
                <FormControl>
                  <Input
                    placeholder='Miguel Angel'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Correo</FormLabel>
                <FormControl>
                  <Input
                    placeholder='miguel1047@hutaomains.com'
                    {...field}
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {!IS_EDITING && (
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='***********'
                      {...field}
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          <FormField
            control={form.control}
            name='role'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rol</FormLabel>
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Selecciona un rol...' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Roles</SelectLabel>
                    </SelectGroup>

                    {ACCOUNT_ROLE.map(({ label, value }) => (
                      <SelectItem
                        key={value}
                        value={value}
                      >
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </FormSheet>
  )
}
