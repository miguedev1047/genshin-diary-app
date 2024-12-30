import { ContentLayout } from '@/app/(index)/_components/content-layout'
import React from 'react'

export default function IndexLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ContentLayout>{children}</ContentLayout>
}
