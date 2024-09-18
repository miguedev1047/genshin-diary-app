import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { z } from 'zod'
import { DialogMultiSelect } from '@/shared/layouts/panel/dialog-multi-select/dialog-multi-select'
import { useGetCharacters } from '@/app/(panel)/editor/weapon/[name]/_queries/use-character'
import { useGetWeaponByName } from '@/app/(panel)/editor/weapon/[name]/_queries/use-weapon'
import { createCharacter } from '@/app/(panel)/editor/weapon/[name]/_services/create'
import { Form, FormControl, FormField, FormItem } from '@/components/ui/form'
import { WeaponBestCharactersSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import { ScrollArea } from '@radix-ui/react-scroll-area'

const MAX_ITEMS = 6
const MIN_ITEMS = 0

export function CharacterSelector() {
  const [isPending, startTranstion] = useTransition()

  const { data: WEAPON, refetch } = useGetWeaponByName()
  const { data: CHARACTERS } = useGetCharacters()
  const DISABLED_KEYS = WEAPON?.bests_characters.map(
    (character) => character.character_id
  )

  const MAX_CHARACTERS =
    (WEAPON?.bests_characters.length ?? MIN_ITEMS) >= MAX_ITEMS

  const form = useForm<z.infer<typeof WeaponBestCharactersSchema>>({
    resolver: zodResolver(WeaponBestCharactersSchema),
    defaultValues: {
      characters: [],
    },
  })

  const handleSubmit = form.handleSubmit((values) => {
    const NEW_VALUES = values.characters.map((character) => ({
      character_id: character,
      weapon_id: WEAPON?.id,
    }))

    const MAXIMUN_CHARACTERS =
      [...NEW_VALUES, ...WEAPON?.bests_characters!].length > MAX_ITEMS

    if (MAXIMUN_CHARACTERS) {
      toast.success(`No puedes agregar mas de ${MAX_ITEMS} personajes`)
      form.reset()
      return 
    }

    startTranstion(async () => {
      const { status, message } = await createCharacter(NEW_VALUES)

      if (status === 201) {
        toast.success(message)
        refetch()

        form.reset()
        return
      }

      toast.error(message)
    })
  })

  if (MAX_CHARACTERS) return null

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='ghost'
          className='size-full aspect-[2/3] border-2 border-dashed border-secondary'
          disabled={MAX_CHARACTERS}
        >
          <Plus className='size-16' />
        </Button>
      </SheetTrigger>
      <SheetContent className='sm:max-w-[640px]'>
        <SheetHeader>
          <SheetTitle>Personajes</SheetTitle>
          <SheetDescription>
            Selecciona hasta {MAX_ITEMS} personajes
          </SheetDescription>
        </SheetHeader>

        <ScrollArea className='w-full h-[800px]'>
          <Form {...form}>
            <form
              id='selector-characters'
              onSubmit={handleSubmit}
              className='grid gap-4 px-1'
            >
              <FormField
                control={form.control}
                name='characters'
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <DialogMultiSelect
                        options={CHARACTERS}
                        defaultValue={field.value}
                        onValueChange={field.onChange}
                        disabledKeys={DISABLED_KEYS}
                        placeholder='Seleccionar personajes'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </ScrollArea>

        <SheetFooter>
          <SheetClose asChild>
            <Button
              form='selector-characters'
              type='submit'
              disabled={isPending || MAX_CHARACTERS}
              className='mt-6'
            >
              Agregar
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
