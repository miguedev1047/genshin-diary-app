import { z } from 'zod'
import { TeamNameFormProps } from '@/editor/character/[name]/teams/_components/team-name-form/team-name-form.type'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { TeamNameSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import { updateTeamName } from '@/editor/character/[name]/teams/_services/update'
import { toast } from 'sonner'
import React, { useState, useTransition } from 'react'

export function TeamNameForm(props: TeamNameFormProps) {
  const { name, id } = props

  const [isPending, startTransition] = useTransition()
  const [isEditing, setIsEditing] = useState(false)
  const { refresh } = useRouter()

  const handleBlur = () => setIsEditing(false)
  const handleDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Escape') return setIsEditing(false)
  }

  const form = useForm<z.infer<typeof TeamNameSchema>>({
    resolver: zodResolver(TeamNameSchema),
    defaultValues: {
      name: name,
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    startTransition(async () => {
      const { status, message } = await updateTeamName(values, id)

      if (status === 201) {
        toast.success(message)
        setIsEditing(false)
        refresh()
        
        return
      }

      toast.error(message)
    })
  })

  if (!isEditing) return <span onClick={() => setIsEditing(true)}>{name}</span>

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit}>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  autoFocus
                  disabled={isPending}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={handleBlur}
                  onKeyDown={handleDown}
                  placeholder='Cambiar nombre del equipo'
                />
              </FormControl>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
