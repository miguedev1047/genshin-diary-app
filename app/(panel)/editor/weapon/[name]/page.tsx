import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContentLayout } from '@/shared/layouts/panel/content-layout'
import { EditorContent } from './editor/editor'
import Link from 'next/link'

export default function EditorWeaponPage() {
  return (
    <ContentLayout
      title={`Editar arma`}
      className='space-y-6'
    >
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href='/panel/weapons'>Armas</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Editar arma</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Tabs
        defaultValue='editor'
        className='w-full'
      >
        <TabsList className='grid grid-cols-2'>
          <TabsTrigger value='editor'>Editor</TabsTrigger>
          <TabsTrigger value='preview'>Preview</TabsTrigger>
        </TabsList>
        <TabsContent
          value='editor'
          className='space-y-4'
        >
          <EditorContent />
        </TabsContent>
        <TabsContent
          value='preview'
          className='space-y-4'
        ></TabsContent>
      </Tabs>
    </ContentLayout>
  )
}
