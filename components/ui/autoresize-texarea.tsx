'use client'

import { cn } from '@/lib/utils'
import React, { useRef, useEffect, type TextareaHTMLAttributes } from 'react'

interface AutoResizeTextareaProps
  extends Omit<
    TextareaHTMLAttributes<HTMLTextAreaElement>,
    'value' | 'onChange'
  > {
  value: string
  onChange: (value: string) => void
  maxLength?: number
}

export function AutoResizeTextarea({
  className,
  value,
  maxLength = 100,
  onChange,
  ...props
}: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const resizeTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value
    if (maxLength && newValue.length <= maxLength) {
      onChange(newValue)
      resizeTextarea()
    }
  }

  useEffect(() => {
    resizeTextarea()
  }, [value])

  return (
    <textarea
      {...props}
      value={value}
      ref={textareaRef}
      rows={1}
      onChange={handleChange}
      maxLength={maxLength}
      className={cn('resize-none min-h-4 max-h-80 pr-12', className)}
    />
  )
}
