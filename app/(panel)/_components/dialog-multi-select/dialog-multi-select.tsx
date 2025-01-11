import {
  CheckIcon,
  ChevronDown,
  WandSparkles,
  XCircle,
  XIcon,
} from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  DialogMultiSelectProps,
  dialogMultiSelectVariants,
} from './dialog-multi-select.type'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Grid } from 'react-loader-spinner'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { DEFAULT_IMAGE } from '@/consts/misc'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'

export function DialogMultiSelect(props: DialogMultiSelectProps) {
  const {
    items,
    onValueChange,
    defaultValue = [],
    disabledKeys = [],
    className,
    isLoading = false,
    placeholder,
    variant,
    animation = 0,
    maxCount = 3,
  } = props

  const OPTIONS = items?.map((item) => {
    return {
      label: item.name,
      value: item.id,
      src:
        item.images?.profile_image_url ||
        item.image_url ||
        item.images?.splash_art_url ||
        DEFAULT_IMAGE,
    }
  })

  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValue)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    setSelectedValues(defaultValue)
  }, [defaultValue, disabledKeys])

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setIsDialogOpen(true)
    } else if (event.key === 'Backspace' && !event.currentTarget.value) {
      const newSelectedValues = [...selectedValues]
      newSelectedValues.pop()
      setSelectedValues(newSelectedValues)
      onValueChange(newSelectedValues)
    }
  }

  const toggleOption = (value: string) => {
    const newSelectedValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    setSelectedValues(newSelectedValues)
    onValueChange(newSelectedValues)
  }

  const handleClear = () => {
    setSelectedValues([])
    onValueChange([])
  }

  const clearExtraOptions = () => {
    const newSelectedValues = selectedValues.slice(0, maxCount)
    setSelectedValues(newSelectedValues)
    onValueChange(newSelectedValues)
  }

  const handleToggleDialog = () => {
    setIsDialogOpen((prev) => !prev)
  }

  return (
    <Dialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
    >
      <DialogTrigger asChild>
        <Button
          onClick={handleToggleDialog}
          disabled={isLoading}
          className={cn(
            'flex w-full p-1 rounded-md border min-h-10 h-auto items-center justify-between bg-inherit hover:bg-inherit',
            className
          )}
        >
          {selectedValues.length > 0 ? (
            <div className='flex justify-between items-center w-full'>
              <div className='flex flex-wrap items-center'>
                {selectedValues.slice(0, maxCount).map((value) => {
                  const option = OPTIONS?.find((o) => o.value === value)
                  return (
                    <Badge
                      key={value}
                      className={cn(
                        isAnimating ? 'animate-bounce' : '',
                        dialogMultiSelectVariants({ variant })
                      )}
                      style={{ animationDuration: `${animation}s` }}
                    >
                      {option?.label}
                      <XCircle
                        className='ml-2 h-4 w-4 cursor-pointer'
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleOption(value)
                        }}
                      />
                    </Badge>
                  )
                })}
                {selectedValues.length > maxCount && (
                  <Badge
                    className={cn(
                      'bg-transparent text-foreground border-foreground/1 hover:bg-transparent',
                      isAnimating ? 'animate-bounce' : '',
                      dialogMultiSelectVariants({ variant })
                    )}
                    style={{ animationDuration: `${animation}s` }}
                  >
                    {`+ ${selectedValues.length - maxCount}`}
                    <XCircle
                      className='ml-2 h-4 w-4 cursor-pointer'
                      onClick={(event) => {
                        event.stopPropagation()
                        clearExtraOptions()
                      }}
                    />
                  </Badge>
                )}
              </div>
              <div className='flex items-center justify-between'>
                <XIcon
                  className='h-4 mx-2 cursor-pointer text-muted-foreground'
                  onClick={(event) => {
                    event.stopPropagation()
                    handleClear()
                  }}
                />
                <Separator
                  orientation='vertical'
                  className='flex min-h-6 h-full'
                />
                <ChevronDown className='h-4 mx-2 cursor-pointer text-muted-foreground' />
              </div>
            </div>
          ) : (
            <div className='flex items-center justify-between w-full mx-auto'>
              <span className='text-sm text-muted-foreground mx-3'>
                {placeholder}
              </span>
              <ChevronDown className='h-4 cursor-pointer text-muted-foreground mx-2' />
            </div>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Buscador</DialogTitle>
        </DialogHeader>
        <Command>
          <CommandInput
            placeholder={placeholder}
            onKeyDown={handleInputKeyDown}
          />
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {isLoading ? (
                <Grid />
              ) : (
                <>
                  {isLoading ? (
                    <Grid />
                  ) : (
                    OPTIONS?.map((option) => {
                      const isSelected = selectedValues.includes(option.value)
                      const isDisabled = disabledKeys.includes(option.value)

                      return (
                        <CommandItem
                          key={option.value}
                          disabled={isDisabled}
                          onSelect={() => toggleOption(option.value)}
                          className='cursor-pointer flex flex-row justify-between items-center gap-2'
                        >
                          <div className='flex items-center gap-2'>
                            {option.src && (
                              <figure className='size-14 aspect-square p-1 rounded-md bg-secondary overflow-hidden'>
                                <Image
                                  src={option.src}
                                  alt={option.label}
                                  width={720}
                                  height={720}
                                  priority
                                  className='size-full object-cover'
                                />
                              </figure>
                            )}
                            <span>{option.label}</span>
                          </div>

                          <div
                            className={cn(
                              'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                              isSelected || isDisabled
                                ? 'bg-primary text-primary-foreground'
                                : 'opacity-50 [&_svg]:invisible'
                            )}
                          >
                            <CheckIcon className='h-4 w-4' />
                          </div>
                        </CommandItem>
                      )
                    })
                  )}
                </>
              )}
            </CommandGroup>
          </CommandList>
        </Command>
        {animation > 0 && selectedValues.length > 0 && (
          <WandSparkles
            className={cn(
              'cursor-pointer my-2 text-foreground bg-background w-3 h-3',
              isAnimating ? '' : 'text-muted-foreground'
            )}
            onClick={() => setIsAnimating(!isAnimating)}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button>Aceptar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
